document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // ローカルストレージからタスクを読み込む
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            renderTask(task.text, task.completed);
        });
    }

    // ローカルストレージにタスクを保存する
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // タスクを画面に描画する
    function renderTask(text, completed) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        if (completed) {
            li.classList.add('completed');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.classList.add('delete-btn');

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // タスク追加ボタンのイベント
    addBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            renderTask(taskText, false);
            taskInput.value = '';
            saveTasks();
        }
    });

    // タスクリストのイベント（完了・削除）
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            e.target.parentNode.classList.toggle('completed');
            saveTasks();
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentNode.remove();
            saveTasks();
        }
    });

    // 初回ロード
    loadTasks();
});