from django.core.exceptions import BadRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated 

from topics.models import Topic
from topics.serializers import TopicSerializer


class TopicList(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):        
        data = request.data
        data['created_by'] = request.user.id
        serializer = TopicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):        
        topics = Topic.objects.all()     
        if request.query_params.get('user'):
            topics = topics.filter(created_by=request.query_params.get('user'))        
        serializer = TopicSerializer(topics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TopicChange(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, topic_id):
        topic = get_object_or_404(Topic, id=topic_id)
        if not request.data.get('content'):            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        topic.edit(request.data.get('content'))
        return Response(TopicSerializer(topic).data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self, request, topic_id):
        topic = get_object_or_404(Topic, id=topic_id)
        topic.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)