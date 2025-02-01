import { FC, ButtonHTMLAttributes } from 'react';
import styles from './ButtonIconOrange.module.scss';

/* Can be any button from this design: https://www.figma.com/file/9H7H1cGkW9CYB7iFRpm7x3/bronfood.com?type=design&node-id=222-4281&mode=design&t=ZP4xbFL1UkoD1zb6-4 */

interface ButtonIconOrangeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Button's state
     */
    isActive?: boolean;
    /**
     * Icon inside button
     */
    icon?: 'close' | 'add';
}

const ButtonIconOrange: FC<ButtonIconOrangeProps> = ({ isActive = false, icon = 'close', ...props }) => {
    return (
        <button
            {...props}
            className={`
                ${styles['button-icon-orange']}
                ${styles[`button-icon-orange__icon_${icon}`]}
                ${isActive ? styles['button-icon-orange_active'] : ''}
                ${icon === 'close' ? styles['button-icon-orange_wide'] : ''}
            `}
        />
    );
};

export default ButtonIconOrange;
