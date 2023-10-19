from rest_framework import serializers

from users.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)


    def create(self, validated_data):

        user = CustomUser.objects.create_user(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            is_active=False,
        )

        return user


    class Meta:
        model = CustomUser
        fields = (
            'id',
            'username',
            'email',
            'password'
        )