from rest_framework import serializers

from store.models import Topic


class TopicSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField()

    def get_score(self, obj):
        return {'sum': obj.score.sum,
                'reasons': obj.score.reasons}

    class Meta:
        model = Topic
        fields = ('__all__')
