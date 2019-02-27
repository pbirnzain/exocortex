from django.db import models


class Link(models.Model):
    from_topic = models.ForeignKey('Topic', on_delete=models.CASCADE,
                                   related_name='outgoing_links')
    to_topic = models.ForeignKey('Topic', on_delete=models.CASCADE,
                                 related_name='incomint_links')
