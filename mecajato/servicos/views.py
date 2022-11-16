from django.urls import reverse
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
#from .models import Cliente, Carro
from .forms import FormServico

def novo_servico(request):
    if request.method == "GET":
        form = FormServico()
        return render(request, 'novo_servico.html', {'form': form})
    elif request.method == "POST":
        form = FormServico(request.POST)

        if form.is_valid():
            form.save()
            return HttpResponse('Salvo com sucesso')
        else:
            return render(request, 'novo_servico.html', {'form': form})