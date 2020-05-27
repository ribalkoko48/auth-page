import React, {useCallback, useState} from 'react';
import cn from 'classnames'
import {ERRORS_MAP, FORM_NAME} from '../constants';
import {Mail, Lock} from '../assets';
import {Loader} from '../components/loader'
// import {Modal} from '../components/modal';
import {Button} from '../components/button';
import {Input} from "../components/input";
import style from './auth-page.module.scss';
import {RotateBlock} from "../components/rotate-block/rotate-block";

interface IAuthPage {
    firebase: {
        auth: () => ({
            createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;

            signInWithEmailAndPassword(email: string, password: string): Promise<firebase.auth.UserCredential>;
        })
    }
}

export function AuthPage(props: IAuthPage) {
    const {firebase} = props;
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(FORM_NAME.SING_IN);
    const [modal, showModal] = useState({message: '', isActive: false});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isRegistryForm = form === FORM_NAME.REGISTRATION;
    const buttonText = isRegistryForm ? 'Зарегистрироваться' : 'Войти';
    const isDisabled = isRegistryForm
        ? !email || !password || !confirmPassword || (password !== confirmPassword) || modal.isActive
        : !email || !password || modal.isActive;

    const handleShowModal = useCallback(errorMessage => {
        showModal({
            message: errorMessage || 'Что-то пошло не так. Попробуйте еще раз!',
            isActive: true
        })
    }, [showModal]);

    const closeModal = useCallback(() => {
        showModal({
            message: modal.message,
            isActive: false
        })
    }, [showModal, modal.message]);

    const clearForm = useCallback(() => {
        setPassword('');
        setConfirmPassword('');
    }, [setPassword, setConfirmPassword]);

    const toggleForm = useCallback(() => {
        setForm(isRegistryForm ? FORM_NAME.SING_IN : FORM_NAME.REGISTRATION);
        closeModal();
        clearForm();
    }, [isRegistryForm, setForm, closeModal, clearForm]);

    const handleChange = useCallback(setState => ({target: {value}}) => {
        setState(value);
        closeModal();
    }, [closeModal]);

    const handleCreate = useCallback(async () => {
        setLoading(true);
        console.log('handleCreate')
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            // localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
            handleShowModal('Добро пожаловать в мусорку ribalkoko48')
            setLoading(false)
        } catch (error) {
            handleShowModal(ERRORS_MAP[error.code])
            setLoading(false)
        }
    }, [email, password, firebase, handleShowModal, setLoading]);

    const handleSingIn = useCallback(async () => {
        console.log('handleSingIn')
        setLoading(true)
        try {
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            // localStorage.setItem('user', JSON.stringify(user));
            console.log(user)
            handleShowModal('Добро пожаловать в мусорку ribalkoko48')
            setLoading(false)
        } catch (error) {
            handleShowModal(ERRORS_MAP[error.code])
            setLoading(false)
        }
    }, [email, password, firebase, handleShowModal, setLoading]);

    return (
        <div className={style.authPage}>
            {<div className={style.title}>{isRegistryForm ? 'Регистрация' : 'Вход'}</div>}
            <div className={cn(style.forms, isRegistryForm && style.forms_active)}>
                <div className={cn(style.form, style.registration)}>
                    <Input disabled={!isRegistryForm} icon={Mail} label="Email" placeholder="Введите Email" className={style.input}
                           onChange={handleChange(setEmail)} value={email} />
                    <Input disabled={!isRegistryForm} icon={Lock} label="Пароль" placeholder="Введите пароль" className={style.input}
                           onChange={handleChange(setPassword)} value={password} type="password" />
                    <Input disabled={!isRegistryForm} icon={Lock} label="Пароль еще раз" placeholder="Введите пароль"
                           className={style.input} onChange={handleChange(setConfirmPassword)} value={confirmPassword} type="password" />
                </div>
                <div className={cn(style.form, style.singIn)}>
                    <Input disabled={isRegistryForm} icon={Mail} label="Email" placeholder="Введите Email" className={style.input}
                           onChange={handleChange(setEmail)} value={email} />
                    <Input disabled={isRegistryForm} icon={Lock} label="Пароль" placeholder="Введите пароль" className={style.input}
                           onChange={handleChange(setPassword)} value={password} type="password" />
                </div>
            </div>
            <div className={style.linkWrap}>
                <div onClick={toggleForm} className={cn(style.link, isRegistryForm && style.link_active)}>я уже зарегистрирован</div>
                <div onClick={toggleForm} className={cn(style.link, !isRegistryForm && style.link_active)}>перейти к регистрации</div>
            </div>
            <RotateBlock
                isFront={!modal.isActive}
                FrontComponent={<Button
                    className={style.button}
                    onClick={isRegistryForm ? handleCreate : handleSingIn}
                    disabled={isDisabled}
                >{
                    loading ? <div className={style.loading}><Loader width={24} /> ...Загружаю</div> : buttonText
                }</Button>}
                BackComponent={modal.message} />

            {/*<Modal
                isActive={modal.isActive}
                closeModal={closeModal}
            >
                {modal.message}
            </Modal>*/}
        </div>
    )
};