import React, {ReactNode, FC, MouseEvent} from 'react';
import cn from 'classnames';
import style from './button.module.scss';

interface IPropsInput {
    onClick: (event: MouseEvent) => void;
    onCClick?: any;
    ddisabled?: any;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}

export const Button: FC<IPropsInput> = (props: IPropsInput) => {
    const {children, disabled, className, onClick} = props;

    return (
        <button
            className={cn(className, style.button)}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
};