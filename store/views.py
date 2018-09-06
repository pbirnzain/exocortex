from rest_framework import viewsets

from store.models import Topic
from store.serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all().select_subclasses()
    serializer_class = TopicSerializer
