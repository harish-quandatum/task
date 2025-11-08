from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
def register(request):
    print("Received registration data:", request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully!'})
    else:
        print("Serializer errors:", serializer.errors)
        return Response({'error': serializer.errors}, status=400)

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
        user = User.objects.get(email=email, password=password)
        return Response({'message': f'Welcome, {user.name}!'})
    except User.DoesNotExist:
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
