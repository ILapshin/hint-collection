from django.contrib import admin

from questions.models import Question


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    pass