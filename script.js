
let tasks = JSON.parse(localStorage.getItem('tasks')||'[]');

function save(){
 localStorage.setItem('tasks',JSON.stringify(tasks));
 renderTasks();
}

function addTask(){
 const title = prompt('Task name:');
 if(!title) return;
 const deadline = prompt('Deadline (YYYY-MM-DD):') || '';
 tasks.push({title,status:'In Progress',deadline});
 save();
}

function renderTasks(){
 const filter=document.getElementById('filter').value;
 const search=(document.getElementById('search').value||'').toLowerCase();

 const list=document.getElementById('taskList');
 list.innerHTML='';

 let filtered=tasks.filter(t=>
   (filter==='all'||t.status===filter) &&
   t.title.toLowerCase().includes(search)
 );

 filtered.forEach((t,i)=>{
   const div=document.createElement('div');
   div.className='task';
   div.innerHTML=`<strong>${t.title}</strong><br>
   Deadline: ${t.deadline}<br>
   Status: ${t.status}<br>
   <button onclick="toggleTask(${i})">Toggle Status</button>`;
   list.appendChild(div);
 });

 document.getElementById('total').innerText=tasks.length;
 document.getElementById('progress').innerText=tasks.filter(t=>t.status==='In Progress').length;
 document.getElementById('done').innerText=tasks.filter(t=>t.status==='Completed').length;
}

function toggleTask(i){
 tasks[i].status=tasks[i].status==='Completed'?'In Progress':'Completed';
 save();
}

document.getElementById('search').addEventListener('input',renderTasks);
renderTasks();
