import React from 'react';
import './List.scss';

import removeSvg from '../../assets/img/remove.svg'

import Badge from "../Badge/Badge";

import axios from "axios";
const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {
    const removeList = (item) => {
        if (window.confirm('Do you really want to remove this item ?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(({data}) => {
                onRemove(item.id)
            })

        }
    }

    return (
        <ul onClick={onClick} className="todo_list">
            {

                items.map( (item, index) => (
                    <li key={index}

                        className={
                            item.active ? 'todo_list-item active'

                            : activeItem && activeItem.id === item.id ? 'todo_list-item active' : 'todo_list-item'
                        }

                        onClick={onClickItem ? () => onClickItem(item) : null}>

                        <i className="todo_list-item-icon">
                            {
                                item.icon ? item.icon : (<Badge color={item.color.hex}/>)
                             }
                        </i>
                        <span className="todo_list-item_text">{item.name}
                        {item.tasks && ` (${item.tasks.length})`}
                        </span>
                        {isRemovable && (
                            <img onClick={() => removeList(item)} className='todo_list-item_close-icon' src={removeSvg} alt="remove icon"/>
                        )}
                    </li>
                ))
            }

        </ul>
    );
};

export default List;