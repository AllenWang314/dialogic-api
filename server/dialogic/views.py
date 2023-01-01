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

@api_view(['GET'])
def ping(request):
    if request.method == 'GET':
        return Response({"message": "pong"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def students_from_roster(request, pk):
    if request.method == 'GET':
        roster = Roster.objects.all().get(pk=pk)
        students = []
        for student_id in roster.student_list:
            student = Student.objects.all().get(pk=student_id)
            students.append(student)
        return Response(StudentSerializer(students, many=True).data, status=status.HTTP_200_OK)


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
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class TeacherView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class TeacherDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class RosterView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Roster.objects.all()
    serializer_class = RosterSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class RosterDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Roster.objects.all()
    serializer_class = RosterSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class SessionView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class SessionDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class StudentSessionView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = StudentSession.objects.all()
    serializer_class = StudentSessionSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class StudentSessionDetailView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = StudentSession.objects.all()
    serializer_class = StudentSessionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)