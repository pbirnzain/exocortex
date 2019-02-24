from django.db import models
from django.shortcuts import reverse


class TextChunk(models.Model):
    topic = models.ForeignKey('Topic', on_delete=models.CASCADE)

    text = models.TextField(blank=True)

    added = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def get_absolute_url(self):
        return reverse('textchunk-detail', args=[self.id])
