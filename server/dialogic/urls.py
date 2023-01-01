from django.urls import path

from . import views

urlpatterns = [
    path('ping/', views.ping),
    path('student/', views.StudentView.as_view()),
    path('student/<str:pk>/', views.StudentDetailView.as_view()),
    path('teacher/', views.TeacherView.as_view()),
    path('teacher/<str:pk>/', views.TeacherDetailView.as_view()),
    path('roster/', views.RosterView.as_view()),
    path('roster/students/<str:pk>/', views.students_from_roster),
    path('roster/<str:pk>/', views.RosterDetailView.as_view()),
    path('session/', views.SessionView.as_view()),
    path('session/<str:pk>/', views.SessionDetailView.as_view()),
    path('student_session/', views.SessionView.as_view()),
    path('student_session/<str:pk>/', views.SessionDetailView.as_view())
]