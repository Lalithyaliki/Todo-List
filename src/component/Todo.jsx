import React, { useEffect, useState } from 'react';
import '../styles/todo/todo.css';

function Todo() {

    const [input, setinput] = useState("");
    const [showedit, setedit] = useState(null);
    const [tasks, settasks] = useState(() =>
        JSON.parse(localStorage.getItem("tasks")) || []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const onsubmit = (e) => {
        e.preventDefault();

        const data = input;

        if (showedit !== null) {
            const updated = tasks.map((task, i) =>
                i === showedit ? { ...task, text: data } : task);

            settasks(updated);
            setedit(null);
        }

        else {
            if (!tasks.some(task => task.text === data)) {
                settasks((prev) => ([...prev, { text: data, completed: false }]))
            }

        }
        setinput("");

    }

    const togglechecked = (index) => {
        const newtasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        settasks(newtasks);
    }

    const edittask = (task, index) => {
        setinput(task.text);
        setedit(index);
    }

    const completedtasks = tasks.filter((a) => a.completed).length;
    const incompletedtasks = tasks.length - completedtasks;

    const remove = (selectedtask) => {
        settasks(tasks.filter((c) => c !== selectedtask))
    }

    return (

        <div className='container'>
            <div className='header'>
                <div className='nav'>
                    <h3>Todos</h3>
                </div>
            </div>

            <div className='todo-container'>
                <h2>Todo Application</h2>
                <div className='Add-task'>
                    <form onSubmit={onsubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                            placeholder='Add the task...' required />
                        <button type='submit' className='btn'>
                            {showedit !== null ? "Update Task" : "Add Task"}</button>
                    </form>
                </div>
            </div>

            <div className='taskcount'>
                <p>No of Tasks : {tasks.length} </p>
                <p>completed tasks : {completedtasks} </p>
                <p>incomplete tasks : {incompletedtasks}</p>
            </div>

            <div className='Tasks'>
                <h2>Tasks</h2>

                {tasks.length === 0 ? <p className='Notasks'> No tasks yet</p> :
                    <ul className='taskcontainer'>
                        {tasks.map((task, index) => (
                            <li className='task' key={index}>
                                <div className='check-box'>

                                    <input type='checkbox'
                                        checked={task.completed}
                                        onChange={() => togglechecked(index)}
                                        className='check' />

                                    <span style={{
                                        textDecoration: task.completed ? "line-through" : "none"
                                    }}>{task.text}</span>
                                </div>

                                <div className='btns'>
                                    <button className='delbtn' onClick={(e) => { e.stopPropagation(); remove(task) }} >
                                        <i className="bi bi-trash"></i>
                                        <span>Delete</span>
                                        </button>
                                    <button onClick={() => edittask(task, index)} className='editbtn'>
                                        <i className="bi bi-pencil-square"></i>
                                        <span>Edit</span>
                                    </button>
                                </div>

                            </li>
                        ))}
                    </ul>}
            </div>
        </div >

    )
}

export default Todo;