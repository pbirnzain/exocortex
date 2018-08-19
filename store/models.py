from datetime import datetime

from django.db import models


class DataChunk(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField(blank=True)
    related = models.ManyToManyField("self", blank=True)

    added = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def score(self):
        return 0

    def __str__(self):
        return self.title


class Topic(DataChunk):
    pinned = models.BooleanField(default=False)

    @property
    def score(self):
        return super().score + 100 if self.pinned else 0


class Task(Topic):
    due = models.DateTimeField(null=True)
    wait = models.DateTimeField(null=True)

    @property
    def score(self):
        if self.wait > datetime.now():
            return 0

        return super().score + 200 if self.due else 0
