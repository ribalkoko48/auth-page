import React, {FC,ReactNode} from 'react';
import style from './modal.module.scss';

interface IPropsModal {
    isActive: boolean;
    children: ReactNode;
    closeModal: () => void;
}

export const Modal: FC<IPropsModal> = (props: IPropsModal) => {
    const {isActive, children} = props;

    return (
        <div className={style.content}>
            {isActive ? children : null }
        </div>
    )
};