import os
import shutil

from .settings import *

shutil.copyfile('db-e2e_template.sqlite3', 'db_e2e.sqlite3')


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'db_e2e.sqlite3'
    }
}
