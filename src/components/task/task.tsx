import React from 'react';

import {TaskType} from '../../mobx/store';
import DeleteBtn from '../deleteBtn/deleteBtn.tsx';
import DoneBtn from '../doneBtn/doneBtn.tsx';
import './task.sass';

type TaskFCType = {
    task: TaskType,
    setTaskIsDone: () => void,
    setTaskIsUndone: () => void,
    deleteTask: () => void
}

const Task: React.FC<TaskFCType> = ({task, setTaskIsDone, setTaskIsUndone, deleteTask, ...props}) => {
    const isDoneClass = 'task ' + (task.done?  ' task_done' : '');
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
    );
};

export default Task;