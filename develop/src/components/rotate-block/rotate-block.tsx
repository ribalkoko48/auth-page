import React, {FC} from 'react';
import cn from 'classnames'
import style from './rotate-block.module.scss';

interface IRotateBlockProps {
    FrontComponent: any;
    BackComponent: any;
    isFront: boolean;
}

export const RotateBlock: FC<IRotateBlockProps> = (props: IRotateBlockProps) => {
    const {FrontComponent, BackComponent, isFront} = props;

    return (
        <div className={style.wrapper}>
            <div className={cn(style.content, isFront && style.show)}>
                <div className={cn(style.front, !isFront && style.invisible)}>{FrontComponent}</div>
                <div className={cn(style.back, isFront && style.invisible)}>{BackComponent}</div>
            </div>
        </div>
    )
};