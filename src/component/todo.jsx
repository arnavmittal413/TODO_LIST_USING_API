import React, { useEffect, useState } from "react";
import "./todo.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
function todo() {
  // const [todos, setTodos] = useState("");
  // const [todosList, setTodoList] = useState([]);
  // const todoChangeHandler = (event) => {
  //   setTodos(event.target.value);
  // };
  // const todosHandler = () => {
  //   if (todos !== "") {
  //     const todo = {
  //       id: Date.now(),
  //       text: todos,
  //       complete: false,
  //     };
  //     setTodoList([...todosList, todo]);
  //   }
  // };
  // const inputTogglerHandler = (id) => {
  //   const updatedTodoList = todosList.map((todo) => {
  //     if (todo.id == id) {
  //       return { ...todo, complete: !todo.complete };
  //     }
  //     return todo;
  //   });
  //   setTodoList(updatedTodoList);
  // };
  // const handleRemoveTodo = (id) => {
  //   const filteredTodos = todosList.filter((todo) => todo.id !== id);
  //   setTodoList(filteredTodos);
  // };
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  useEffect(() => {
    const todoCollection = collection(db, "todos");
    onSnapshot(todoCollection, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(newData);
    });
  }, []);

  const todoChangeHandler = (event) => {
    setInputValue(event.target.value);
  };
  const todosHandler = async () => {
    if (inputValue !== "") {
      await addDoc(collection(db, "todos"), {
        text: inputValue,
        completed: false,
      });
      setInputValue("");
    }
  };
  const inputTogglerHandler = async (id) => {
    const todoRef = doc(db, "todos", id);
    const todo = todos.find((todo) => todo.id == id);
    await updateDoc(todoRef, { ...todo, completed: !todo.completed });
  };
  const handleRemoveTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  };

  const handleEditTodo=async(id,text)=>{
    if(editing===id && editingText){
      const todoRef=doc(db,"todos",id)
      await updateDoc(todoRef,{text:editingText})
      setEditing(null)
      setEditingText("")
    }else{
      setEditing(id)
      setEditingText(text)
    }
  }
  return (
    <div className="todo-container">
      <h1>TODO LIST</h1>
      <div className="todo-input">
        <input type="text" value={inputValue} onChange={todoChangeHandler} />
        <button onClick={todosHandler}>ADD</button>
      </div>

      <ul className="todo-list">
        {todos.map((toDo) => {
          return (
            <li key={toDo.id} className="todo-item">
              <input
                type="checkbox"
                onChange={() => inputTogglerHandler(toDo.id)}
              />
              {editing === toDo.id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => {
                    setEditingText(e.target.value);
                  }}
                />
              ) : (
                <span
                  className={`todo-text ${
                    toDo.completed == true ? "completed" : ""
                  }`}
                >
                  {toDo.text}
                </span>
              )}
              <button
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  backgroundColor: editing == toDo.id ? "green" : "blue",
                }}
              onClick={()=>handleEditTodo(toDo.id,toDo.text)}
              >
                {editing===toDo.id?"Save":"Edit"}
              </button>

              <button onClick={() => handleRemoveTodo(toDo.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default todo;
