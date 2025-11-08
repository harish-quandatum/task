from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # Accounts (Register, Login, Users)
    path('api/', include('accounts.urls')),

    # Employees (CRUD)
    path('api/', include('employees.urls')),
]
