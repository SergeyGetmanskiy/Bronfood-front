import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './ButtonGrey.module.scss';

interface ButtonGrey extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text on button
     */
    children?: ReactNode;
}

const ButtonGrey: FC<ButtonGrey> = ({ ...props }) => {
    return (
        <button {...props} className={`${styles.button} ${props.disabled ? styles.button_disabled : ''}`}>
            {props.children}
        </button>
    );
};

export default ButtonGrey;
