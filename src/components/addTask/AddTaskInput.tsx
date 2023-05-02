import {CloseOutlined} from '@ant-design/icons';
import React, {useEffect} from 'react';
import './addTaskInput.sass';
import {useForm } from 'react-hook-form';

type AddTaskInputType = {
    addTask: (newTaskText: string) => void,
    isVisibleAddTaskPopup: boolean,
    setAddTaskPopupIsVisible: (isVisible: boolean) => void,
}

type AddTaskFormDataType = {
    newTaskText: string,
}

const AddTaskInput: React.FC<AddTaskInputType> = ({addTask, isVisibleAddTaskPopup, setAddTaskPopupIsVisible} ) => {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setFocus
    } = useForm({
        mode: 'onSubmit'
    });
    const onSubmit = handleSubmit((data: AddTaskFormDataType) => {
        if (data.newTaskText !== ''){
            addTask(data.newTaskText);
            reset();
            closeAddTaskPopup();
        }
    });
    const getAddTaskPopup = () => {
        setAddTaskPopupIsVisible(true);
    };
    const closeAddTaskPopup = () => {
        setAddTaskPopupIsVisible(false);
    };

    useEffect(() => {
        if (isVisibleAddTaskPopup){
            setFocus('newTaskText');
        }
    }, [isVisibleAddTaskPopup]);
    return(
        <>
            {
                isVisibleAddTaskPopup? (
                    <>
                        <div className="backdrop"></div>
                        <div className="addTaskPopup">
                            <h3>Добавить задачу</h3>
                            <form className="addTaskPopupForm" onSubmit={ handleSubmit(onSubmit) }>
                                <div className="fieldInputWrap">
                                    <textarea
                                        rows="4"
                                        cols="40"
                                        className="fieldInput addTaskPopupForm__input"
                                        placeholder="Текст новой задачи"
                                        {...register('newTaskText', {
                                            required: true,
                                            maxLength: 30
                                        })
                                        }
                                    ></textarea>
                                    {errors.newTaskText && errors.newTaskText.type === 'required' && <span className="formAttention">Поле обязательно для заполнения</span> }
                                    {errors.newTaskText && errors.newTaskText.type === 'maxLength' && <span className="formAttention">Максимальная длина поля 30 символов</span> }
                                </div>
                                <div>
                                    <button className="btn addTaskPopupForm__submitBtn" type="submit">Добавить</button>
                                    <CloseOutlined
                                        className="addTaskPopupForm__closeBtn"
                                        onClick={closeAddTaskPopup}
                                    />
                                </div>
                            </form>
                        </div>
                    </>
                )
                    :
                    <button className="btn addTaskBtn" onClick={getAddTaskPopup}>Добавить задачу</button>
            }
        </>
    );
};

export default AddTaskInput;