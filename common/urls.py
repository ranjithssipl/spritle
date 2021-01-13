from users.views import UserViewset
from rest_framework import routers
# Defining Router
common_router = routers.DefaultRouter()

common_router.register(r'create_user', UserViewset)
