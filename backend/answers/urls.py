from django.urls import path
from answers import views


urlpatterns = [
    path('', views.AnswerList.as_view()),
    path('<int:answer_id>', views.AnswerDetail.as_view()),
    path('toggle-like/<int:answer_id>', views.AnswerLike.as_view()),
]