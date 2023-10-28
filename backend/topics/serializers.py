from basemodel.serializers import BaseModelSerializer
from topics.models import Topic
from subtopics.serializers import SubtopicSerializer


class TopicSerializer(BaseModelSerializer):

    subtopics = SubtopicSerializer(many=True, read_only=True)

    class Meta(BaseModelSerializer.Meta):
        model = Topic
        fields = BaseModelSerializer.Meta.fields + ('subtopics', 'slug')
