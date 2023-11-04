from rest_framework.serializers import ModelSerializer, SerializerMethodField

from basemodel.serializers import BaseModelSerializer
from subtopics.models import Subtopic
from questions.serializers import QuestionSerializer


class SubtopicSerializer(BaseModelSerializer):

    num_questions = SerializerMethodField()
    num_marked = SerializerMethodField()

    class Meta(BaseModelSerializer.Meta):
        model = Subtopic
        fields = BaseModelSerializer.Meta.fields + ('topic', 'slug', 'num_questions', 'num_marked')

    def get_num_questions(self, subtopic):
        return subtopic.questions.count()
    
    def get_num_marked(self, subtopic):
        context = self.context 
        user = context.get('request').user
        if not user.id:
            return None
        return subtopic.questions.filter(marks=user).count()


class FullSubtopicSerializer(BaseModelSerializer):
    
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta(BaseModelSerializer.Meta):
        model = Subtopic
        fields = BaseModelSerializer.Meta.fields + ('topic', 'slug', 'questions', )
