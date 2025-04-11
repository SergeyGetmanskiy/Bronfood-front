import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './ButtonUnderline.module.scss';

interface ButtonUnderline extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Text on button
     */
    children?: ReactNode;
}

const ButtonUnderline: FC<ButtonUnderline> = ({ ...props }) => {
    return <button type="button" className={styles.button} {...props}></button>;
};

export default ButtonUnderline;
