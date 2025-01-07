import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import PasswordResetForm
from django.core.mail import send_mail
from django.http import JsonResponse
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        try:
            user = User.objects.create_user(username=username, password=password, email=email)
            login(request, user)  # Log the user in after signup
            return JsonResponse({'message': 'User created and logged in successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        try:
            print("Login request received")
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            print(f"Attempting to authenticate user: {username}")
            
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                print(f"User authenticated: {username}")
                login(request, user)

                # Generate token 
                token = default_token_generator.make_token(user) 
                print(f"Generated token for {username}: {token}")
                return JsonResponse({'message': 'Logged in successfully!', 'token': token})

            else:
                print(f"Authentication failed for {username}")
                return JsonResponse({'error': 'Invalid credentials'}, status=401)

        except Exception as e:
            print(f"Error during login: {str(e)}")
            return JsonResponse({'error': str(e)}, status=500)

    print("Invalid request method")
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def user_logout(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully!'})

@csrf_exempt
def password_reset(request):
    if request.method == 'POST':
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            users = User.objects.filter(email=email)
            if users.exists():
                user = users[0]
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(str(user.pk).encode('utf-8')).decode('utf-8')
                reset_link = f'http://{get_current_site(request).domain}/reset-password/{uid}/{token}/'
                
                # Send reset email
                email_subject = 'Password Reset Request'
                message = render_to_string('password_reset_email.html', {
                    'reset_link': reset_link,
                    'user': user,
                })
                send_mail(
                    email_subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return JsonResponse({'message': 'Password reset email sent!'})
            else:
                return JsonResponse({'error': 'Email not found'}, status=404)
    return JsonResponse({'error': 'Invalid request'}, status=400)
