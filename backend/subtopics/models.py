from django.db import models

from basemodel.models import BaseModel
from topics.models import Topic


class Subtopic(BaseModel):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='subtopics')
    