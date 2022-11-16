from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=50)
    sobrenome = models.CharField(max_length=50)
    email = models.EmailField(max_length=50)
    cpf = models.CharField(max_length=12)

    class Meta:
        verbose_name_plural = 'clientes'
        verbose_name = 'cliente'
        ordering = ('nome','sobrenome')


    def __str__(self) -> str:
        return self.nome
        

class Carro(models.Model):
    carro = models.CharField('Carro', max_length=50)
    placa = models.CharField('Placa', max_length=7,unique=True) # TODO uma maneira de UNIQUE True
    ano = models.IntegerField('Ano')
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    lavagens = models.IntegerField('Lavagens',default=0)
    consertos = models.IntegerField('Consertos',default=0)
    
    class Meta:
        verbose_name_plural = 'carros'
        verbose_name = 'carro'
        ordering = ('lavagens','consertos','ano')

    def __str__(self) -> str:
        return self.carro
