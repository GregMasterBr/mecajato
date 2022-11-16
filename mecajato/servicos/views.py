from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
#from .models import Cliente, Carro

def novo_servico(request):
    return render(request,'novo_servico.html')