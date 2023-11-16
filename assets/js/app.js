const tarefas = document.querySelector('.row');
const addTarefas = document.querySelector('.input-nova-tarefa');
const buttonAdd = document.querySelector('.submit');

function criaLi() {
  const li = document.createElement('li');
  return li;
}
function addCard() {
  let li = criaLi();
  tarefas.appendChild(li);
  li.classList.add('col');
  getConfig(li);
  return li;
}
function getConfig(li) {
  let text = document.createElement('div');
  li.appendChild(text)
  text.classList.add('text');
  adicionaTexto();
  return text;
}
function adicionaTexto(input) {
  if (input == '') {
    console.log("Preencha o campo de texto");
  } else {
    const tarefa = addCard();
    return tarefa;
  };
  return console.log('Algo deu errado!')
}

buttonAdd.addEventListener('click', function (e) {
  adicionaTexto(addTarefas.value);
  //const li = document.createElement('li');
  //tarefas.appendChild(li);
  //li.classList.add('col');
});














function limpaInput(input) {
  input.value = '';
}
function salvaDados(text) {
  localStorage.setItem('dado', JSON.stringify([...JSON.parse(localStorage.getItem('dado')) || [],
  { id: Date.now(), texto: text.innerText }]))
}
function carregarDados() {
  const dados = JSON.parse(localStorage.getItem('dado'));
  dados && dados.forEach((item) => {
    criarCards(item);
  });
}
function criarCards({ id, texto }) {
  let card = document.createElement('div');
  card.innerHTML += `<h2>${texto}</h2>`;
  card.innerHTML += '<button class="btn btn-primary">Excluir</button>';
  card.classList.add('card');
  card.dataset.id = id;
  tarefas.appendChild(card);
  deletarBotao(card);
}
function deletarBotao(card) {
  let botaoDeletar = card.querySelector('.btn')
  botaoDeletar.addEventListener('click', () => {
    excluiTarefa(card);
  })
}
function excluiTarefa(card) {
  const dados = JSON.parse(localStorage.getItem('dado'));
  dados = dados.filter(tarefa => tarefa.id != Number(card.dataset.id));
  localStorage.setItem('dado', JSON.stringify(dados));
  location.reload();
}





















