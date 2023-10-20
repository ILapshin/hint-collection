from django.db import models

from basemodel.models import BaseModel
from users.models import CustomUser
from questions.models import Question


class Answer(BaseModel):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')    
    likes = models.ManyToManyField(CustomUser, related_name='likes')
