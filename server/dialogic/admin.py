from django.contrib import admin
from dialogic.models import Student, Teacher, Roster, Session, StudentSession

# Register your models here.

admin.site.register([Student, Teacher, Roster, Session, StudentSession])
