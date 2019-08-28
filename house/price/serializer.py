from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class meta:
        model=User
        fields=["id","user_name","password","user_phone","user_mail","session_id"]