from rest_framework import serializers
from dialogic.models import Student, Teacher, Roster, Session, StudentSession


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ["id", "created", "name", "gender", "grade", "email"]

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id", "created", "magic_link", "email", "name", "school", "auth", "enabled"]

class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roster
        fields = ["id", "created", "teacher", "name", "subject", "period", "student_list"]

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ["id", "created", "roster", "magic_link", "name", "notes", "student_list", "graph", "statistics", "start_time", "end_time", "group_score", "survey_questions"]

class StudentSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentSession
        fields = ["id", "created", "session", "student", "magic_link", "survey_responses"]