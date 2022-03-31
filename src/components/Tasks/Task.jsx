import React from 'react';
import checkSvg from "../../assets/img/check.svg";
import removeSvg from "../../assets/img/remove.svg";
import editSvg from '../../assets/img/edit.svg';

const Task = ({id, task, text, list, completed, onRemove, onEdit, onComplete}) => {
    const onChangeCheckbox = e => {
        onComplete(list.id, task.id, e.target.checked);
    };

  return (
      <div className="tasks__items" key={task.id}>
        <div className="checkbox">
          <input onChange={onChangeCheckbox} id={`id-${task.id}`} type="checkbox" checked={completed}/>
          <label htmlFor={`id-${task.id}`}>
            <img src={checkSvg} alt="check"/>
          </label>
        </div>
      <p className="tasks__items-text">{task.text}</p>


          <div className="tasks__items-control">
              <img onClick={() => onEdit(list.id, { id, text })} src={editSvg} alt="edit"/>

              <img onClick={() => onRemove(list.id, task.id)} src={removeSvg} alt="Del"/>

          </div>

      </div>
  );
};

export default Task;
