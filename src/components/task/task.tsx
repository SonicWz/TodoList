import React from "react";
import DoneBtn from "../doneBtn/doneBtn.tsx";
import DeleteBtn from "../deleteBtn/deleteBtn.tsx";
import './task.sass';
import {TaskType} from "../../mobx/store";

type TaskFCType = {
    task: TaskType,
    setTaskIsDone: Function,
    setTaskIsUndone: Function,
    deleteTask: Function,
    addTask: Function,
}

const Task: React.FC<TaskFCType> = ({task, setTaskIsDone, setTaskIsUndone, deleteTask, addTask, ...props}) => {
    let isDoneClass = 'task ' + (task.done?  ' task_done' : '');

    return(
        <div className={isDoneClass}>
            <div className="taskField">{task.text}</div>
            <DoneBtn
                task={task}
                setTaskIsDone={ setTaskIsDone }
                setTaskIsUndone={ setTaskIsUndone }
            />
            <DeleteBtn
                task={task}
                deleteTask={deleteTask}
            />
        </div>
    )
}

export default Task;