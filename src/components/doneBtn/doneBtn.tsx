import {CheckOutlined, RedoOutlined} from '@ant-design/icons';
import React from 'react';
import './doneBtn.sass';

import {TaskType} from '../../mobx/store';

type DoneBtnType = {
    task: TaskType,
    setTaskIsDone: () => void,
    setTaskIsUndone: () => void
}

const DoneBtn: React.FC<DoneBtnType> = ( {task, setTaskIsDone, setTaskIsUndone} ) => {
    return(
        <>
            {task.done? <span className="control control_done" onClick={setTaskIsUndone}><RedoOutlined /></span>
                :
                <span className="control control_done" onClick={setTaskIsDone}><CheckOutlined /></span>}
        </>
    );
};

export default DoneBtn;