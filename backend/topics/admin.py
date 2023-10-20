from django.contrib import admin

from topics.models import Topic


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass
