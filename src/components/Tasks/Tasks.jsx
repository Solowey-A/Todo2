import React from 'react';
import axios from "axios";

import './Tasks.scss';

import editSvg from '../../assets/img/edit.svg';
import checkSvg from '../../assets/img/check.svg';
import removeSvg from '../../assets/img/remove.svg';
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Rename list header', list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle );
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Failed to update')
            })
        }
    }

    return (
        <div className="todo_tasks">
            <div className="tasks">
                <div className="tasks-headline">
                    <h2 className="todo_tasks_title">
                        {list.name}
                    </h2>
                    <img onClick={editTitle} src={editSvg} alt="edit button"/>
                </div>
            </div>

            {list.tasks && !list.tasks.length &&
                <h2>There are no tasks here yet</h2>
            }

                { list.tasks && list.tasks.map((task) => (
                    <Task key={task.id}
                          task={task} list={list}
                          onRemove={onRemoveTask}
                          onEdit={onEditTask}
                          onComplete={onCompleteTask}
                          {...task}
                    />
                ))}

            <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
        </div>
    );
};

export default Tasks;