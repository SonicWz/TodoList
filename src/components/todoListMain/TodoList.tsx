import {observer} from 'mobx-react';
import React, {useEffect} from 'react';

import {useNavigate } from 'react-router-dom';

import store from '../../mobx/store.tsx';
import AddTaskInput from '../addTask/AddTaskInput.tsx';
import Task from '../task/task.tsx';

import './todoList.sass';

type TodoListType = {}

const TodoList: React.FC<TodoListType> = (props) => {
    const tasks = store.tasks;
    const isAuth = store.isAuth;
    const isVisibleAddTaskPopup = store.isVisibleAddTaskPopup;

    const setTaskIsDone = (id, isDone) => {
        store.setTaskIsDone(id, isDone);
    };
    const deleteTask = (id) => {
        store.deleteTask(id);
    };
    const addTask = (newTaskText) => {
        store.addTask(newTaskText);
    };
    const setAddTaskPopupIsVisible = (payload) => {
        store.setIsVisibleAddTaskPopup(payload);
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth){
            store.getAllTask();
        }
        if (!isAuth){
            navigate('/login');
        }
    }, [isAuth]);

    const logOut = () => {
        store.logOut();
    };
    return (
        <>
            <div className="todoList">
                { isAuth?
                    <button className="btn todoList__logOutBtn" onClick={logOut}>Выйти</button>
                    :
                    null
                }
                <h1 className="todoList__title">Список задач</h1>
                <div className="todoList__filter filter">
                    <button className="btn filter__btn" onClick={ () => store.getAllTask() }>Все</button>
                    <button className="btn filter__btn" onClick={ () => store.getAllTask('done') }>Выполненные</button>
                    <button className="btn filter__btn" onClick={ () => store.getAllTask('undone') }>Невыполненные</button>
                </div>
                <AddTaskInput
                    addTask={ addTask }
                    isVisibleAddTaskPopup={isVisibleAddTaskPopup}
                    setAddTaskPopupIsVisible={setAddTaskPopupIsVisible}
                />
                <div className="tasksWrap">
                    {tasks.map( (task) => {
                        return <Task
                            task={task}
                            key={task.id}
                            setTaskIsDone={ () => setTaskIsDone(task.id, true)  }
                            setTaskIsUndone={ () => setTaskIsDone(task.id, false) }
                            deleteTask={ () => deleteTask(task.id) }
                        />;
                    })
                    }
                </div>
            </div>
        </>
    );
};

export default observer(TodoList);
