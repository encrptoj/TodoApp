import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import "./App.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [newTitle, setnewTitle] = useState("");
  const [newDescription, setnewDescription] = useState("");
  const [todo, settodo] = useState([]);
  const [completeTodo, setcompleteTodo] = useState([]);

  function handleAddTodo() {
    let newTodo = {
      title: newTitle,
      description: newDescription,
    };

    const tempAllTodo = [...todo];
    tempAllTodo.push(newTodo);
    settodo(tempAllTodo);

    localStorage.setItem("todosList", JSON.stringify(tempAllTodo));
  }

  const handleDelete = (todo,idx) => {
    const tempTodo = todo.filter((item, index) => {
      return index !== idx;
    });
    isCompleteScreen ? console.log("complete") : console.log("todoList");
    isCompleteScreen ? setcompleteTodo(tempTodo) : settodo(tempTodo);

    isCompleteScreen ? localStorage.setItem("completeList",JSON.stringify(tempTodo)) :
    localStorage.setItem("todosList", JSON.stringify(tempTodo));
    
  };

  useEffect(() => {
    let tempList = JSON.parse(localStorage.getItem("todosList"));
    if (tempList) {
      settodo(tempList);
    }
  }, []);

  const handleComplete = (todo,idx) => {
    let item = { ...todo[idx] };
    let tempAllTodo = [...completeTodo];
    tempAllTodo.push(item);
    setcompleteTodo(tempAllTodo);

    localStorage.setItem("completeList", JSON.stringify(tempAllTodo));
    handleDelete(todo,idx);
  };

  return (
    <div className="App">
      <h1> My Todos</h1>

      <div className="todoclass">
        <div className="todo-input">
          <div className="todoinput-item">
            <label>Tittle</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setnewTitle(e.target.value)}
              placeholder="Enter Title here"
            />
          </div>
          <div className="todoinput-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setnewDescription(e.target.value)}
              placeholder="Enter Description here"
            />
          </div>
          <div className="todoinput-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primarybtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondarybtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>

          <button
            className={`secondarybtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen
            ? completeTodo.map((task, i) => {
                console.log(task, i);
                return (
                  <div className="todo-list-item" key={i}>
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <MdDelete
                        className="icon"
                        onClick={() => handleDelete(completeTodo,i)}
                      />
                    </div>
                  </div>
                );
              })
            : todo.map((task, i) => {
                console.log(task, i);
                return (
                  <div className="todo-list-item" key={i}>
                    <div>
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <MdDelete
                        className="icon"
                        onClick={() => handleDelete(todo,i)}
                      />
                      <FaCheck
                        className="check-icon"
                        onClick={() => handleComplete(todo,i)}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default App;
