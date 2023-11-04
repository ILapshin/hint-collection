from datetime import datetime

from django.db import models

from slugify import slugify

from basemodel.models import BaseModel
from topics.models import Topic


class Subtopic(BaseModel):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='subtopics')
    slug = models.SlugField(blank=True, db_index=True)

    class Meta:
        unique_together = ('topic', 'slug',)
    
    def edit(self, new_content):
        self.content = new_content
        self.is_edited = True
        self.edited_at = datetime.utcnow()
        self.slug = slugify(new_content, only_ascii=True)[:50]
        self.save()