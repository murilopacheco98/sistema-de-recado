let login = window.sessionStorage.getItem("login");

if (!login) {
  window.location = "./login.html";
}

//CAPTURAR OS ELEMENTOS DA DOM - ELEMENTOS DO FORMULÁRIO
let formulario = document.querySelector('#form-cadastro');
let inputDetalhamento = document.querySelector('#input-detalhamento');
let inputDescricao = document.querySelector('#input-descricao');
let botaoApagar = document.querySelector('#btn-apagar');
let botaoEditar = document.querySelector('#btn-editar');
let botaoSalvar = document.querySelector('#btn-salvar');
let tabelaRegistros = document.querySelector('#tabela-registros');

mostrarRecados();

// Botão salvar - tirar o efeito de atualizar a página quando clicado e adicionar novo registro
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    adicionarNovoRegistro();
});

document.addEventListener('DOMContentLoaded', pegarDadosStorage);

btnSair.addEventListener("click", sairLogin);
// botaoCancelar.addEventListener('click', cancelarEdicao);

function adicionarNovoRegistro(){
    let listaRegistros = JSON.parse(localStorage.getItem('Meus Registros')) || [];    
    let registroID = listaRegistros.length + 1
    let detalhamento = inputDetalhamento.value;
    let descricao = inputDescricao.value;

    let registro = {
        registroID,
        detalhamento,
        descricao
    }

    listaRegistros.push(registro);
    console.log(listaRegistros);

    salvarNaTabela(registro);
    limparCampos();
    salvarNoStorage(listaRegistros); 
}

function salvarNaTabela(dadosRegistro){
    let listaRegistros = JSON.parse(localStorage.getItem('Meus Registros')) || [];
    let novaLinha = document.createElement('tr');
    let colunaRegistro = document.createElement('td');
    let colunaDetalhamento = document.createElement('td');
    let colunaDescricao = document.createElement('td');
    let colunaAcoes = document.createElement('td');

    novaLinha.setAttribute('class', 'registros');
    novaLinha.setAttribute('id', dadosRegistro.registroID);
    //colunaRegistro.setAttribute('id',)
    colunaRegistro.innerHTML = dadosRegistro.registroID;
    colunaDetalhamento.innerHTML = dadosRegistro.detalhamento;
    colunaDescricao.innerHTML = dadosRegistro.descricao;
    colunaAcoes.innerHTML = `
                                <button class="btn-editar" onclick="prepararEdicao(${dadosRegistro.registroID})">Editar</button>
                                <button class="btn-apagar" onclick="apagarRegistro(${dadosRegistro.registroID})">Apagar</button>
                            `
    novaLinha.appendChild(colunaRegistro);
    novaLinha.appendChild(colunaDetalhamento);
    novaLinha.appendChild(colunaDescricao);
    novaLinha.appendChild(colunaAcoes);
    
    tabelaRegistros.appendChild(novaLinha);
}

function limparCampos(){
    inputDetalhamento.value = '';
    inputDescricao.value = '';
}

function salvarNoStorage(listaRegistros){
    //setItem('chave', 'valor')
    //tornar tudo string => JSON.stringify(valor)
    localStorage.setItem('Meus Registros', JSON.stringify(listaRegistros));    
}

function pegarDadosStorage(){
    //transformar tudo de volta para array e objetos JSON.parse(valor)
    let dadosStorage = JSON.parse(localStorage.getItem('Meus Registros'));
    if(dadosStorage){
        for(let registro of dadosStorage){
            salvarNaTabela(registro);
        }
    }
    return
}

function apagarRegistro(registroID){
    let listaRegistros = JSON.parse(localStorage.getItem('Meus Registros'));

    let indiceEncontrado = listaRegistros.findIndex((livro) => livro.registroID == registroID);
    console.log(`Encontrei na posição ${indiceEncontrado}`);
    console.log(listaRegistros)

    let confirma = window.confirm(`Tem certeza que deseja remover o livro de registro ID ${registroID}?`);

    if(confirma){
        let linhasTabela = document.querySelectorAll('.registros');

        for(let linha of linhasTabela){
            if(linha.id == registroID){
                console.log(linha);
                tabelaRegistros.removeChild(linha);
                listaRegistros.splice(indiceEncontrado, 1);
                alert("Registro removido!");
            }
            if(linha.id > registroID){
                console.log(linha.id)
                let teste = document.getElementById(linha.id)
                console.log(teste)
                teste.id.innerHTML = teste.id - 1
            }
        }
        localStorage.clear();
        salvarNoStorage(listaRegistros);

    } else {
        return
    }    
}

function substituirRecado() {
    let listaRecados = buscaUser();
    let atualiza = confirm("Deseja atualizar o seu recado?");
    if (atualiza) {
      recadoEditado.descricao = descricaoInput.value;
      recadoEditado.detalhamento = detalhamentoInput.value;
      listaRecados[recadoEditado.indice] = recadoEditado;
      atualizaUser()
      window.location.reload();
    } else {
      descricaoInput.value = "";
      detalhamentoInput.value = "";
      formAdd.removeEventListener("submit", substituirRecado);
      formAdd.addEventListener("submit", enviarRecado);
    }
  }
  
function apagarRecado(indiceDoRecado) {
    let listaRecados = buscaUser();
    let apaga = confirm("Deseja apagar o seu recado?");
  
    if (apaga) {
      listaRecados.splice([indiceDoRecado], 1);
      atualizaUser()
      window.location.reload();
      return;
    } else {
      return;
    }
}

function buscaUser() {
    return users[userPosicao].recadosUser;
  }
  
  function atualizaUser(){
    return window.localStorage.setItem("usuario", JSON.stringify(users));
  }