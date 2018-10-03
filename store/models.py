from django.db import models
from django.shortcuts import reverse
from django.utils import timezone
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
    # TODO: use through-Model, add direction, importance float
    related = models.ManyToManyField("self", blank=True)

    added = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    @property
    def score(self):
        return Score()

    def __str__(self):
        return self.title


class Topic(DataChunk):
    objects = InheritanceManager()
    pinned = models.BooleanField(default=False)

    due = models.DateField(blank=True, null=True)
    ready = models.DateField(blank=True, null=True)
    complete = models.BooleanField(default=False)

    def get_absolute_url(self):
        return reverse('topic-detail', args=[self.id])

    @property
    def score(self):
        score = super().score
        if self.pinned:
            score += ("pinned", 100)

        if self.complete:
            score += ("complete", -20)
            return score

        if self.ready:
            if self.ready > timezone.now().date():
                score += ("blocked", -10)
                return score
            else:
                score += ("ready", 10)

        if self.due:
            if self.due <= timezone.now().date():
                score += ("is overdue", 200)
            else:
                score += ("has due date", 50)

        return score
