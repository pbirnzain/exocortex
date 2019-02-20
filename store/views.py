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
            'type': f'{this.entity_name}_changed',
            'message': ret.data
        }
        self._send_update(message)
        return ret

    def create(self, *args, **kwargs):
        ret = super().create(*args, **kwargs)
        message = {
            'type': f'{this.entity_name}_changed',
            'message': ret.data
        }
        self._send_update(message)
        return ret

    def destroy(self, *args, **kwargs):
        ret = super().destroy(*args, **kwargs)
        channel_layer = get_channel_layer()
        message = {
            'type': f'{this.entity_name}_deleted',
            'message': kwargs['pk']
        }
        async_to_sync(channel_layer.group_send)('updates', message)
        return ret


class TopicViewSet(viewsets.ModelViewSet, WebsocketUpdateMixin):
    queryset = Topic.objects.all().select_subclasses()
    serializer_class = TopicSerializer
    entity_name = 'topic'


class TextChunkViewSet(viewsets.ModelViewSet, WebsocketUpdateMixin):
    queryset = TextChunk.objects.all()
    serializer_class = TextChunkSerializer
    entity_name = 'textchunk'
