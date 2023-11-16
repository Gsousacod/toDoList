const tarefas = document.querySelector('.row');
const addTarefas = document.querySelector('.input-nova-tarefa');
const buttonAdd = document.querySelector('.submit');

function criaLi(){
 const li = document.createElement('li');
 return li;
}
function addConfi(){
  let li = criaLi();
  li.classList.add('col');
  let text = li.document.createElement('div');
  text.classList.add('text');
  text = document.createTextNode(addTarefas.value);
}

buttonAdd.addEventListener('click', function(e){
  const li = document.createElement('li');
  tarefas.appendChild(li);
  li.classList.add('col');
});




















