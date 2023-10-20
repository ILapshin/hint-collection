from rest_framework.serializers import ModelSerializer, SerializerMethodField

from basemodel.serializers import BaseModelSerializer
from answers.models import Answer


class AnswerSerializer(BaseModelSerializer):
   
    num_likes = SerializerMethodField(read_only=True)    
    is_liked = SerializerMethodField(read_only=True)

    class Meta(BaseModelSerializer.Meta):
        model = Answer
        fields = BaseModelSerializer.Meta.fields + ('num_likes', 'is_liked', 'question', )

    def get_is_liked(self, answer):
        context = self.parent.context if self.parent else self.context
        user = context.get('request').user
        return user in answer.likes.all()

    def get_num_likes(self, answer):
        return answer.likes.count()
