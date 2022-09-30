import Footer from './components/Footer'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Modal from './components/Modal'

import styles from './App.module.css'
import './App.css'

import { ITask } from './interface/Task';
import { useState } from 'react';


function App() {

  const [taskList, setTasklist] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTasklist(taskList.filter((task) => {
      return task.id !== id;
    }))
  };

  const hideOrShowModal = (dispaly: boolean) => {
    const modal = document.querySelector("#modal")
    if (dispaly) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true)
    setTaskToUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = {id, title, difficulty}
    const updateItems = taskList.map((task)=> {
      return task.id === updateTask.id ? updateTask : task
    })
    setTasklist(updateItems)

    hideOrShowModal(false)
  }

  return (
    <div className="App">
      <Modal children={<TaskForm btnText='Editar Tarefa' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header/>
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm btnText='Criar Tarefa' taskList={taskList} setTaskList={setTasklist}/>         
        </div>
        <div>
          <h2>Suas Tarefas:</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default App
