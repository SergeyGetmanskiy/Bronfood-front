import styles from './OrdersTabs.module.scss';
import OrdersTab from '../OrdersTab/OrdersTab';

const tabNames = ['notAccepted', 'cooking', 'archive'];

function OrdersTabs() {
    return (
        <form className={`${styles.orders_tabs}`}>
            {tabNames.map((name, index) => {
                return <OrdersTab key={`${name}-${index}`} name={name} />;
            })}
        </form>
    );
}

export default OrdersTabs;
