from datetime import datetime

from django.db import models

from slugify import slugify

from basemodel.models import BaseModel


class Topic(BaseModel):
    slug = models.SlugField(blank=True, db_index=True, unique=True)

    def edit(self, new_content):
        self.content = new_content
        self.is_edited = True
        self.edited_at = datetime.utcnow()
        self.slug = slugify(new_content[:50], only_ascii=True)
        self.save()