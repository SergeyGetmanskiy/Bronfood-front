import { useTranslation } from 'react-i18next';
import styles from './OrdersTab.module.scss';
import { useNavigate } from 'react-router-dom';

type OrdersTabProps = {
    name: string;
    tab: string;
    selectTab: (tab: string) => void;
};

function OrdersTab({ name, tab, selectTab }: OrdersTabProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleChange = () => {
        selectTab(name);
        navigate(`/admin/orders/${name}`);
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
