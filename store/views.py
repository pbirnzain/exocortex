from django.db.models import Q
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import viewsets

from store.models import Topic, TextChunk, Link
from store.serializers import TopicSerializer, TextChunkSerializer, LinkSerializer


class WebsocketUpdateMixin:
    def _send_update(self, message):
        channel_layer = get_channel_layer()
        user_update_group = f'updates_{self.request.user}'
        async_to_sync(channel_layer.group_send)(user_update_group, message)

    def update(self, *args, **kwargs):
        ret = super().update(*args, **kwargs)
        message = {
            'type': 'entity_changed',
            'message': (self.entity_name, ret.data)
        }
        self._send_update(message)
        return ret

    def create(self, *args, **kwargs):
        ret = super().create(*args, **kwargs)
        message = {
            'type': 'entity_changed',
            'message': (self.entity_name, ret.data)
        }
        self._send_update(message)
        return ret

    def destroy(self, *args, **kwargs):
        ret = super().destroy(*args, **kwargs)
        message = {
            'type': 'entity_deleted',
            'message': (self.entity_name, kwargs['pk'])
        }
        self._send_update(message)
        return ret


class TopicViewSet(WebsocketUpdateMixin, viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    entity_name = 'topic'

    def get_queryset(self):
        queryset = Topic.objects.all().select_subclasses()

        if 'complete' in self.request.query_params:
            return queryset.filter(complete=True)
        elif 'incomplete' in self.request.query_params:
            return queryset.filter(complete=False)

        return queryset


class TextChunkViewSet(WebsocketUpdateMixin, viewsets.ModelViewSet):
    serializer_class = TextChunkSerializer
    entity_name = 'textchunk'

    def get_queryset(self):
        queryset = TextChunk.objects.all()

        topic = self.request.query_params.get('topic', None)
        if topic:
            queryset = queryset.filter(topic=topic)

        return queryset


class LinkViewSet(WebsocketUpdateMixin, viewsets.ModelViewSet):
    serializer_class = LinkSerializer
    entity_name = 'link'

    def get_queryset(self):
        queryset = Link.objects.all()

        topic = self.request.query_params.get('topic', None)
        if topic:
            queryset = queryset.filter(Q(from_topic__exact=topic) | Q(to_topic__exact=topic))

        return queryset
