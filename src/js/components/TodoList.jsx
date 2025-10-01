import React, { useEffect, useState } from "react";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [username] = useState("Spidy");

  const Api_Url = "https://playground.4geeks.com/todo";

  const crearUser = async () => {
    try {
      await fetch(`${Api_Url}/users/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error en la creacion de usuarios", error);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`${Api_Url}/users/${username}`);
      if (response.status === 404) {
        await crearUser();
        setTodos([]);
        return;
      }
      const data = await response.json();
      setTodos(data.todos || []);
    } catch (error) {
      console.error("Error en la obtención de tareas", error);
      setTodos([]);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const postTodo = async () => {
    try {
      const resp = await fetch(`${Api_Url}/todos/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: inputValue, is_done: false }),
      });
      if (!resp.ok) throw new Error("Error en el post");
      getTodos();
    } catch (error) {
      console.error("Error en la creacion de usuarios", error);
    }
  };

  const deleteTodo = async (id) => {
   console.warn("Estás borrando este TODO => "+id)
   try {
    const resp = await fetch(Api_Url + "/todos/" + id,{
      method: 'DELETE'
    })
    if(!resp.ok) throw new Error("Fallo al borrar TODO")
    let aux = [...todos]
    aux = aux.filter(el=> el.id != id)
    setTodos(aux)
   } catch (error) {
    
   }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postTodo()
  };

  return (
    <>
      <h2 className="text-primary">ToDo List</h2>
      <form  onSubmit={handleSubmit}>
        <input
          className="border border-dark "
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type="submit" />
      </form>
      <ul>
        {todos.length == 0 ? "No hay todos" : todos.map(el => <li key={el.id}>
          {el.label} <span className="fa-solid fa-trash" onClick={() => deleteTodo(el.id)}></span>
        </li>)}
      </ul>
    </>
  );
};
export default TodoList