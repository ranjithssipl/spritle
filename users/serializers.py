from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from users.models import SpritleUser
from django.contrib.auth.models import Group, Permission
import datetime
from django.db.models import Q


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    permissions = serializers.ListField(source='get_all_permissions', read_only=True)

    def to_representation(self, instance):
        """ Serialize GenericForeignKey field """

        primitive_repr = super(UsersSerializer, self).to_representation(instance)

        if 'first_name' in primitive_repr and 'last_name' in primitive_repr:
            primitive_repr['full_name'] = '%s %s' %(primitive_repr['first_name'],primitive_repr['last_name'])

        return primitive_repr

    class Meta:
        model = SpritleUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'permissions', 'is_superuser')

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)
        user = super(UsersSerializer, self).create(validated_data)
        user.save()
        profile_data['created_by'] = self.context['request'].user
        self.create_or_update_profile(user, profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        profile_data['modified_by'] = self.context['request'].user
        profile_data['modified_date'] = datetime.datetime.now()
        self.create_or_update_profile(instance, profile_data)
        return super(UsersSerializer, self).update(instance, validated_data)




