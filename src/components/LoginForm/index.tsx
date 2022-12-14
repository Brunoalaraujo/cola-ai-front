import React from 'react';
import BtnCloseLink from "../BtnCloseLink";
import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import { signInUser } from '../../services/User';
import { getUser } from '../../store/users';
import { Dispatch } from "@reduxjs/toolkit";

import * as S from './style';
import logo from '../../assets/images/Group 9.svg';

export const LoginForm = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const response = await signInUser({ email, password });
            console.log(response)
            window.localStorage.setItem("token", response?.token);
            window.localStorage.setItem("nickname", response?.nickname)
            dispatch(getUser()); navigate("/posts")
            
        } catch (error) {
            console.log(error)
            alert("Opa! Deu algo errado!");
        }
    };

    return (
        <S.Container1>
            <img className='img-fluid' src={logo} />
            <S.Container>

                <S.LoginForm className='m-2' onSubmit={handleSubmit}>

                    <S.LoginFormGroup>
                        <h1>Login</h1>
                        <S.LoginFormInput
                            name='email'
                            id='email'
                            type='text'
                            placeholder='email'
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </S.LoginFormGroup>

                    <S.LoginFormGroup>
                        <S.LoginFormInput
                            name='password'
                            id='senha'
                            type='password'
                            placeholder='senha'
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    </S.LoginFormGroup>

                    <S.StyledButton size='sm' type='submit'>Confirmar</S.StyledButton>

                    <S.ButtonStyledTransparent size='sm' type='submit'><Link to={"/signup"} />Esqueci minha senha</S.ButtonStyledTransparent>
                </S.LoginForm>
            </S.Container>

            <BtnCloseLink redirect="/" class="closeBtn" />

        </S.Container1>
        
    )
}


