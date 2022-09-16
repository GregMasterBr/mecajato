function add_carro(){
    container = document.getElementById('form-carro')

    html = "<br>  <div class='row'> <div class='col-md'> <input type='text' placeholder='carro' class='form-control' name='carro' > </div> <div class='col-md'><input type='text' placeholder='Placa' class='form-control' name='placa' ></div> <div class='col-md'> <input type='number' placeholder='ano' class='form-control' name='ano'> </div> </div>"

    container.innerHTML += html
}

function exibir_form(tipo){
    add_cliente = document.getElementById("cadastrar-cliente");
    upd_cliente = document.getElementById("atualizar-clientes");
    //alert(tipo)
    if (tipo=="2"){
        //EXIBIR ATUALIZAR CLIENTE        
        add_cliente.style.display="none";
        upd_cliente.style.display="block";
    }else{
        //EXIBIR CADASTRAR CLIENTE
        add_cliente.style.display="block";
        upd_cliente.style.display="none";        

    }
}

function dados_cliente(){
    cliente = document.getElementById("lista_cliente");
    //console.log(cliente.value)
    crsf_token = document.getElementsByName("csrfmiddlewaretoken");
    data = new FormData();
    data.append('id_cliente',cliente.value);
    //console.log(crsf_token[0].value)
    fetch("/clientes/atualiza_cliente/",{
        method: "POST",
        headers: {
            'X-CSRFToken':crsf_token[0].value
        },
        body: data
    }).then(function(result){
        return result.json()
    }).then(function(data){
        doc = document.getElementById("form_atualizar_cliente");
        doc.style.display = "block";

        nome = document.getElementById("nome_upd");
        nome.value = data["nome"];
        sobrenome = document.getElementById("sobrenome_upd");
        sobrenome.value = data["sobrenome"];
        email = document.getElementById("email_upd");
        email.value = data["email"];
        cpf = document.getElementById("cpf_upd");
        cpf.value = data["cpf"];

        console.log(data, data['nome'])
    });
}