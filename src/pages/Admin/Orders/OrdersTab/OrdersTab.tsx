import { useTranslation } from 'react-i18next';
import styles from './OrdersTab.module.scss';

function OrdersTab({ name, tab, selectTab }) {
    const { t } = useTranslation();
    const handleChange = () => {
        selectTab(name);
    };
    const isActive = tab === name;

    return (
        <label className={`${styles.orders_tab} ${isActive ? styles.orders_tab_active : ''}`}>
            <input className={styles.orders_tab_input} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <span className={`${styles.orders_tab_text} ${isActive ? styles.orders_tab_text_active : ''}`}>{t(`pages.admin.${name}`)}</span>
        </label>
    );
}

export default OrdersTab;
