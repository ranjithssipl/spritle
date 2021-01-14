from users.serializers import UsersSerializer
from users.models import SpritleUser
from rest_framework import permissions
from rest_framework import viewsets, status
from django.contrib.auth.models import Group
from django.contrib.auth.decorators import permission_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer
import datetime
from rest_framework.decorators import action
from spritle.settings import BASE_DIR
import os


def jwt_response_payload_handler(token, user=None, request=None):
    """ Modifying jwt login response details """
    user_details = UsersSerializer(user, context={'request': request}).data

    # """ Fetching assigned accesses for the use """
    # user_details['accesses'] = list()

    return {
        'token': token,
        'user': user_details
    }

"""
User creation, list, view, edit and delete
"""


class UserViewset(viewsets.ModelViewSet):
    queryset = SpritleUser.objects.all()
    serializer_class = UsersSerializer

    @action(methods=['get'], detail=False, url_path="get-classes")
    def get_classes(self, request):
        path = BASE_DIR + '/users/coco.names'
        with open(path, 'r') as f:
            classes = [w.strip() for w in f.readlines()]

        return Response({"data": classes})

    @action(methods=['post'], detail=False, url_path="show-classes")
    def find_classes(self, request):
       # selected_data = request.data['selected_data']
       classes = request.data
       import subprocess
       path = BASE_DIR + '/users/'
       file_path = path + 'classes'
       if os.path.exists(file_path):
           os.remove(file_path)
       os.makedirs(path, exist_ok=True)
       for data in classes:
           with open(file_path, 'a') as outfile:
               outfile.write(data + os.linesep)
       cmd1 = "cd " + BASE_DIR + '/users'
       cmd2 = "python demo_usage.py"

       command = cmd1 + ';' + cmd2
       process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
       output = process.stdout.read()
       output_string = output.decode()
       exitstatus = process.poll()
       return Response({"data": classes})





