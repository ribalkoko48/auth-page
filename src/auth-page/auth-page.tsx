import React, {useCallback, useEffect, useState} from 'react';
import cn from 'classnames'
import {ERRORS_MAP, FORM_NAME} from '../constants';
import {Mail, Lock} from '../assets';
import {Loader} from '../components/loader'
import {Button} from '../components/button';
import {Input} from "../components/input";
import {RotateBlock} from "../components/rotate-block/rotate-block";
import {ANIMATION_DELAY, Modal} from "../components/modal";
import style from './auth-page.module.scss';

interface IAuthPage {
    firebase: {
        auth: () => ({
            createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;

            signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
        })
    }
}

let timeoutId = null;

export function AuthPage(props: IAuthPage) {
    const {firebase} = props;
    const [loading, setLoading] = useState(false);
    const [isModalActive, toggleModal] = useState<boolean>(false);
    const [form, setForm] = useState(FORM_NAME.SING_IN);
    const [modal, showInfoBlock] = useState({message: '', isActive: false});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isRegistryForm = form === FORM_NAME.REGISTRATION;
    const isDisabled = isRegistryForm
        ? !email || !password || !confirmPassword || (password !== confirmPassword) || modal.isActive
        : !email || !password || modal.isActive;

    useEffect(() => () => clearTimeout(timeoutId), []);

    const handleShowInfoBlock = useCallback(errorMessage => {
        showInfoBlock({
            message: errorMessage || 'Что-то пошло не так. Попробуйте еще раз!',
            isActive: true
        })
    }, [showInfoBlock]);

    const closeInfoBlock = useCallback(() => {
        showInfoBlock({
            message: modal.message,
            isActive: false
        })
    }, [showInfoBlock, modal.message]);

    const clearForm = useCallback(() => {
        setPassword('');
        setConfirmPassword('');
    }, [setPassword, setConfirmPassword]);

    const toggleForm = useCallback(() => {
        setForm(isRegistryForm ? FORM_NAME.SING_IN : FORM_NAME.REGISTRATION);
        closeInfoBlock();
        clearForm();
    }, [isRegistryForm, setForm, closeInfoBlock, clearForm]);

    const handleChange = useCallback(setState => ({target: {value}}) => {
        setState(value);
        closeInfoBlock();
    }, [closeInfoBlock]);

    const handleToggleModal = useCallback(() => {
        toggleModal(!isModalActive);
    }, [toggleModal, isModalActive]);

    const handleCreate = useCallback(async () => {
        setLoading(true);
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
            handleToggleModal()
            setLoading(false)
        } catch (error) {
            handleShowInfoBlock(ERRORS_MAP[error.code])
            setLoading(false)
        }
    }, [email, password, firebase, handleShowInfoBlock, setLoading, handleToggleModal]);

    const handleSingIn = useCallback(async () => {
        console.log('handleSingIn')
        setLoading(true)
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            // localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
            handleToggleModal()
            setLoading(false)
        } catch (error) {
            handleShowInfoBlock(ERRORS_MAP[error.code])
            setLoading(false)
        }
    }, [email, password, firebase, handleShowInfoBlock, setLoading, handleToggleModal]);

    const handleSubmit = useCallback(() => {
        isRegistryForm
            ? handleCreate()
            : handleSingIn()
    }, [isRegistryForm, handleCreate, handleSingIn]);

    const handleGoToMainPage = useCallback(() => {
        handleToggleModal();
        // wait when modal leave
        timeoutId = setTimeout(() => {
            // @ts-ignore
            window.location = 'https://ribalkoko48.github.io/';
        }, ANIMATION_DELAY)
    }, [handleToggleModal]);

    const FrontComponent = <Button
        className={style.submitButton}
        onClick={handleSubmit}
        disabled={isDisabled}
    >{
        loading
            ? <div className={style.loading}><Loader width={24}/> ...Загружаю</div>
            : <div className={style.submitText} onClick={handleToggleModal}>{isRegistryForm ? 'Зарегистрироваться' : 'Войти'}</div>
    }</Button>

    return (
        <div className={style.authPage}>
            {<div className={style.title}>{isRegistryForm ? 'Регистрация' : 'Вход'}</div>}
            <div className={cn(style.forms, isRegistryForm && style.forms_active)}>
                <div className={cn(style.form, style.registration)}>
                    <Input
                        label="Email"
                        placeholder="Введите Email"
                        className={style.input}
                        icon={Mail}
                        value={email}
                        disabled={!isRegistryForm}
                        onChange={handleChange(setEmail)}
                        onEnter={handleSubmit}
                    />
                    <Input
                        type="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        className={style.input}
                        icon={Lock}
                        value={password}
                        disabled={!isRegistryForm}
                        onChange={handleChange(setPassword)}
                        onEnter={handleSubmit}
                    />
                    <Input
                        type="password"
                        label="Пароль еще раз"
                        placeholder="Введите пароль"
                        className={style.input}
                        icon={Lock}
                        value={confirmPassword}
                        disabled={!isRegistryForm}
                        onChange={handleChange(setConfirmPassword)}
                        onEnter={handleSubmit}
                    />
                </div>
                <div className={cn(style.form, style.singIn)}>
                    <Input
                        label="Email"
                        placeholder="Введите Email"
                        className={style.input}
                        icon={Mail}
                        value={email}
                        disabled={isRegistryForm}
                        onChange={handleChange(setEmail)}
                        onEnter={handleSubmit}
                    />
                    <Input
                        type="password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        className={style.input}
                        icon={Lock}
                        value={password}
                        disabled={isRegistryForm}
                        onChange={handleChange(setPassword)}
                        onEnter={handleSubmit}
                    />
                </div>
            </div>
            <div className={style.linkWrap}>
                <div onClick={toggleForm} className={cn(style.link, isRegistryForm && style.link_active)}>Я уже зарегистрирован</div>
                <div onClick={toggleForm} className={cn(style.link, !isRegistryForm && style.link_active)}>Перейти к регистрации</div>
            </div>
            <RotateBlock
                isFront={!modal.isActive}
                FrontComponent={FrontComponent}
                BackComponent={modal.message}/>

            <Modal isActive={isModalActive}>
                <div className={style.modal}>
                    <p>Добро пожаловать в мусорку ribalkoko48</p>
                    <Button className={style.modalButton} onClick={handleGoToMainPage}>Перейти на главную</Button>
                </div>
            </Modal>
        </div>
    )
}