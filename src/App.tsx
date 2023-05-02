import {observer} from 'mobx-react';
import React, {useEffect} from 'react';

import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';

import Login from './components/login/loginPage.tsx';

import TodoList from './components/todoListMain/TodoList.tsx';
import store, {InitialStateType} from './mobx/store.tsx';

const App: React.FC<InitialStateType> = () => {
    const isAuth = store.isAuth;
    const logIn = (formData) => {
        store.logIn(formData);
    };
    const addTask = (newTaskText) => {
        store.addTask(newTaskText);
    };
    useEffect(() => {
        store.init();
    }, []);

    useEffect(() => {
        if (isAuth){
            store.getAllTask();
        }
    }, [isAuth]);

    return (
        <BrowserRouter>
            <div className="App">
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            <Login
                                logIn={logIn}
                                isAuth={isAuth}
                            />
                        }
                        />
                        <Route path="/login" element={<Login
                            logIn={logIn}
                            isAuth={isAuth}
                        />}
                        />
                        <Route path="/main" element={<TodoList
                            addTask={addTask}
                        />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default observer(App);
