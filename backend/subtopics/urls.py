from django.urls import path
from subtopics import views


urlpatterns = [
    path('', views.SubtopicList.as_view()),
    path('<int:subtopic_id>', views.SubtopicDetail.as_view()),
]