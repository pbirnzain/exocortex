from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import viewsets

from store.models import Topic
from store.serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all().select_subclasses()
    serializer_class = TopicSerializer

    def update(self, *args, **kwargs):
        ret = super().update(*args, **kwargs)
        channel_layer = get_channel_layer()
        message = {
            'type': 'topic_changed',
            'message': ret.data
        }
        async_to_sync(channel_layer.group_send)('updates', message)
        return ret
