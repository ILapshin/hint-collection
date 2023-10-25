from django.db import models

from basemodel.models import BaseModel
from users.models import CustomUser
from subtopics.models import Subtopic


class Question(BaseModel):
    subtopic = models.ForeignKey(Subtopic, on_delete=models.CASCADE, related_name='questions')    
    marks = models.ManyToManyField(CustomUser, blank=True, related_name='marks')

    def toggle_mark(self, request):
        user: CustomUser = request.user
        self.marks.remove(user) if user in self.marks.all() else self.marks.add(user)
        self.save()