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

    title = models.CharField(max_length=100, blank=True)

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
    importance = models.IntegerField(default=0)

    def get_absolute_url(self):
        return reverse('topic-detail', args=[self.id])

    @property
    def score(self):
        score = super().score

        if self.importance != 0:
            score += ("importance", self.importance)

        if self.pinned:
            score += ("pinned", 100)

        if self.complete:
            score += ("archived", -40)
            return score

        if self.ready:
            if self.ready > timezone.now().date():
                score += ("blocked", -20)
                return score
            else:
                if not self.due:
                    score += ("ready", 10)

        if self.due:
            warn_days_before = 30
            due_in_days = (self.due - timezone.now().date()).days

            if due_in_days <= 0:
                score += ("is overdue", 200)
            elif due_in_days <= warn_days_before:
                progress = (warn_days_before+1-due_in_days)/warn_days_before
                score += ("due soon", int(10 + 80*progress))
            else:
                score += ("has due date", 10)

        return score
