from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('v1/auth/', include('djoser.urls')),
    path('v1/users/', include('users.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken'))
]
