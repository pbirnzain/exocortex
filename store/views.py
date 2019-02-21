from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import viewsets

from store.models import Topic, TextChunk
from store.serializers import TopicSerializer, TextChunkSerializer


class WebsocketUpdateMixin:
    def _send_update(self, message):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)('updates', message)

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
        channel_layer = get_channel_layer()
        message = {
            'type': 'entity_deleted',
            'message': (self.entity_name, kwargs['pk'])
        }
        async_to_sync(channel_layer.group_send)('updates', message)
        return ret


class TopicViewSet(WebsocketUpdateMixin, viewsets.ModelViewSet):
    queryset = Topic.objects.all().select_subclasses()
    serializer_class = TopicSerializer
    entity_name = 'topic'


class TextChunkViewSet(WebsocketUpdateMixin, viewsets.ModelViewSet):
    serializer_class = TextChunkSerializer
    entity_name = 'textchunk'

    def get_queryset(self):
        queryset = TextChunk.objects.all()

        topic = self.request.query_params.get('topic', None)
        if topic:
            queryset = queryset.filter(topic=topic)

        return queryset
