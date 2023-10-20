from django.db import models

from basemodel.models import BaseModel
from users.models import CustomUser
from questions.models import Question


class Answer(BaseModel):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')    
    likes = models.ManyToManyField(CustomUser, related_name='likes')
    
    def toggle_like(self, request):
        user: CustomUser = request.user
        self.likes.remove(user) if user in self.likes.all() else self.likes.add(user)
        self.save()
