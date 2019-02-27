from django.contrib import admin

from .models import Topic, TextChunk, Link


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass


@admin.register(TextChunk)
class TextChunkAdmin(admin.ModelAdmin):
    pass


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    pass
