from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

from rest_framework.generics import get_object_or_404


class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        user = get_object_or_404(UserModel, email=username)
        print(user)
        return user if user.check_password(password) else None