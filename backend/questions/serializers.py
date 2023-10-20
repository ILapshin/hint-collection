from rest_framework.serializers import ModelSerializer, SerializerMethodField

from basemodel.serializers import BaseModelSerializer
from questions.models import Question
from answers.serializers import AnswerSerializer


class QuestionSerializer(BaseModelSerializer):

    answers = AnswerSerializer(many=True, read_only=True)
    is_marked = SerializerMethodField(read_only=True)

    class Meta(BaseModelSerializer.Meta):
        model = Question
        fields = BaseModelSerializer.Meta.fields + ('subtopic', 'is_marked', 'answers', )

    def get_is_marked(self, question):
        context = self.parent.context if self.parent else self.context
        user = context.get('request').user
        return user in question.marks.all()
