from django.shortcuts import render
from django.views import View
from django.views.generic.edit import UpdateView

from store.models import DataChunk, Task, Topic


class TopicListView(View):
    def get(self, request):

        topics = list(Topic.objects.all().select_subclasses())
        topics.sort(key=lambda t: t.score.sum, reverse=True)
        tasks = Task.objects.all()
        context = {'topics': topics,
                   'tasks': tasks}

        return render(request, 'store/topic_list.html', context)


class TopicDetailView(UpdateView):
    model = Topic
    fields = '__all__'
