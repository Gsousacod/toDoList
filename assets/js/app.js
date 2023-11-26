const tarefas = document.querySelector('.row');
const liTarefas = document.querySelector('.col');
const addTarefas = document.querySelector('.input-nova-tarefa');
const buttonAdd = document.querySelector('.submit');
const buttonRemov = document.querySelector('remove');
const dateAtual = document.querySelector('.date');

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function addCard(texto) {
  let li = criaLi();
  tarefas.appendChild(li);
  li.classList.add('col');
  getConfig(li,texto);
  return li;
}


function getConfig(li,texto) {
  let text = document.createElement('div');
  li.appendChild(text)
  text.classList.add('text');
  adicionaTexto(text,texto);
  addicionar(text)
  criarButtons(li)
  salavTarefas();
  return text;
}

function addDate(div){
  var dataHoraAtual = new Date();
  var dataHoraFormatada = `${dataHoraAtual.toLocaleDateString()}`;
  let data = document.createElement('span');
  div.appendChild(data)
  data.innerHTML= `${dataHoraFormatada}`;
}

function addicionar(text){
  let div = document.createElement('div')
  text.appendChild(div);
  div.classList.add('date')
  addDate(div)
}


function adicionaTexto(text,texto) {
  let tarefa = document.createElement('div');
  tarefa.classList.add('tarefa')
  text.appendChild(tarefa);
  tarefa.innerHTML += `<p>${texto}</p>`
}


function criarButtons(li) {
  let buttons = document.createElement('div');
  li.appendChild(buttons)
  buttons.classList.add('buttons');
  for (let i = 0; i < 3; i++) {
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
      span.id = 'alter';
    }
    if (i == 2) {
      classButtonRefresh(button);
      buttonRefresh(span);
      span.id = 'refresh';
    }

  }
}
function classButtonRefresh(button){
  button.classList.add('refresh');
}

function classButtonAlter(button){
  button.classList.add('alter');
}

function classButtonRemove(button){
  button.classList.add('remove');
}
function buttonRefresh(button) {
  button.textContent = 'refresh';
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

function limpaInput(addTarefas){
  addTarefas.value='';
}
function salavTarefas(){
  const liTarefas = document.querySelectorAll('.col');
  const listTarefas = [];

  for (let tarefa of liTarefas) {
    const textDiv = tarefa.querySelector('.text .tarefa p');
    const dateDiv = tarefa.querySelector('.date span');

    const textoTarefa = textDiv.innerText.trim();
    const dataTarefa = dateDiv.innerText.trim();

    listTarefas.push({ texto: textoTarefa, data: dataTarefa });
  }
  const tarefasJson = JSON.stringify(listTarefas);
  localStorage.setItem('tarefas',tarefasJson);
 
}

function adicionaTarefasSalvas() {
  const tarefasSalvas = localStorage.getItem('tarefas');
  if (tarefasSalvas) {
    const tarefasArray = JSON.parse(tarefasSalvas);
    for (let tarefa of tarefasArray) {
      addCard(tarefa.texto);
    }
  } else {
    console.log('Nenhuma tarefa salva.');
  }
}

adicionaTarefasSalvas();


addTarefas.addEventListener('keypress', function(e){
  if(e.keyCode===13){
    if (!addTarefas) return;
    addCard(addTarefas.value);
    limpaInput(addTarefas);
  }
});

buttonAdd.addEventListener('click', function (e) {
  if (!addTarefas) return;
  addCard(addTarefas.value);
  limpaInput(addTarefas);
});

document.addEventListener('change', function (e) {
  let html = document.documentElement; // Obtém o elemento html
  let darkLight = document.getElementById('dark-light');
  if (darkLight.checked === true) {
    html.classList.add('dark'); // Adiciona a classe 'dark' ao elemento html
} else {
    html.classList.remove('dark'); // Remove a classe 'dark' do elemento html
}
});


//Botões de remover e concluir. Quando clicar em remove remover e quando clicar em concluir trocar a cor ou colocar riscado.

document.addEventListener('click', function (e) {
  const remove = e.target;
  if (remove.classList.contains('material-symbols-outlined')) {
    if (remove.id === 'remove') {
      let listItem = remove.closest('li');
      listItem.remove();
      salavTarefas();
    }
  }
});

document.addEventListener('click', function (e) {
  const alter = e.target;
  if (alter.classList.contains('material-symbols-outlined')) {
    if (alter.id === 'alter') {
      let listItem = alter.closest('li');
      listItem.style.backgroundColor = 'red';
    }
  }
});

document.addEventListener('click', function (e) {
  const refresh = e.target;
  if (refresh.classList.contains('material-symbols-outlined')) {
    if (refresh.id === 'refresh') {
      let listItem = refresh.closest('li');
      listItem.style.backgroundColor = '#6BE36B';
    }
  }
});