import os
import shutil

from .settings import *

shutil.copyfile('db-e2e_template.sqlite3', 'db-e2e.sqlite3')


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db-e2e.sqlite3'
    }
}
