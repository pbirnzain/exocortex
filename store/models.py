from datetime import datetime

from django.db import models
from django.shortcuts import reverse
from model_utils.managers import InheritanceManager


class Score:
    def __init__(self, reason=None, value=0):
        self._reasons = {}
        if reason:
            self += (reason, value)

    def __add__(self, score):
        reason, value = score
        self._reasons[reason] = value
        return self

    @property
    def sum(self):
        return sum(self._reasons.values())

    @property
    def reasons(self):
        return self._reasons

    def __str__(self):
        return str(self.sum)


class DataChunk(models.Model):
    objects = InheritanceManager()

    title = models.CharField(max_length=100)
    text = models.TextField(blank=True)
    related = models.ManyToManyField("self", blank=True)

    added = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def score(self):
        return Score()

    def __str__(self):
        return self.title


class Topic(DataChunk):
    pinned = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('topic-detail', args=[self.id])

    @property
    def score(self):
        score = super().score
        if self.pinned:
            score += ("pinned", 100)

        return score


class Task(Topic):
    due = models.DateTimeField(blank=True, null=True)
    wait = models.DateTimeField(blank=True, null=True)
    complete = models.BooleanField(default=False)

    @property
    def score(self):
        score = super().score
        score += ("is task", 5)

        if self.wait and self.wait > datetime.now():
            score += ("waiting", -10)

        if self.complete:
            score += ("complete", -20)

        if self.due:
            score += ("has due date", 200)

        return score
