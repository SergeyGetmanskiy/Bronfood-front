import { MouseEvent, ReactNode } from 'react';
import styles from './OrdersPopup.module.scss';
import Button from '../../../../components/ButtonIconSquare/ButtonIconSquare';
import { useEsc } from '../../../../utils/hooks/useEsc/useEsc';

type OrdersPopupProps = {
    close: () => void;
    children?: ReactNode;
};

const OrdersPopup = ({ close, children }: OrdersPopupProps) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => close(), [close]);
    return (
        <div className={styles.orders_popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.orders_popup}>
                <div className={`${styles.orders_popup_button} ${styles.orders_popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default OrdersPopup;
