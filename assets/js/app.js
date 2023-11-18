const tarefas = document.querySelector('.row');
const liTarefas = document.querySelector('.col');
const addTarefas = document.querySelector('.input-nova-tarefa');
const buttonAdd = document.querySelector('.submit');
const buttonRemov = document.querySelector('remove');

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
  adicionaTexto(text);
  criarButtons(li)
  return text;
}


function adicionaTexto(text) {
  console.log(addTarefas.value)
  text.innerHTML += `<p>${addTarefas.value}</p>`
}


function criarButtons(li) {
  let buttons = document.createElement('div');
  li.appendChild(buttons)
  buttons.classList.add('buttons');
  for (let i = 0; i < 2; i++) {
    let button = document.createElement('button');
    buttons.appendChild(button);
    let span = spanAdd(button);
    if (i == 0) {
      classButtonRemove(button);
      buttonRemove(span);
      span.id = 'remove';
    }
    if (i == 1) {
      classButtonAlter(button);
      buttonAlter(span);
      
    }

  }
}
function addIdRemov(span){
  
}
function addIdAlter(span){
  span.id = 'alter';
}
function classButtonAlter(button){
  button.classList.add('alter');
}

function classButtonRemove(button){
  button.classList.add('remove');
}

function buttonRemove(button) {
  button.textContent = 'delete';
}

function buttonAlter(button) {
  button.textContent = 'done';
}

function spanAdd(button) {
  let span = document.createElement('span');
  button.appendChild(span);
  span.classList.add('material-symbols-outlined');
  return span;
}

addTarefas.addEventListener('keypress', function(e){
  if(e.keyCode===13){
    if (!addTarefas) return;
      addCard();
      limpaInput(addTarefas);
  }
});

buttonAdd.addEventListener('click', function (e) {
  if (!addTarefas) return;
  addCard();
  limpaInput(addTarefas);
});


//Botões de remover e concluir. Quando clicar em remove remover e quando clicar em concluir trocar a cor ou colocar riscado.

document.addEventListener('click', function (e) {
  const remove = e.target;
  if (remove.classList.contains('material-symbols-outlined')) {
    if (remove.id === 'remove') {
      let listItem = remove.closest('li');
      listItem.remove();
    }
  }
});

document.addEventListener('click', function (e) {
  const remove = e.target;
  if (remove.classList.contains('material-symbols-outlined')) {
    if (remove.id === 'alter') {
      let listItem = remove.closest('li');
      listItem.style.backgroundColor = 'red';
    }
  }
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





















