import React, {useEffect, useState} from 'react';
import addSvg from "../../assets/img/add.svg";
import closeSvg from '../../assets/img/close.svg'
import List from "../List/List";

import './AddList.scss'
import Badge from "../Badge/Badge";

import axios from "axios";

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');


    const addList = () => {
        if (!inputValue) {
            alert('Enter list name');
            return
        }
        axios.post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor,
        }).then(
            ({data}) => {
                const listColor = colors.filter(color => color.id === selectedColor)[0];
                const listObj = {...data, color: listColor, tasks: []}
                onAdd(listObj);
                onClose();
            })

    }
    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors]);

    const onClose = () => {
        setInputValue('');
        setVisiblePopup(false);
        selectColor(colors[0].id)
    };
    return (
        <div className="add-list">
            <List onClick={() => setVisiblePopup(true)}
                  items={[
                      {
                          icon: <img src={addSvg} alt="add list icon"/>,
                          name: 'Add new list'
                      }
                  ]}
            />


            {visiblePopup && <div className="add-list__popup">
                <button onClick={onClose} className="close"><img src={closeSvg} alt="add list icon"/></button>

                <input
                    value={inputValue}
                    type="text"
                    className="list-category-field"
                    placeholder="Add list category"
                    onChange={e => setInputValue(e.target.value)}
                />

                <div className="add-list__popup-colors">
                    <ul>
                        {
                            colors.map((color) => (
                                <li key={color.id}>
                                    <Badge
                                        onClick={() => {
                                            selectColor(color.id)
                                        }}
                                        key={color.id}
                                        color={color.hex}
                                        className={selectedColor === color.id && 'active'}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <button
                    className="button-accept"
                    onClick={addList}
                >Add

                </button>
            </div>}

        </div>
    );
};

export default AddList;