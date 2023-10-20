from rest_framework.serializers import ModelSerializer

from basemodel.models import BaseModel
        

class BaseModelSerializer(ModelSerializer):

    class Meta:
        model = BaseModel
        fields = (
            'id',
            'content',
            'created_by',
            'created_at',
            'is_edited',
            'edited_at',
        )
