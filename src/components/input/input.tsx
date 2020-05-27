import React, {FC, ChangeEvent} from 'react';
import cn from 'classnames';
import style from './input.module.scss';


interface IPropsInput {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    disabled?: boolean;
    className?: string;

    [key: string]: any;
}

export const Input: FC<IPropsInput> = (props: IPropsInput) => {
    const {className, onChange, disabled, value, label, icon, ...otherProps} = props;

    return (
        <div className={cn(style.wrapper, className)}>
            {icon && <div className={style.icon}>{icon}</div>}
            <input
                {...otherProps}
                className={style.input}
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
            {label && <label className={style.label}>{label}</label>}
        </div>
    )
};