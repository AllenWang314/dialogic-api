from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from dialogic.models import Student, Teacher, Roster, Session, StudentSession
from dialogic.serializers import StudentSerializer, TeacherSerializer, RosterSerializer, SessionSerializer, StudentSessionSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, mixins, generics


# Create your views here.

def ping(request):
    if request.method == 'GET':
        return Response({"message": "pong"}, status=status.HTTP_200_OK)

class StudentView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StudentDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)