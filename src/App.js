import { useEffect, useState } from "react";
import './App.css';
//Importing Components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {

  // state stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterTodos] = useState([]);

  // run once when the app start
  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status])

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilterTodos(todos.filter(todo => todo.completed === true))
        break
      case "uncompleted":
        setFilterTodos(todos.filter(todo => todo.completed === false))
        break
      default:
        setFilterTodos(todos)
    }
  }

  // save to local storage
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">

      <h1>Todo List</h1>

      <Form
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />

      <TodoList todos={todos} setTodos={setTodos} filterTodos={filterTodos} />

    </div>
  );
}

export default App;