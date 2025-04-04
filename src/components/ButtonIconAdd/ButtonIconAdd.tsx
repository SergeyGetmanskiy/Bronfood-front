import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './ButtonIconAdd.module.scss';

interface ButtonIconAdd extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text on button
     */
    children?: ReactNode;
}

const ButtonIconAdd: FC<ButtonIconAdd> = ({ ...props }) => {
    return (
        <button className={styles.button} {...props}>
            <p className={styles.button__text}>{props.children}</p>
            <div className={styles.button__icon}></div>
        </button>
    );
};

export default ButtonIconAdd;
