(function () {
  const input = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('todoList');
  const empty = document.getElementById('empty');
  const countEl = document.getElementById('count');
  const clearCompletedBtn = document.getElementById('clearCompleted');
  const clearAllBtn = document.getElementById('clearAll');

  let tasks = JSON.parse(localStorage.getItem('todo_tasks') || '[]');

  function save() {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }

  function render() {
    list.innerHTML = '';
    empty.style.display = tasks.length ? 'none' : 'block';
    tasks.forEach((t, idx) => {
      const li = document.createElement('li');
      li.className = 'task';
      li.dataset.index = idx;

      const title = document.createElement('div');
      title.className = 'title' + (t.done ? ' completed' : '');
      title.textContent = t.text;

      const chk = document.createElement('input');
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

  function addTask(text) {
    const trimmed = String(text || '').trim();
    if (!trimmed) return;
    tasks.push({ text: trimmed, done: false, created: Date.now() });
    save();
    render();
  }

  addBtn.addEventListener('click', () => {
    addTask(input.value);
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask(input.value);
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
})();