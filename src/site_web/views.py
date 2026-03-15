
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.contrib import messages
from .models import Photo

# page d'accueil
def index(request):
    return render(request, 'site_web/home.html')

# page projets
def projets(request):
    return render(request, 'site_web/projets.html')

def apropos(request):
    return render(request, 'site_web/apropos.html')


# vues vidéos
def video_montre(request):
    context = {
        'video_src': 'site_web/videos/Motion_Montre_2.mp4',
        'comment': """<span class="titre">Nothing Watch</span>

<span class="sous-titre">montage</span>
Ce projet consiste à créer une courte présentation en motion design pour mettre en avant l'interactivité d'une montre. Pensé pour un format publicitaire YouTube, le clip doit être très court, clair et impactant, tout en transmettant immédiatement les fonctionnalités clés du produit.
Je travaille uniquement en motion design, en animant les éléments graphiques pour rendre la montre vivante et interactive. Chaque transition et chaque mouvement sont pensés pour guider le regard du spectateur et créer un flux visuel fluide et compréhensible en quelques secondes. Le rythme et les effets visuels renforcent la sensation d'interaction, donnent du dynamisme au produit et captent l'attention rapidement, comme le demande un format publicitaire court.
Ce projet me permet de développer mon langage visuel en motion design, en combinant storytelling, rythme et animation pour communiquer un message précis et attractif."""
    }
    return render(request, 'site_web/video_templates.html', context)

def video_festival(request):
    context = {
        'video_src': 'site_web/videos/festival.mp4',
        'comment': """<span class="titre">Ozora Festival – Clip événementiel</span>
<span class="sous-titre">cadrage & montage</span>
Ce projet a pour objectif de créer un teaser pour le site de l'Ozora Festival, un festival de musique psychédélique en Hongrie axé sur le voyage spirituel. Pendant deux semaines, je plonge dans l'ambiance unique du festival, en filmant à la main, de manière spontanée, pour capturer l'énergie, les gestes et les moments humains qui le font vivre. Je privilégie les instants qui racontent le mieux l'expérience collective.
Le format du teaser et sa courte durée guident mes choix de montage. Ralentis, accélérations et variations de rythme sont pensés pour suggérer une expérience onirique, immergeant le spectateur dans l'atmosphère unique et mystique du festival.
Ce projet me permet de combiner observation et narration visuelle dynamique. Il illustre mon regard sur le mouvement, le rythme et la manière de transformer une expérience collective en récit immersif.
Musique : @"""
    }
    return render(request, 'site_web/video_templates.html', context)

def video_pub(request):
    context = {
        'video_src': 'site_web/videos/court.mp4',
        'comment': """<span class="titre">Note d’intention - Projet Parapluie Rouge</span> <span class="sous-titre">réalisation - écriture </span>"""
    }
    return render(request, 'site_web/video_templates.html', context)

def video_motion(request):
    context = {
        'video_src': 'site_web/videos/motion.mp4',
        'comment': (
            """<span class="titre">ITW - STUDI</span>\n
            <span class="sous-titre">cadrage - montage</span>\n
            J'ai filmé et monté une interview pour la communication interne de l'entreprise STUDI, 
            portant sur le sujet de la RSE. Comme le discours et le son sont au centre de l'attention, 
            je limite les effets visuels afin de mettre en valeur le message et assurer la clarté de l'interview. 
            Je choisis également la lumière et le décor pour renforcer l'identité visuelle de l'entreprise 
            et créer un cadre agréable et professionnel, tout en guidant le regard du spectateur vers le sujet principal.\n
            Parallèlement à ce projet, j'ai collaboré à la conception de cours à des fins pédagogiques, 
            en utilisant le logiciel vMix pour produire et monter des vidéos en direct. 
            Ces expériences me permettent de renforcer ma capacité à adapter mes choix techniques et créatifs 
            à différents formats et publics, en tenant compte des contraintes visuelles et techniques 
            d'une production professionnelle."""
        )
    }

    return render(request, 'site_web/video_templates.html', context)
def video_suze(request):
    context = {
        'video_src': 'site_web/videos/suze.mp4',
        'comment': """<span class="titre">Montage.</span>"""
    }
    return render(request, 'site_web/video_templates.html', context)


# page photos
def photos_event(request):
    context = {
        'photos': [
            'site_web/images/event1.jpg',
            'site_web/images/event2.jpg',
            'site_web/images/event3.jpg',
            'site_web/images/event4.jpg',
            'site_web/images/event8.jpg',
            'site_web/images/event9.jpg',
            'site_web/images/event5.jpg',
            'site_web/images/event7.jpg',
            'site_web/images/event10.jpg',
        ]
    }
    return render(request, 'site_web/photos_templates.html', context)

def galerie(request):
    context = {
        'photos': [
            {'src': 'site_web/images/event1.jpg',  'title': 'Photo 1'},
            {'src': 'site_web/images/event2.jpg',  'title': 'Photo 2'},
            {'src': 'site_web/images/event3.jpg',  'title': 'Photo 3'},
            {'src': 'site_web/images/event4.jpg',  'title': 'Photo 4'},
            {'src': 'site_web/images/event5.jpg',  'title': 'Photo 5'},
            {'src': 'site_web/images/event7.jpg',  'title': 'Photo 6'},
            {'src': 'site_web/images/event8.jpg',  'title': 'Photo 7'},
            {'src': 'site_web/images/event9.jpg',  'title': 'Photo 8'},
            {'src': 'site_web/images/event10.jpg', 'title': 'Photo 9'},
        ]
    }
    return render(request, 'site_web/carousel_courbe.html', context)


def contact(request):
    return render(request, 'site_web/contact.html')



