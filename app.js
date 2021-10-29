var Priority;
(function (Priority) {
    Priority["Low"] = "Low";
    Priority["Medium"] = "Medium";
    Priority["High"] = "High";
})(Priority || (Priority = {}));
var TodoInput = /** @class */ (function () {
    function TodoInput() {
        this.form_el = document.querySelector("form");
        this.title_el = document.getElementById("title");
        this.description_el = document.getElementById("description");
        this.start_el = document.getElementById("start");
        this.due_el = document.getElementById("due");
        this.priority_el = document.getElementById("priority");
        this.configure();
    }
    TodoInput.prototype.configure = function () {
        this.form_el.addEventListener("submit", this.submitHandler.bind(this));
    };
    TodoInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var title = this.title_el.value;
        var description = this.description_el.value;
        var start = this.start_el.value;
        var due = this.due_el.value;
        var priority = this.priority_el.value;
        var todo_container = document.getElementById("todo-list");
        var todo_el = document.createElement("div");
        todo_el.setAttribute("class", "todo");
        todo_container.appendChild(todo_el);
        var title_input_el = document.createElement('input');
        title_input_el.classList.add('form-control');
        title_input_el.type = 'text';
        title_input_el.value = title;
        title_input_el.setAttribute('readonly', 'readonly');
        var description_input_el = document.createElement('textarea');
        description_input_el.classList.add('form-control');
        description_input_el.setAttribute("id", "description");
        description_input_el.value = description;
        description_input_el.setAttribute('readonly', 'readonly');
        var start_input_el = document.createElement('input');
        start_input_el.classList.add('form-control');
        start_input_el.type = 'text';
        start_input_el.value = start;
        start_input_el.setAttribute('readonly', 'readonly');
        var due_input_el = document.createElement('input');
        due_input_el.classList.add('form-control');
        due_input_el.type = 'text';
        due_input_el.value = due;
        due_input_el.setAttribute('readonly', 'readonly');
        var start_label = document.createElement("label");
        start_label.innerText = "Start: ";
        var due_label = document.createElement("label");
        due_label.innerText = "Due: ";
        var priority_indicator = document.createElement("i");
        priority_indicator.setAttribute("class", "fas fa-circle");
        if (priority == Priority.Low) {
            priority_indicator.style.color = "green";
        }
        else if (priority == Priority.Medium) {
            priority_indicator.style.color = "orange";
        }
        else {
            priority_indicator.style.color = "red";
        }
        todo_el.appendChild(title_input_el);
        todo_el.appendChild(description_input_el);
        todo_el.appendChild(start_label);
        todo_el.appendChild(start_input_el);
        todo_el.appendChild(due_label);
        todo_el.appendChild(due_input_el);
        todo_el.appendChild(priority_indicator);
        var task_actions_el = document.createElement('div');
        task_actions_el.classList.add("actions");
        var task_edit_el = document.createElement('button');
        task_edit_el.setAttribute("class", "btn btn-dark");
        task_edit_el.innerText = 'Edit';
        var task_delete_el = document.createElement('button');
        task_delete_el.setAttribute("class", "btn btn-dark");
        task_delete_el.innerText = 'Delete';
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        todo_el.appendChild(task_actions_el);
        // Editing items
        task_edit_el.addEventListener('click', function (event) {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                title_input_el.removeAttribute("readonly");
                description_input_el.removeAttribute("readonly");
                due_input_el.removeAttribute("readonly");
                title_input_el.focus();
                description_input_el.focus();
                due_input_el.focus();
            }
            else {
                task_edit_el.innerText = "Edit";
                title_input_el.setAttribute("readonly", "readonly");
                description_input_el.setAttribute("readonly", "readonly");
                due_input_el.setAttribute("readonly", "readonly");
            }
        });
        // deleting items from statuses
        task_delete_el.addEventListener('click', function (event) {
            todo_el.remove();
        });
        // clear form
        this.form_el.reset();
        todo_el.setAttribute("draggable", "true");
        var empties = document.querySelectorAll('.empty');
        // fill listeners
        todo_el.addEventListener('dragstart', dragStart);
        todo_el.addEventListener('dragend', dragEnd);
        var draggableTodo = null;
        for (var _i = 0, empties_1 = empties; _i < empties_1.length; _i++) {
            var empty = empties_1[_i];
            empty.addEventListener('dragover', dragOver);
            empty.addEventListener('dragenter', dragEnter);
            empty.addEventListener('dragleave', dragLeave);
            empty.addEventListener('drop', dragDrop);
        }
        // Drag Functions
        function dragStart() {
            draggableTodo = this;
        }
        function dragEnd() {
            draggableTodo = null;
        }
        function dragOver(event) {
            event.preventDefault();
        }
        function dragEnter(event) {
            event.preventDefault();
        }
        function dragLeave() {
        }
        function dragDrop() {
            this.appendChild(draggableTodo);
        }
    };
    return TodoInput;
}());
var todoInput = new TodoInput();
