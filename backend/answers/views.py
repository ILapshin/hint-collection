from django.core.exceptions import BadRequest

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly  

from answers.models import Answer
from answers.serializers import AnswerSerializer
from questions.models import Question


class AnswerList(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request):
        question = get_object_or_404(Question, id=request.data.get('question'))
        data = request.data
        data['question'] = question.id
        data['created_by'] = request.user.id
        serializer = AnswerSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AnswerDetail(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, answer_id):        
        answer = get_object_or_404(Answer, id=answer_id)
        if not request.data.get('content'):            
            return Response(status=status.HTTP_400_BAD_REQUEST)
        answer.edit(request.data.get('content'))
        return Response(AnswerSerializer(answer, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
    
    def delete(self, request, answer_id):
        answer = get_object_or_404(Answer, id=answer_id)
        answer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class AnswerLike(APIView):

    permission_classes = [IsAuthenticatedOrReadOnly]

    def patch(self, request, answer_id):
        answer = get_object_or_404(Answer, id=answer_id)
        answer.toggle_like(request)
        return Response(AnswerSerializer(answer, context={'request': request}).data, status=status.HTTP_202_ACCEPTED)
    
