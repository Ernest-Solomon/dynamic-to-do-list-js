// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create <li> element
        const listItem = document.createElement('li');

        // Create a text node for the task text
        const textNode = document.createTextNode(taskText);
        listItem.appendChild(textNode);

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // ✅ use classList.add()

        // Add event to remove the task when clicked
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);
        });

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Clear the input field
        taskInput.value = '';
    }

    // Add click event listener to the Add Task button
    addButton.addEventListener('click', addTask);

    // Add keypress event listener for the Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    loadTasks();

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // don't save again while loading
    }

    // Function to save tasks array to localStorage
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get the current task array from localStorage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Skip if taskText is empty
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the list item
        const listItem = document.createElement('li');

        // Create text node and append to list item
        const textNode = document.createTextNode(taskText);
        listItem.appendChild(textNode);

        // Create the remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Add click event to remove task from DOM and localStorage
        removeButton.addEventListener('click', function () {
            taskList.removeChild(listItem);

            // Remove task from localStorage
            let tasks = getStoredTasks();
            tasks = tasks.filter(task => task !== taskText); // remove only exact match
            saveTasksToLocalStorage(tasks);
        });

        // Append button and list item
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Save to localStorage if applicable
        if (save) {
            const tasks = getStoredTasks();
            tasks.push(taskText);
            saveTasksToLocalStorage(tasks);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Event: Add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText, true);
    });

    // Event: Add task on pressing Enter key
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();Add commentMore actions
            addTask(taskText, true);
        }
    });
});
