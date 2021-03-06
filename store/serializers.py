from rest_framework import serializers

from store.models import Topic, TextChunk, Link


class TopicSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()

    def get_score(self, obj):
        return {'sum': obj.score.sum,
                'reasons': obj.score.reasons}

    class Meta:
        model = Topic
        fields = ('__all__')


class TextChunkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextChunk
        fields = ('__all__')


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ('__all__')
