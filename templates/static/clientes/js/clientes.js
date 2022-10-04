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
        id = document.getElementById('id')
        id.value = data['cliente_id']        
        nome = document.getElementById("nome_upd");
        nome.value = data['cliente']["nome"];
        sobrenome = document.getElementById("sobrenome_upd");
        sobrenome.value = data['cliente']["sobrenome"];
        email = document.getElementById("email_upd");
        email.value = data['cliente']["email"];
        cpf = document.getElementById("cpf_upd");
        cpf.value = data['cliente']["cpf"];

        console.log(data, data['cliente']['nome'])
        div_carros = document.getElementById('carros')
        div_carros.innerHTML="";
        for(i=0; i<data['carros'].length; i++){
            console.log(data['carros'][i])
            div_carros.innerHTML += "\<form action='/clientes/atualiza_carro/" + data['carros'][i]['id'] +"' method='POST'>\
                <div class='row'>\
                        <div class='col-md'>\
                            <input class='form-control' name='carro' type='text' value='" + data['carros'][i]['fields']['carro'] + "'>\
                        </div>\
                        <div class='col-md'>\
                            <input class='form-control' name='placa' type='text' value='" + data['carros'][i]['fields']['placa'] + "'>\
                        </div>\
                        <div class='col-md'>\
                            <input class='form-control' type='text' name='ano' value='" + data['carros'][i]['fields']['ano'] + "' >\
                        </div>\
                        <div class='col-md'>\
                            <input class='btn btn-lg btn-success' type='submit' value='SALVAR'>\
                        </div>\
                    </form>\
                    <div class='col-md'>\
                        <a href='/clientes/excluir_carro/"+ data['carros'][i]['id'] +"' class='btn btn-lg btn-danger'>EXCLUIR</a>\
                    </div>\
                </div><br>"
        }        

    });
}


function update_cliente(){
    nome = document.getElementById('nome_upd').value
    sobrenome = document.getElementById('sobrenome_upd').value
    email = document.getElementById('email_upd').value
    cpf = document.getElementById('cpf_upd').value
    id = document.getElementById('id').value
    //crsf_token = document.getElementsByName("csrfmiddlewaretoken");

    fetch('/clientes/update_cliente/' + id, {
        method: 'POST',
        headers: {
            'X-CSRFToken':crsf_token[0].value,
        },
        body: JSON.stringify({
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cpf: cpf,
        })

    }).then(function(result){
        return result.json()
    }).then(function(data){

        if(data['status'] == '200'){
            nome = data['nome']
            sobrenome = data['sobrenome']
            email = data['email']
            cpf = data['cpf']
            console.log('Dados alterado com sucesso')
        }else{
            console.log('Ocorreu algum erro')
        }

    })

}