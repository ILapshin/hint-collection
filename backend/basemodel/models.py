from datetime import datetime

from django.db import models

from users.models import CustomUser


class BaseModel(models.Model):
    created_by = models.ForeignKey(CustomUser, blank=True, on_delete=models.CASCADE)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(blank=True, default=datetime.utcnow)
    is_edited = models.BooleanField(blank=True, default=False)
    edited_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'{self.id}: {self.created_by}'

    class Meta:
        abstract = True

    def edit(self, new_content):
        self.content = new_content
        self.is_edited = True
        self.edited_at = datetime.utcnow()
        self.save()