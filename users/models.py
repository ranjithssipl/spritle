from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from simple_history.models import HistoricalRecords
from django.conf import settings

# Create your models here.


class SpritleUser(AbstractUser):
    pass

