from django.db import models

from basemodel.models import BaseModel
from users.models import CustomUser
from subtopics.models import Subtopic


class Question(BaseModel):
    subtopic = models.ForeignKey(Subtopic, on_delete=models.CASCADE, related_name='questions')    
    marks = models.ManyToManyField(CustomUser, related_name='marks')
