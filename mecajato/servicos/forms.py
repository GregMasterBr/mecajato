from django.forms import ModelForm
from .models import Servico, CategoriaManutencao

class FormServico(ModelForm):
    class Meta:
        model = Servico
        exclude = ['finalizado', 'protocolo']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'form-control', 'placeholder': (field.replace("_"," ")).title})
            #self.fields[field].widget.attrs.update({'placeholder': field})

        choices = list()
        for i, j in self.fields['categoria_manutencao'].choices:
            categoria = CategoriaManutencao.objects.get(titulo=j)
            choices.append((i.value, categoria.get_titulo_display()))
        
        self.fields['categoria_manutencao'].choices = choices