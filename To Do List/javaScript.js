document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('taskForm');

    const taskInput = document.getElementById('taskInput');

    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to add event listeners for edit, delete, and mark as done buttons
    const addEventListeners = () => {
    const editButtons = document.querySelectorAll('.edit-button');

    const deleteButtons = document.querySelectorAll('.delete-button');

    const toggleButtons = document.querySelectorAll('.toggle-button');

    editButtons.forEach((button, index) => {

        button.addEventListener('click', () => editTask(index));

    });

    deleteButtons.forEach((button, index) => {

        button.addEventListener('click', () => deleteTask(index));

    });

    toggleButtons.forEach((button, index) => {

        button.addEventListener('click', () => toggleCompleted(index));

        });
    };

    // Function to render tasks in the UI
    const renderTasks = () => {

        taskList.innerHTML = '';

        tasks.forEach((task, index) => {

        const listItem = document.createElement('li');

        listItem.innerHTML = `

            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>

            <button class="edit-button">Edit</button>

            <button class="delete-button">Delete</button>

            <button class="toggle-button">Mark ${task.completed ? 'Incomplete' : 'Complete'}</button>
        `;

        taskList.appendChild(listItem);

    });

      // Add event listeners after rendering

        addEventListeners();

    };

    // Function to add a new task

    const addTask = (text) => {

        tasks.push({ text, completed: false });

        saveTasks();

    };

      // Function to edit an existing task
    
    const editTask = (index) => {

        const newText = prompt('Edit task:', tasks[index].text);

        if (newText !== null) {

            tasks[index].text = newText;

            saveTasks();

        }

    };

      // Function to delete a task
    
    const deleteTask = (index) => {

        if (confirm('Are you sure you want to delete this task?')) {

            tasks.splice(index, 1);

            saveTasks();

        }

    };

      // Function to toggle the completed status of a task
    
        const toggleCompleted = (index) => {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

        };

      // Function to save tasks to local storage
    
        const saveTasks = () => {

            localStorage.setItem('tasks', JSON.stringify(tasks));

            renderTasks();

        };

    // Event listener for the task form submission
    taskForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const taskText = taskInput.value.trim();

        if (taskText !== '') {

            addTask(taskText);

            taskInput.value = '';

            addEventListeners(); 

        }
        
    });

    renderTasks();
});