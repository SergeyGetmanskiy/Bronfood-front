import { MouseEvent, ReactNode } from 'react';
import styles from './AdminPopup.module.scss';
import Button from '../../../components/ButtonIconSquare/ButtonIconSquare';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';

type AdminPopupProps = {
    close: () => void;
    children?: ReactNode;
};

const AdminPopup = ({ close, children }: AdminPopupProps) => {
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => close(), [close]);
    return (
        <div className={styles.admin - popup_overlay} onClick={handleOverlayClick}>
            <div className={styles.admin - popup}>
                <div className={`${styles.admin - popup_button} ${styles.admin - popup_button_close}`}>
                    <Button type="button" onClick={close} icon="close" />
                </div>
                {children}
            </div>
        </div>
    );
};

export default AdminPopup;
