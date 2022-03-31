import React, {useState} from 'react';
import addSvg from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        axios.post('http://localhost:3001/tasks', obj).then(({data})=>{

            onAddTask(list.id, data)
            toggleFormVisible()
        })
    }


    return (
        <div className="tasks_form">

            {!visibleForm
                ? <div onClick={toggleFormVisible} className="tasks_form-new">
                    <img src={addSvg} alt="Add new task"/> Add new task
                </div>
                : <div className="tasks_form-info-input">
                    <input
                        value={inputValue}
                        type="text"
                        className="new-task"
                        placeholder="Add new task"
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <div className="button-wrapper">
                        <button onClick={addTask}
                            className="button-accept"
                        >Add

                        </button>
                        <button onClick={toggleFormVisible}
                            className="button-accept button-accept-grey"
                        >Cancel

                        </button>
                    </div>
                </div>}


        </div>
    );
};

export default AddTaskForm;