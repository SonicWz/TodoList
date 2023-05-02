import React from 'react';
import {useForm, SubmitHandler } from 'react-hook-form';
import {Navigate} from 'react-router-dom';
import './loginPage.sass';

type LoginFormProps = {
    onSubmit: (LoginFormDataType) => void
}
type LoginFormDataType = {
    login: string,
    password: string
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        mode: 'onSubmit'
    });
    const onSubmit: SubmitHandler<LoginFormDataType> = (data) => {
        props.onSubmit(data);
    };
    return (<>
        <div className="loginFormWrapper">
            <form onSubmit={ handleSubmit(onSubmit) }
                className="loginForm"
            >
                <h3 className="loginForm__title">Авторизация</h3>
                <div className="loginForm__fieldTitle">Имя пользователя:</div>
                <div className="fieldInputWrap">
                    <input
                        className="fieldInput loginForm__fieldInput"
                        type="text"
                        placeholder="Логин"
                        {...register('login', {
                            required: true,
                            maxLength: 15
                        })
                        }
                    />
                    {errors.login && errors.login.type === 'required' && <span className="formAttention">Поле обязательно для заполнения</span> }
                    {errors.login && errors.login.type === 'maxLength' && <span className="formAttention">Максимальная длина поля 15 символов</span> }
                </div>
                <div className="loginForm__fieldTitle">Пароль:</div>
                <div className="fieldInputWrap">
                    <input
                        className="fieldInput loginForm__fieldInput"
                        type="password"
                        placeholder="Пароль"
                        {...register('password', {
                            required: true,
                            maxLength: 15
                        })
                        }
                    />
                    {errors.password && errors.password.type === 'required' && <span className="formAttention">Поле обязательно для заполнения</span> }
                    {errors.password && errors.password.type === 'maxLength' && <span className="formAttention">Максимальная длина поля 15 символов</span> }
                </div>
                <button className="btn loginForm__submitBtn" type="submit">Войти</button>
            </form>
        </div>
    </>);
};

type LoginType = {
    isAuth: boolean,
    logIn: (LoginFormDataType) => void
}

const Login: React.FC<LoginType> = (props) => {
    if (props.isAuth){
        return <Navigate to="/main" />;
    }
    const onSubmit =(data) => {
        props.logIn(data);
    };
    return (<>
        <LoginForm
            onSubmit={onSubmit}

        />
    </>);
};

export default Login;