interface Task {
  text: string;
  done: boolean;
  created: number;
}

const input = document.getElementById('taskInput') as HTMLInputElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const list = document.getElementById('todoList') as HTMLUListElement;
const empty = document.getElementById('empty') as HTMLDivElement;
const countEl = document.getElementById('count') as HTMLElement;
const clearCompletedBtn = document.getElementById('clearCompleted') as HTMLButtonElement;
const clearAllBtn = document.getElementById('clearAll') as HTMLButtonElement;

let tasks: Task[] = JSON.parse(localStorage.getItem('todo_tasks') || '[]');

function save(): void {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

function render(): void {
  list.innerHTML = '';
  empty.style.display = tasks.length ? 'none' : 'block';

  tasks.forEach((t: Task, idx: number) => {
    const li = document.createElement('li');
    li.className = 'task';
    li.dataset.index = String(idx);

    const title = document.createElement('div');
    title.className = 'title' + (t.done ? ' completed' : '');
    title.textContent = t.text;

    const chk = document.createElement('input') as HTMLInputElement;
    chk.type = 'checkbox';
    chk.checked = !!t.done;
    chk.addEventListener('change', () => {
      tasks[idx].done = chk.checked;
      save();
      render();
    });

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-ghost';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task', t.text);
      if (newText !== null) {
        tasks[idx].text = newText.trim();
        save();
        render();
      }
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-ghost';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
      tasks.splice(idx, 1);
      save();
      render();
    });

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.appendChild(editBtn);
    controls.appendChild(delBtn);

    li.appendChild(chk);
    li.appendChild(title);
    li.appendChild(controls);
    list.appendChild(li);
  });

  const remaining = tasks.filter(t => !t.done).length;
  countEl.textContent = String(remaining);
}

function addTask(text?: string): void {
  const trimmed = String(text || input.value || '').trim();
  if (!trimmed) return;
  tasks.push({ text: trimmed, done: false, created: Date.now() });
  save();
  render();
}

addBtn.addEventListener('click', () => {
  addTask();
  input.value = '';
  input.focus();
});

input.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    addTask();
    input.value = '';
  }
});

clearCompletedBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
});

clearAllBtn.addEventListener('click', () => {
  tasks = [];
  save();
  render();
});

render();