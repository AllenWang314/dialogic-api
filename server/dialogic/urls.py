from django.urls import path

from . import views

urlpatterns = [
    path('ping/', views.ping),
    path('student/', views.StudentView.as_view()),
    path('student/<str:pk>/', views.StudentDetailView.as_view())

]