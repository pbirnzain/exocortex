from rest_framework import viewsets

from store.models import Topic
from store.serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()
