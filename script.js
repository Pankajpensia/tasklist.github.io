const taskInput = document.getElementById("taskInput");
    const submitBtn = document.getElementById("submitBtn");
    const todoBox = document.querySelector('.todoBox');

    // Load existing tasks from localStorage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    todoBox.innerHTML = savedTasks.map(task => createTodoItem(task)).join('');

    submitBtn.addEventListener('click', function() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      const taskItem = createTodoItem(taskText);
      todoBox.insertAdjacentHTML('beforeend', taskItem);
      
      // Save updated tasks to localStorage
      const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      currentTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(currentTasks));

      taskInput.value = '';
    });

    function createTodoItem(taskText) {
      return `<li>${taskText}<button onclick="delTodo(this)">X</button></li>`;
    }

    function delTodo(e) {
      const taskText = e.parentNode.firstChild.textContent;
      e.parentNode.remove();

      // Remove the task from localStorage
      const currentTasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTasks = currentTasks.filter(task => task !== taskText);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }