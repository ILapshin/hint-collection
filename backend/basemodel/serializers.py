from rest_framework.serializers import ModelSerializer, SerializerMethodField

from basemodel.models import BaseModel
        

class BaseModelSerializer(ModelSerializer):

    created_at = SerializerMethodField()
    edited_at = SerializerMethodField()
    creator_name = SerializerMethodField()

    class Meta:
        model = BaseModel
        fields = (
            'id',
            'content',
            'created_by',
            'creator_name',
            'created_at',
            'is_edited',
            'edited_at',
        )

    def get_created_at(self, obj):
        return obj.created_at.strftime('%Y-%m-%d')
    
    def get_edited_at(self, obj):
        return obj.edited_at.strftime('%Y-%m-%d') if obj.edited_at else None
    
    def get_creator_name(self, obj):
        return obj.created_by.username