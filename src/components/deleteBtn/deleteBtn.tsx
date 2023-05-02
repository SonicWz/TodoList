import {CloseOutlined} from '@ant-design/icons';
import React from 'react';
import './deleteBtn.sass';

import {TaskType} from '../../mobx/store';

type DeleteBtnType = {
    task: TaskType,
    deleteTask: () => void,
}

const DeleteBtn: React.FC<DeleteBtnType> = ( {task, deleteTask} ) => {
    return(
        <>
            <span className="control control_delete" onClick={deleteTask}><CloseOutlined /></span>
        </>
    );
};

export default DeleteBtn;