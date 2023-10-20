from basemodel.serializers import BaseModelSerializer
from subtopics.models import Subtopic
from questions.serializers import QuestionSerializer


class SubtopicSerializer(BaseModelSerializer):

    class Meta(BaseModelSerializer.Meta):
        model = Subtopic
        fields = BaseModelSerializer.Meta.fields + ('topic', )


class FullSubtopicSerializer(BaseModelSerializer):
    
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta(BaseModelSerializer.Meta):
        model = Subtopic
        fields = BaseModelSerializer.Meta.fields + ('topic', 'questions', )
