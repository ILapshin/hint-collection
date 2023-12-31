from django.urls import path
from questions import views


urlpatterns = [
    path('', views.QuestionList.as_view()),
    path('<int:question_id>', views.QuestionDetail.as_view()),
    path('toggle-mark/<int:question_id>', views.QuestionMark.as_view()),
]