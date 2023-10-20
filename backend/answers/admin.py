from django.contrib import admin

from answers.models import Answer


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass