import styles from './OrdersTabs.module.scss';
import OrdersTab from '../OrdersTab/OrdersTab';
import { useState } from 'react';

const tabNames = ['notAccepted', 'cooking', 'archive'];

function OrdersTabs() {
    const [tab, setTab] = useState('notAccepted');
    const selectTab = (nextTab: string) => setTab(nextTab);

    return (
        <form className={`${styles.orders_tabs}`}>
            {tabNames.map((name, index) => {
                return <OrdersTab key={`${name}-${index}`} name={name} tab={tab} selectTab={selectTab} />;
            })}
        </form>
    );
}

export default OrdersTabs;
