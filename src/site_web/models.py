# galerie/models.py
from django.db import models


class Photo(models.Model):
    title  = models.CharField("Titre", max_length=200)
    image  = models.ImageField("Image", upload_to="galerie/")
    ordre  = models.PositiveIntegerField("Ordre d'affichage", default=0)

    class Meta:
        ordering = ["ordre", "id"]
        verbose_name = "Photo"
        verbose_name_plural = "Photos"

    def __str__(self):
        return self.title
from django.db import models

# Create your models here.
