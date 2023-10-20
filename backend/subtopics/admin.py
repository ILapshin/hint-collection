from django.contrib import admin

from subtopics.models import Subtopic


@admin.register(Subtopic)
class SubtopicAdmin(admin.ModelAdmin):
    pass