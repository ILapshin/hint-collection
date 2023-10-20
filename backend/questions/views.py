from django.core.exceptions import BadRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly  

from questions.models import Question
from questions.serializers import QuestionSerializer
from subtopics.models import Subtopic


class QuestionList(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        subtopic = get_object_or_404(Subtopic, id=request.data.get('subtopic'))
        data = request.data
        data['subtopic'] = subtopic.id
        data['created_by'] = request.user.id
        serializer = QuestionSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class QuestionDetail(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, question_id):        
        question = get_object_or_404(Question, id=question_id)
        if not request.data.get('content'):            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        question.edit(request.data.get('content'))
        return Response(QuestionSerializer(question, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self, request, question_id):
        question = get_object_or_404(Question, id=question_id)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        

class QuestionMark(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, question_id):
        question = get_object_or_404(Question, id=question_id)
        question.toggle_mark(request)
        return Response(QuestionSerializer(question, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
    
