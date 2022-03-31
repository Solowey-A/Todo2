import React, {useEffect, useState} from "react";
import axios from "axios";
import listSvg from "./assets/img/list.svg";
import List from "./components/List/List";
import AddList from "./components/AddListButton/AddList";

import Tasks from "./components/Tasks/Tasks";

function App() {
    const [colors, setColors] = useState(null);
    const [lists, setLists] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
            .then(({ data }) => {
                setLists(data);
            });
        axios.get('http://localhost:3001/colors').then(({ data }) => {
            setColors(data);
        });
    }, []);

    const onAddList = (obj) => {
        const newList = [...lists, obj];
        setLists(newList);
    };

    const onAddTask = (listId, taskObj) => {
        // const newList = [...lists, taskObj];
        // setLists(newList);
        const newList = lists.map(item => {
            if (item.id === listId) {
                item.tasks = [...item.tasks, taskObj];
            }
            return item;
        })

        setLists(newList);
    };

    const onEditListTitle = (id, title) => {
        const newList = lists.map(item => {
            if (item.id === id) {
                item.name = title;
            }
            return item;
        })

        setLists(newList);
    }

    const onRemoveTask = (listId, taskId) => {
        if (window.confirm('Do you really want to remove this item ?')) {
            const newList = lists.map(item => {
                if (item.id === listId) {
                    item.tasks = item.tasks.filter(task => task.id !== taskId)
                }
                return item;
            })

            setLists(newList);
            axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
                alert('ERROR')
            })
        }
    }

    const onEditTask = (listId, taskObj) => {
        const newTaskText = window.prompt('Edit', taskObj.text);

        if (!newTaskText) {
            return;
        }

        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskObj.id) {
                        task.text = newTaskText;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskObj.id, {
                text: newTaskText
            })
            .catch(() => {
                alert('ERROR');
            });
    };

    const onCompleteTask = (listId, taskId, completed) => {
        const newList = lists.map(list => {
            if (list.id === listId) {
                list.tasks = list.tasks.map(task => {
                    if (task.id === taskId) {
                        task.completed = completed;
                    }
                    return task;
                });
            }
            return list;
        });
        setLists(newList);
        axios
            .patch('http://localhost:3001/tasks/' + taskId, {
                completed
            })
            .catch(() => {
                alert('ERROR');
            });
    };

    return (
        <div className="todo">

            <div className="todo_sidebar">
                <List
                    items={[
                        {
                            active: !activeItem,
                            icon: <img src={listSvg} alt="list icon"/>,
                            name: 'All tasks'
                        }
                    ]}
                    activeItem={activeItem}
                    onClickItem={() => {
                        setActiveItem(null);
                        let allLists = true;
                    }}
                />
                {lists ? (
                <List
                    items={lists}

                    onRemove={(id) => {
                        const newLists = lists.filter(item => item.id !== id)
                        setLists(newLists)
                    }}
                    onClickItem={item => {
                        setActiveItem(item);
                    }}
                    activeItem={activeItem}
                    isRemovable
                />
                ) : (
                    'Loading...'
                )}
                <AddList onAdd={onAddList} colors={colors}

                />

            </div>
            {
                lists && activeItem && <Tasks
                    onAddTask={onAddTask}
                    list={activeItem}
                    onEditTitle={onEditListTitle}
                    onRemoveTask={onRemoveTask}
                    onCompleteTask={onCompleteTask}
                    onEditTask={onEditTask}
                    withoutEmpty
                />
            }



        </div>
    );
}

export default App;
