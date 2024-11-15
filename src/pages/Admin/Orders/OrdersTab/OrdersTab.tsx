import { useTranslation } from 'react-i18next';
import styles from './OrdersTab.module.scss';

function OrdersTab({ name }) {
    const { t } = useTranslation();

    return (
        <label className={`${styles.orders_tab}`}>
            <input className={styles.orders_tab_input} type="checkbox" defaultChecked={false} />
            <span className={`${styles.orders_tab_text}`}>{t(`pages.admin.${name}`)}</span>
        </label>
    );
}

export default OrdersTab;
