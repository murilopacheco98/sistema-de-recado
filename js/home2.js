// VALIDAÇÃO DO LOGIN 
let login = window.sessionStorage.getItem("login");
if (!login) {
  window.location = "./login.html";
}

// DECLARAÇÃO DAS VARIÁVEIS
let formAdd = document.querySelector("#form-cadastro");
let users = JSON.parse(window.localStorage.getItem("usuario"));
let userPosicao = window.sessionStorage.getItem("indexUser");
let btnSair = document.querySelector("#btn-sair");
let descricaoInput = document.querySelector("#input-descricao");
let detalhamentoInput = document.querySelector("#input-detalhamento");
let tabela = document.querySelector("#tabela-registros");
let recadoEditado = null;

// -----> EVENTOS <-----
mostrarRecados();
formAdd.addEventListener("submit", enviarRecado);
btnSair.addEventListener("click", sairLogin);

// -----> FUNÇÕES <-----
function enviarRecado() {
  let recado = {
    indice: null,
    descricao: descricaoInput.value,
    detalhamento: detalhamentoInput.value,
  };
  if (recado.descricao !== "" && recado.detalhamento !== "") {
    users[userPosicao].recadosUser.push(recado);

    atualizaUser()

    window.location.reload();
  } else {
    descricaoInput.value = "";
    detalhamentoInput.value = "";
  }
}

function mostrarRecados() {
    let listaRecados = buscaUser();
    if (listaRecados.length > 0) {
    for (const index in listaRecados) {
      listaRecados[index].indice = index;

      atualizaUser()

      const linha = document.createElement("tr");
      linha.setAttribute("class", "linha");

      let numeroColuna = document.createElement("td");
      numeroColuna.innerText = Number(index) + 1;
      numeroColuna.setAttribute("class", "num");

      let descricaoColuna = document.createElement("td");
      descricaoColuna.setAttribute("class", "coldescr");
      descricaoColuna.innerText = listaRecados[index].descricao;

      let detalhamentoColuna = document.createElement("td");
      detalhamentoColuna.setAttribute("class", "coldet");
      detalhamentoColuna.innerText = listaRecados[index].detalhamento;

      let acaoColuna = document.createElement("td");
      acaoColuna.setAttribute("class", "acao");

      let btnEditar = document.createElement("button");
      btnEditar.setAttribute("class", "btn-editar-apagar btn-editar");
      btnEditar.setAttribute("onclick", "editarRecado(" + index + ")");
      btnEditar.innerText = "Editar";

      let btnApagar = document.createElement("button");
      btnApagar.setAttribute("class", "btn-editar-apagar btn-apagar");
      btnApagar.setAttribute("onclick", "apagarRecado(" + index + ")");
      btnApagar.innerText = "Apagar";

      let criaLinha = tabela.appendChild(linha);

      criaLinha.appendChild(numeroColuna);
      criaLinha.appendChild(descricaoColuna);
      criaLinha.appendChild(detalhamentoColuna);
      let criaBotoes = criaLinha.appendChild(acaoColuna);

      criaBotoes.appendChild(btnEditar);
      criaBotoes.appendChild(btnApagar);
    }
    return;
  } else {
    return;
  }
}

function sairLogin() {
  window.sessionStorage.clear();
  window.location = "./login.html";
}

function editarRecado(indiceDoRecado) {
  let listaRecados = buscaUser();
  descricaoInput.value = listaRecados[indiceDoRecado].descricao;
  detalhamentoInput.value = listaRecados[indiceDoRecado].detalhamento;
  recadoEditado = listaRecados[indiceDoRecado];
  formAdd.removeEventListener("submit", enviarRecado);
  formAdd.addEventListener("submit", substituirRecado);
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