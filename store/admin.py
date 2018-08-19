from django.contrib import admin

from .models import Task, Topic


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass
