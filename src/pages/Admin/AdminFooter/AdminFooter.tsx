import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AdminFooter.module.scss';

function AdminFooter() {
    const [isOrdersActive, setIsOrdersActive] = useState(false);
    const [isWorkStatusActive, setIsWorkStatusActive] = useState(false);
    const { t } = useTranslation();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/admin') {
            setIsOrdersActive(false);
            setIsWorkStatusActive(false);
        }
        if (location.pathname === '/admin/orders') {
            setIsOrdersActive(true);
            setIsWorkStatusActive(false);
        }
        if (location.pathname === '/admin/work-status') {
            setIsWorkStatusActive(true);
            setIsOrdersActive(false);
        }
    }, [location.pathname]);

    return (
        <footer className={styles.admin_footer}>
            <div className={`${styles.admin_footer__container}`}>
                <Link to={isOrdersActive ? '/admin' : '/admin/orders'} className={styles.admin_footer__element_container}>
                    <button
                        title={t('pages.admin.orders')}
                        className={`
                            ${styles.admin_footer__icon}
                            ${styles.admin_footer__orders}
                            ${isOrdersActive ? styles.admin_footer__orders_active : ''}
                        `}
                    />
                    <h3 className={`${styles.admin_footer__element_title} ${isOrdersActive ? styles.admin_footer__element_title_active : ''}`}>{t('pages.admin.orders')}</h3>
                </Link>
                <Link to={isWorkStatusActive ? '/admin' : '/admin/work-status'} className={styles.admin_footer__element_container}>
                    <button
                        title={t('pages.admin.workStatus')}
                        className={`
                            ${styles.admin_footer__icon}
                            ${styles.admin_footer__work_status}
                            ${isWorkStatusActive ? styles.admin_footer__work_status_active : ''}
                        `}
                    />
                    <h3 className={`${styles.admin_footer__element_title} ${isWorkStatusActive ? styles.admin_footer__element_title_active : ''}`}>{t('pages.admin.workStatus')}</h3>
                </Link>
            </div>
        </footer>
    );
}

export default AdminFooter;
