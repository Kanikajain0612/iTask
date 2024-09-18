import React from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    setTodos(todos);
  }, [])
  
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  }
  
  const handleEdit = (e) => {
    let id = e.target.name;
    let t = todos.filter(item => {return item.id==id})
    let newTodos = todos.filter(item => {
      return item.id != id;
    });
    setTodos(newTodos);
    setTodo(t[0].todo); 
    saveToLS();
  }

  const handleDelete = (e) => {
    if(confirm("Are you sure you want to delete?")){
      let id = e.target.name;
      let newTodos = todos.filter(item => {
        return item.id != id;
      });
      setTodos(newTodos);
      saveToLS();
    }
  }

  const handleAdd = () => {
      setTodos([...todos, {id:uuidv4(), todo, isCompleted:false}])
      setTodo("");
      saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
      let id = e.target.name
      let index = todos.findIndex(item => {
        return item.id === id;
      })
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted
      setTodos(newTodos);
      saveToLS();
  }

  const saveToLS = () => {
    console.log(todos)
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <>
      <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-300 w-2/5 text-center min-h-[70vh]">
          <div className="addTodo">
          <h1 className="font-bold text-2xl">Add New Task</h1>
          <div className="add flex my-3">
            <input onChange={handleChange} value={todo} type="text" className="w-full px-2 m-1"/>
            <button onClick={handleAdd} disabled={todo.length<=3} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 text-white px-4 py-1 rounded-lg m-1">Add</button>  
          </div>
        </div>
        <br/>
        <input className="text-left" onChange={toggleFinished} type="checkbox" checked={showFinished}/> showFinished
        <hr /> 
        <h1 className="font-bold text-2xl my-4">Your Tasks</h1>
        {todos.length>=1?
          todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.todo} className="todo flex justify-between">  
              <div className="flex gap-3">
                <input onChange={handleCheckbox} type="checkbox" name={item.id} />
                <div className={(item.isCompleted)?"line-through text-left":"text-left"}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={handleEdit} name={item.id} className="bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg m-1"><FaEdit/></button>
                <button onClick={handleDelete} name={item.id} className="bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg m-1"><MdDelete/></button>
              </div>
              </div>}):<img src="../public/notodos.jpg"/>
          }
      </div>
    </>
  )
}

export default App
