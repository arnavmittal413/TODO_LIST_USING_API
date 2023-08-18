import React, { useState } from "react";
import "./todo.css";
function todo() {
  const [todos, setTodos] = useState("");
  const [todosList, setTodoList] = useState([]);
  const todoChangeHandler = (event) => {
    setTodos(event.target.value);
  };
  const todosHandler = () => {
    if (todos !== "") {
      const todo = {
        id: Date.now(),
        text: todos,
        complete: false,
      };
      setTodoList([...todosList, todo]);
    }
  };
  const inputTogglerHandler = (id) => {
    const updatedTodoList = todosList.map((todo) => {
      if (todo.id == id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };
  const handleRemoveTodo = (id) => {
    const filteredTodos = todosList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodos);
  };
  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <div className="todo-input">
        <input type="text" value={todos} onChange={todoChangeHandler} />
        <button onClick={todosHandler}>ADD</button>
      </div>

      <ul className="todo-list">
        {todosList.map((toDo) => {
          return (
            <li key={toDo.id} className="todo-item">
              <input
                type="checkbox"
                onChange={() => inputTogglerHandler(toDo.id)}
              />
              <span className={`todo-text ${toDo.complete==true?"completed":""}`}>{toDo.text}</span>
              <button onClick={() => handleRemoveTodo(toDo.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default todo;
