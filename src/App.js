import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from "react";
import { Card } from './Card';

function App() {
  // declaring states
  const [statusFilter, setStatusFilter] = useState("All")
  const [todoList, setTodoList] = useState([]);
  const [todoName, setTodoName] = useState();
  const [todoDesc, setTodoDesc] = useState();
  const [btnText, setBtnText] = useState('Add Todo')
  const [editTodoId, setEditTodoId] = useState(null)

//  function for adding or updating todos
  const handleAddUpdateTodo = (todoName, todoDesc) => {
    if (btnText === 'Add Todo') {
      let newTodoItem = {
        name: todoName,
        description: todoDesc,
        id: Date.now(),
        status: "Not Completed",
      }
      localStorage.setItem('allTodos', JSON.stringify([...todoList, newTodoItem]))
      setTodoList([...todoList, newTodoItem])


    } else if (btnText === 'Update Todo') {
      const updatedTodoArr = todoList.map((card) =>
        card.id === editTodoId ? { ...card, name: todoName, description: todoDesc } : card
      )
      setTodoList(updatedTodoArr)
      setBtnText('Add Todo')
      setEditTodoId('')
      localStorage.setItem('allTodos', JSON.stringify(updatedTodoArr))
    }
    setTodoDesc('')
    setTodoName('')

  }
  // to store data in local storage
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('allTodos'))
    if (savedTodo) {
      setTodoList(savedTodo);
    }
  }, [])

  // function for deleteing Todos
  const handleDeleteTodo = (id) => {
    let reduceTodo = todoList.filter((item) => item.id !== id);
    localStorage.setItem('allTodos', JSON.stringify([...reduceTodo]))
    setTodoList([...reduceTodo])
  }

  // function to handle status change
  const handleStatusChange = (stat, id) => {
    let updatedstatTodo = todoList.map((card) =>
      card.id === id ? { ...card, status: stat } : card
    )
    setTodoList(updatedstatTodo)
    localStorage.setItem('allTodos', JSON.stringify(updatedstatTodo))
  }

  // function for editing todo
  const handleEditTodo = (id, name, desc) => {
    setBtnText('Update Todo')
    setEditTodoId(id)
    setTodoName(name)
    setTodoDesc(desc)
  }
  //filtering todos based on status
  const filteredTodos = todoList.filter((card) => {
    if (statusFilter === 'All') {
      return card;
    }
    else {
      return card.status === statusFilter
    }
  })

  return (
    <div className="App">
      <h1 className="text-success mt-4 mb-4">My Todo</h1>
      <div className="container">
        <div className="row mt-4 g-2 d-flex justify-content-center">
          <div className=" col-md-6 col-lg-5 d-flex justify-content-center">
            <TextField label="Todo Name" color="success" size="small" fullWidth value={todoName} onChange={(e) => setTodoName(e.target.value)} />
          </div>

          <div className="col-md-6 col-lg-5 d-flex justify-content-center">
            <TextField label="Todo Description" color="success" size="small" fullWidth value={todoDesc} onChange={(e) => setTodoDesc(e.target.value)} />
          </div>
          <div className="col-md-6 col-lg-2 d-flex justify-content-center">
            <Button variant="contained" color={`${btnText === 'Add Todo' ? 'success' : 'primary'}`} onClick={() => handleAddUpdateTodo(todoName, todoDesc)}>
              {btnText}
            </Button></div>


        </div>
        <div className="row d-flex mt-5 justify-content-between">
          <div className='col-12 col-md-6 col-lg-5 d-flex'><h4 className='h4 m-0'>My Todos</h4></div>
          <div className='col-12 col-md-6 col-lg-5 d-flex justify-content-center'>
            <h4 className='h4 m-0 d-inline'><label htmlFor="dropDown">Status Filter : &nbsp;</label></h4>
            <div className="dropdown d-inline">
              <button class={`btn dropdown-toggle ${statusFilter === 'All' ? 'btn-primary' : statusFilter === 'Completed' ? 'btn-success' : 'btn-danger'} `} data-bs-toggle="dropdown" aria-expanded="false">
                {statusFilter}
              </button>

              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => setStatusFilter("All")}>All</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter("Completed")}>Completed</button></li>
                <li><button className="dropdown-item" onClick={() => setStatusFilter("Not Completed")}>Not Completed</button></li>
              </ul>
            </div>
          </div>
        </div>


        <div className="d-flex flex-wrap mt-5 justify-content-center">
          {filteredTodos.map((data, index) => {
            return (
              <Card key={index} data={data} handleDeleteTodo={handleDeleteTodo} handleStatusChange={handleStatusChange}
                handleEditTodo={handleEditTodo} />

            )
          })}

        </div>
      </div>
    </div>

  );
}

export default App;
