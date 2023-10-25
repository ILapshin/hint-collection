from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('v1/users/', include('users.urls')),
    path('v1/topics/', include('topics.urls')),
    path('v1/subtopics/', include('subtopics.urls')),
    path('v1/questions/', include('questions.urls')),
    path('v1/answers/', include('answers.urls')),
]
