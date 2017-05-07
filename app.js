var todoList = { // The actual todo list object.
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get number of completed todos.
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos){
        todo.completed = false;
      }
      else {
        todo.completed = true;
      }
    });
  }
};

var handlers = { // An object that handles user input and acts accordingly
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = { // An object that handles the todo list display
  displayTodos: function() {
    var todosUl = document.querySelector('ul'); //sets variable to be the only ul element on page
    todosUl.innerHTML = '';  //resets that ul element to be blank -- wipes li elements

//     for (var i = 0; i < todoList.todos.length; i++) { // For every item in todo list..
//       var todoLi = document.createElement('li'); // sets variable for creating li element
//       var todo = todoList.todos[i]; // sets variable for current todo list index
//       var todoTextWithCompletion = ''; // sets variable for completion toggle display

//       if (todo.completed === true) { // if item is completed
//         todoTextWithCompletion = '(x) ' + todo.todoText;
//       } else {
//         todoTextWithCompletion = '( ) ' + todo.todoText;
//       }

//       todoLi.id = i; // sets li element's id to its index number
//       todoLi.textContent = todoTextWithCompletion; // sets text content of li element
//       todoLi.appendChild(this.createDeleteButton()); // adds Delete button as child element of li
//       todosUl.appendChild(todoLi); // selects ul element and creates child li element with text content
//     }

    todoList.todos.forEach(function(todo, position) { // also passes in i as 2nd argument
      var todoLi = document.createElement('li'); // sets variable for creating li element

      var todoTextWithCompletion = ''; // sets variable for completion toggle display

      if (todo.completed === true) { // if item is completed
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.id = position; // sets li element's id to its index number
      todoLi.textContent = todoTextWithCompletion; // sets text content of li element
      todoLi.appendChild(this.createDeleteButton()); // adds Delete button as child element of li
      todosUl.appendChild(todoLi); // selects ul element and creates child li element with text content
    }, this); // ***** had to also pass 'this' in forEach so this.createDeleteButton worked. V11.3 and .4 explain

    /* Callback functions like the function passed in the forEach function are NOT part of the object so
    .this won't refer to the right place*/

    /*.."The first thing is that you are very accustomed to thinking that whenever you're inside
    of a method, like displayTodos, that this is equal to the view object, and that is true, however,
    when you are calling a function that is NOT a method, like a callback function for example,
    you cannot assume that to be the same thing. So this inside of the highlighted
    portion (function(todo, position ... (todoLi);}) is not by default going to be equal to the
    view object. However, you can make that behavior the same by passing a 2nd argument
    into forEach, and if you pass in this, like we're doing on line 108, this will be set
    the same this value inside of displayTodos. So then when you access this inside of the
    callback function like in line 106 it will actually be equal to the view object."*/

    /*"..Right here we are passing in a position. So callback functions are not just
    passing a single argument that is the element, each element in the array, it's also passed
    the position of that element and so we took advantage of that as well."*/


  },
  createDeleteButton: function() { // Will add a delete button to each list item
    var deleteButton = document.createElement('button'); // sets variable that creates a new button
    deleteButton.textContent = 'Delete'; // sets the button to read 'Delete'
    deleteButton.className = 'deleteButton'; // sets button to be class='deleteButton'
    return deleteButton; // returns the button
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event) {
      var elementClicked = event.target; // Get the element that was clicked on.
      if(elementClicked.className === 'deleteButton') { // Check if element clicked is a delete button
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
        //parseInt(elementClicked.parentNode.id) gets li elements ID (a string) AND converts it to a number
      }
    });
  }
};

view.setUpEventListeners();

/* added click event listener to entire ul instead of each li item. Seperate listeners
on each li item could cause memory problems. We are using something called "event delegation" */

/* DOM event delegation is a mechanism of responding to ui-events via a single common
parent rather than each child, through the magic of event "bubbling" (aka event propagation). */
