from django.urls import path
from topics import views


urlpatterns = [
    path('', views.TopicList.as_view()),
    path('<int:topic_id>', views.TopicChange.as_view()),
]