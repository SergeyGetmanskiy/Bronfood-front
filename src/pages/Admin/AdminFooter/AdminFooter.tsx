import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './AdminFooter.module.scss';

function AdminFooter() {
    const { t } = useTranslation();

    return (
        <footer className={styles.admin_footer}>
            <div className={`${styles.admin_footer__container}`}>
                <Link to="/admin/orders">
                    <div className={styles.admin_footer__element_container}>
                        <button title={t('pages.admin.orders')} className={`${styles.admin_footer__orders} ${styles.admin_footer__icon}`}></button>
                        <h3 className={styles.admin_footer__element_title}>{t('pages.admin.orders')}</h3>
                    </div>
                </Link>
                <Link to="/admin/work-status">
                    <div className={styles.admin_footer__element_container}>
                        <button title={t('pages.admin.workStatus')} className={`${styles.admin_footer__work_status} ${styles.admin_footer__icon}`}></button>
                        <h3 className={styles.admin_footer__element_title}>{t('pages.admin.workStatus')}</h3>
                    </div>
                </Link>
            </div>
        </footer>
    );
}

export default AdminFooter;
