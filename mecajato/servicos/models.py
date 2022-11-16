from email.policy import default
from secrets import token_hex
from django.db import models
from mecajato.clientes.models import Cliente
from .choices import ChoicesCategoriaManutencao
from datetime import datetime

class CategoriaManutencao(models.Model):
    titulo = models.CharField('Título', max_length=3, choices=ChoicesCategoriaManutencao.choices)
    preco = models.DecimalField('Preço', max_digits=8, decimal_places=2)

    def __str__(self) -> str:
        return self.titulo

class Servico(models.Model):
    titulo = models.CharField('Título', max_length=30)
    cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True)
    categoria_manutencao = models.ManyToManyField(CategoriaManutencao)
    data_inicio = models.DateField('Data de ínicio',null=True)
    data_entrega = models.DateField('Data de Entrega',null=True)
    finalizado = models.BooleanField('Finalizado', default=False)
    protocolo = models.CharField('Protocolo', max_length=52, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'serviços'
        verbose_name = 'serviço'

    def __str__(self) -> str:
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.protocolo:
            self.protocolo = datetime.now().strftime("%d/%m/%Y-%H:%M:%S-") + token_hex(16)
        super(Servico, self).save(*args, **kwargs)

    def preco_total(self):
        preco_total = float(0)
        for categoria in self.categoria_manutencao.all():
            preco_total += float(categoria.preco)

        return preco_total