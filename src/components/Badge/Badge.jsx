import React from 'react';
import './Badge.scss';

const Badge = ({color, onClick, className}) => {
    return (
        <i className="todo_list-item-icon">
            {
                <span onClick={onClick} style={{background: `${color}`}} className={`list-decor ${className}`}>

                </span>
            }
        </i>
    );
};

export default Badge;