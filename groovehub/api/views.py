from datetime import datetime
from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response

# api view
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(APIView):

    serializer_class = CreateRoomSerializer

    def post (self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data = request.data)

        if serializer.is_valid() :
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            
            quert_set = Room.objects.filter(host = host)

            if quert_set.exists() :

                room = quert_set[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
            
                room.save(update_fields = ['guest_can_pause', 'votes_to_skip'])

            else:

                room = Room (host = host, guest_can_pause = guest_can_pause, votes_to_skip = votes_to_skip)
                room.save()

            self.request.session['room_code'] = room.code
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)


class GetRoom (APIView):
    serializer_class = RoomSerializer

    lookup_url_kward = 'code'

    def get (self, request, format=None):

        code = request.GET.get(self.lookup_url_kward)
        if code != None :
            room = Room.objects.filter(code = code)

            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host

                return Response(data, status=status.HTTP_200_OK)

            return Response({'ROOM NOT FOUND ': 'Invalid Room Code'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request' : 'Code not found in request'}, status=status.HTTP_400_BAD_REQUEST)


class JoinRoom (APIView):

    lookup_url_kward = 'code'

    serializer_class = RoomSerializer

    def post (self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code  = request.data.get(self.lookup_url_kward)

        if code != None :

            room_result = Room.objects.filter(code = code)

            if len(room_result ) > 0 :
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'Message':'Room Joined' }, status = status.HTTP_202_ACCEPTED)

            return Response({'Not Found':'Invalid  Room Code ' }, status = status.HTTP_404_NOT_FOUND)
        
        return Response({'Bad Request':'Invalid Post Data' }, status = status.HTTP_400_BAD_REQUEST)

class UserInRoom (APIView):
    
    def get (self,request, format=None ):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        data = {
            'code' : self.request.session.get('room_code')
        }

        return JsonResponse(data, status = status.HTTP_200_OK)

class LeaveRoom (APIView):
    
    def post (self, request, format=None) :

        if 'room_code' in self.request.session :
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key

            rooms = Room.objects.filter(host = host_id)

            if len(rooms) > 0:
                room = rooms[0]
                room.delete()

        return Response({'Message' : 'Success'}, status=status.HTTP_200_OK)

class UpdateRoom (APIView):
    serializer_class = UpdateRoomSerializer

       
    def patch(self, request, format=None ):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
         
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid() :
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            code = serializer.data.get('code')

            query_set = Room.objects.filter(code = code)

            if not query_set.exists():
                return Response({'Message' : "Room doesn't exists"} , status=status.HTTP_404_NOT_FOUND)
            
            room = query_set[0]

            user_id = self.request.session.session_key

            if room.host != user_id :
                return Response({'Invalid Access' : "Not Room Host"} , status=status.HTTP_403_FORBIDDEN)

            room.guest_can_pause = guest_can_pause
            room.votes_to_skip = votes_to_skip
            room.save(update_fields=['guest_can_pause', 'votes_to_skip'])

            return Response(RoomSerializer(room).data, status=status.status.HTTP_200_OK)

        return Response({"Bad Request" : "Invalid data ..."}, status=status.HTTP_400_BAD_REQUEST)