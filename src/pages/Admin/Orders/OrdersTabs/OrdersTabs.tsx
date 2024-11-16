import styles from './OrdersTabs.module.scss';
import OrdersTab from '../OrdersTab/OrdersTab';

function OrdersTabs({ tabNames, tab, selectTab }) {
    return (
        <form className={`${styles.orders_tabs}`}>
            {tabNames.map((name, index) => {
                return <OrdersTab key={`${name}-${index}`} name={name} tab={tab} selectTab={selectTab} />;
            })}
        </form>
    );
}

export default OrdersTabs;
