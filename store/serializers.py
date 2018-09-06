from rest_framework import serializers

from store.models import Task, Topic


class ScoreMixin(serializers.Serializer):
    score = serializers.SerializerMethodField()

    def get_score(self, obj):
        return {'sum': obj.score.sum,
                'reasons': obj.score.reasons}


class TaskSerializer(ScoreMixin, serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('__all__')


class TopicSerializer(ScoreMixin, serializers.ModelSerializer):
    subclass_serializers = {Task: TaskSerializer}

    def to_representation(self, instance):
        print(instance.__class__)
        serializer = self.subclass_serializers.get(instance.__class__)
        if serializer:
            return serializer(instance=instance, context=self.context).data
        else:
            return super().to_representation(instance)

    class Meta:
        model = Topic
        fields = ('__all__')
