import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AdminFooter.module.scss';

type AdminFooterProps = {
    isPopupOpen: boolean;
    setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

function AdminFooter({ isPopupOpen, setIsPopupOpen }: AdminFooterProps) {
    const [isOrdersActive, setIsOrdersActive] = useState(false);
    const [isWorkStatusActive, setIsWorkStatusActive] = useState(false);
    const { t } = useTranslation();
    const handleOrdersClick = () => {
        if (isPopupOpen & isOrdersActive) {
            setIsPopupOpen(false);
            setIsOrdersActive(false);
        } else if (isPopupOpen & isWorkStatusActive) {
            setIsWorkStatusActive(false);
            setIsOrdersActive(true);
        } else {
            setIsPopupOpen(true);
            setIsOrdersActive(!isOrdersActive);
        }
    };
    const handleWorkStatusClick = () => {
        if (isPopupOpen & isWorkStatusActive) {
            setIsPopupOpen(false);
            setIsWorkStatusActive(false);
        } else if (isPopupOpen & isOrdersActive) {
            setIsOrdersActive(false);
            setIsWorkStatusActive(true);
        } else {
            setIsPopupOpen(true);
            setIsWorkStatusActive(!isWorkStatusActive);
        }
    };
    useEffect(() => {
        if (!isPopupOpen) {
            setIsOrdersActive(false);
            setIsWorkStatusActive(false);
        }
    }, [isPopupOpen]);

    return (
        <footer className={styles.admin_footer}>
            <div className={`${styles.admin_footer__container}`}>
                <Link to={isOrdersActive ? '/admin' : '/admin/orders'} onClick={handleOrdersClick}>
                    <div className={styles.admin_footer__element_container}>
                        <button
                            title={t('pages.admin.orders')}
                            className={`
                                ${styles.admin_footer__icon}
                                ${styles.admin_footer__orders}
                                ${isOrdersActive ? styles.admin_footer__orders_active : ''}
                            `}
                        />
                        <h3 className={`${styles.admin_footer__element_title} ${isOrdersActive ? styles.admin_footer__element_title_active : ''}`}>{t('pages.admin.orders')}</h3>
                    </div>
                </Link>
                <Link to={isWorkStatusActive ? '/admin' : '/admin/work-status'} onClick={handleWorkStatusClick}>
                    <div className={styles.admin_footer__element_container}>
                        <button
                            title={t('pages.admin.workStatus')}
                            className={`
                                ${styles.admin_footer__icon}
                                ${styles.admin_footer__work_status}
                                ${isWorkStatusActive ? styles.admin_footer__work_status_active : ''}
                            `}
                        />
                        <h3 className={`${styles.admin_footer__element_title} ${isWorkStatusActive ? styles.admin_footer__element_title_active : ''}`}>{t('pages.admin.workStatus')}</h3>
                    </div>
                </Link>
            </div>
        </footer>
    );
}

export default AdminFooter;
