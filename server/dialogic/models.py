import uuid
from django.contrib.postgres.fields import ArrayField
from django.db import models


def default_questions():
    return [
        "What were three takeaways from today's discussion?",
        "What's something we can work on as a class?",
        "How would you grade the discussion out of 10?",
    ]


class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField(auto_now_add=True)
    magic_link = models.UUIDField(default=uuid.uuid4)
    name = models.CharField(max_length=200)
    gender = models.CharField(max_length=200)
    grade = models.IntegerField()
    email = models.CharField(max_length=200)


class Teacher(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField(auto_now_add=True)
    magic_link = models.UUIDField(default=uuid.uuid4)
    email = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    school = models.CharField(max_length=200)
    auth = models.CharField(max_length=200, blank=True, default=str)
    enabled = models.BooleanField(default=True)


class Roster(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    subject = models.CharField(max_length=200)
    period = models.CharField(max_length=200)
    student_list = ArrayField(models.CharField(max_length=64))


class Session(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField(auto_now_add=True)
    roster = models.ForeignKey(Roster, on_delete=models.CASCADE)
    magic_link = models.UUIDField(default=uuid.uuid4)
    name = models.CharField(max_length=200)
    notes = models.TextField(blank=True)
    student_list = ArrayField(models.CharField(max_length=64), blank=True)
    graph = ArrayField(models.CharField(max_length=64), blank=True)
    statistics = models.JSONField(default=dict)
    start_time = models.IntegerField()
    end_time = models.IntegerField()
    group_score = models.IntegerField()
    discussion_state = models.CharField(max_length=200, default="initial") 
    survey_questions = ArrayField(models.TextField(), default=default_questions)


class StudentSession(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created = models.DateTimeField(auto_now_add=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    magic_link = models.UUIDField(default=uuid.uuid4)
    survey_responses = models.JSONField(default=dict)
