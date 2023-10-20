from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/auth/', include('djoser.urls')),
    path('v1/users/', include('users.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('v1/topics/', include('topics.urls')),
    path('v1/subtopics/', include('subtopics.urls')),
    path('v1/questions/', include('questions.urls')),
    path('v1/answers/', include('answers.urls')),
]
