from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('djoser.urls')),
    path('api/auth/', include('djoser.urls.authtoken')),
    path('api/auth/', include('djoser.urls.jwt')),
    path('api/users/', include('users.urls')),
    path('api/topics/', include('topics.urls')),
    path('api/subtopics/', include('subtopics.urls')),
    path('api/questions/', include('questions.urls')),
    path('api/answers/', include('answers.urls')),
    path('', view=TemplateView.as_view(template_name='index.html'))
]
