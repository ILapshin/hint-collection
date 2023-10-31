from django.urls import path
from subtopics import views


urlpatterns = [
    path('', views.SubtopicList.as_view()),
    path('<str:topic_slug>/<str:subtopic_slug>/', views.SubtopicQuestions.as_view()),
    path('<int:subtopic_id>', views.SubtopicDetail.as_view()),
]