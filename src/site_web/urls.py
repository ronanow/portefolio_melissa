from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),             # page d'accueil
    path('projets/', views.projets, name='projets'), # page projets
    path('contact/', views.contact, name='contact'),# page contact
    path('apropos/', views.apropos, name='apropos'),# page a propos


    # pages vidéos individuelles
    path('video/montre/', views.video_montre, name='video_montre'),
    path('video/festival/', views.video_festival, name='video_festival'),
    path('video/pub/', views.video_pub, name='video_pub'),
    path('video/motion/', views.video_motion, name='video_motion'),
    path('video/suze/', views.video_suze, name='video_suze'),

    # page photos
    path('photos/event/', views.photos_event, name='photos_event'),
]