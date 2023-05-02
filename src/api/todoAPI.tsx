import TaskType from '../mobx/store';

import {instance} from './api.tsx';

export type getAllTodoTasksType = {
    params: string
}

export const todoAPI = {
    getAllTodoTasks(params: getAllTodoTasksType) {
        let path = '';
        if (params === undefined){
            path = 'tasks/';
        }
        if (params === 'done'){
            path = 'tasks?done=true';
        }
        if (params === 'undone'){
            path = 'tasks?done=false';
        }
        return instance.get<Array<TaskType>>(path).then((response) => {
            return response.data;
        });
    },
    updateTask(taskId: number, updatedTask: TaskType) {
        return instance.patch(`tasks/${taskId}`, updatedTask).then((response) => {
            return response;
        });
    },
    addNewTask(newTask: TaskType) {
        return instance.post('tasks', newTask).then((response) => {
            return response.data;
        });
    },
    deleteTask(taskId: number) {
        return instance.delete(`tasks/${taskId}`).then((response) => {
            return response.data;
        });
    }
};
