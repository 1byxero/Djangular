from django.contrib import admin
# Register your models here.
from .models import Token
class TokenAdmin(admin.ModelAdmin):
    pass
admin.site.register(Token, TokenAdmin)