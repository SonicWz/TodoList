import {makeAutoObservable} from 'mobx';

import {authAPI} from '../api/authAPI.tsx';
import {todoAPI} from '../api/todoAPI.tsx';
import {getAllTodoTasksType} from '../api/todoAPI.tsx';

export type InitialStateType = {
    id: number,
    login: string,
    isAuth: boolean,
    isVisibleAddTaskPopup: boolean,
}
export type UserType = {
    'login': string,
    'password': string,
    'isAuth': boolean
}

export type TaskType = {
    'id': number,
    'done': boolean,
    'text': string
}

class Store {
    constructor() {
        makeAutoObservable(this);
    }
    tasks = [

    ];
    isAuth = false;
    login = '';
    isVisibleAddTaskPopup = false;
    setTask(tasks: Array<TaskType>){
        this.tasks = tasks;
    }
    async init(){
        const response  = await authAPI.getIsAuth();
        this.isAuth = response.data.isAuth;

    }
    setIsAuth(user: UserType, isAuth: boolean){
        this.login = user.login;
        this.isAuth = isAuth;
    }
    setIsVisibleAddTaskPopup(isVisible: boolean){
        this.isVisibleAddTaskPopup = isVisible;
    }
    get undoneTasks(){
        return this.tasks.filter(task => !task.done);
    }
    get doneTasks(){
        return this.tasks.filter(task => task.done);
    }

    async logIn(user: UserType){
        const logInPayload = {
            'login': user.login,
            'password': user.password,
            'isAuth': true
        };
        const response = await authAPI.logIn(logInPayload);
        if (response.status === 201 ){
            this.setIsAuth(response.data, true);
        }
    }
    async logOut (){
        const logOutPayload = {
            'login': this.login,
            'password': '',
            'isAuth': false
        };
        const response = await authAPI.logOut(logOutPayload);
        if (response.status === 201){
            this.setIsAuth(response.data, false);
        }
    }
    async getAllTask(params?: getAllTodoTasksType){
        const updatedTasks = await todoAPI.getAllTodoTasks(params);
        this.setTask(updatedTasks);
    }
    async addTask(newTaskText: string) {
        const newTask = {
            'id': Date.now(),
            'text': newTaskText,
            'done': false
        };
        const updatedTasks = await todoAPI.addNewTask(newTask);
        if (updatedTasks){
            this.getAllTask();
            this.setIsVisibleAddTaskPopup(false);
        }

    }
    async setTaskIsDone(id: number, isDone: boolean){
        const index = this.tasks.map((task) => task.id).indexOf(id);
        const updatedTasks = [...this.tasks];
        const updatedTask = {
            'id': id,
            'done': isDone,
            'text': updatedTasks[index].text
        };

        const response = await todoAPI.updateTask(id, updatedTask);
        if (response.status === 200) {
            updatedTasks[index].done = isDone;
            this.setTask(updatedTasks);
        }
    }

    async deleteTask(id: number) {
        await todoAPI.deleteTask(id);
        this.getAllTask();
    }
}

export default new Store();