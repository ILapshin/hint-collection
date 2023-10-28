from django.db import models

from basemodel.models import BaseModel


class Topic(BaseModel):
    slug = models.SlugField(blank=True, db_index=True, unique=True)
