from django.core.exceptions import BadRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated 

from slugify import slugify

from topics.models import Topic
from subtopics.models import Subtopic
from subtopics.serializers import FullSubtopicSerializer


class SubtopicList(APIView):

    permission_classes = [IsAuthenticated]
    
    def post(self, request):        
        topic = get_object_or_404(Topic, id=request.data.get('topic'))
        data = request.data
        data['topic'] = topic.id
        data['created_by'] = request.user.id
        data['slug'] = slugify(data.get('content'), only_ascii=True)
        serializer = FullSubtopicSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    
class SubtopicDetail(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, topic_slug, subtopic_slug):
        subtopic = Subtopic.objects.filter(topic__slug=topic_slug, slug=subtopic_slug)
        if not subtopic:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return subtopic.first()

    def patch(self, request, topic_slug, subtopic_slug):
        subtopic = self.get_object(topic_slug, subtopic_slug)

        if not request.data.get('content'):            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        subtopic.edit(request.data.get('content'))
        return Response(FullSubtopicSerializer(subtopic, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self, request, topic_slug, subtopic_slug):
        subtopic = self.get_object(topic_slug, subtopic_slug)
        subtopic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def get(self, request, topic_slug, subtopic_slug):
        subtopic = self.get_object(topic_slug, subtopic_slug)    
        serializer = FullSubtopicSerializer(subtopic, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)