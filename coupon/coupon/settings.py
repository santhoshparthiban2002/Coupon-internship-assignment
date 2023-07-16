from pathlib import Path
import djongo

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = 'django-insecure-68y3qz_1c-=*ljg9j1y8e7#tc9jtx6_jdqzuo*hy5r)1kwfvtc'

DEBUG = True

ALLOWED_HOSTS = ['*']


INSTALLED_APPS = [
    'corsheaders',
    'rest_framework',
    'data',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'coupon.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'coupon.wsgi.application'



AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]



DATABASES = {
     'default': {
         'ENGINE': 'djongo',
         'NAME': 'coupon',
         'ENFORCE_SCHEMA': False,
           'CLIENT': {
            'host': 'mongodb+srv://coupon:coupon123@cluster0.s9mjenp.mongodb.net/?retryWrites=true&w=majority',
            'username': 'coupon',
            'password': 'coupon123',

        
        }
     }
 }

LANGUAGE_CODE = 'en-us'


TIME_ZONE = 'Asia/Kolkata'


USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

APPEND_SLASH=False

CORS_ORIGIN_ALLOW_ALL = True

