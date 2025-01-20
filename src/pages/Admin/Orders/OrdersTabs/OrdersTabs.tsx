import styles from './OrdersTabs.module.scss';
import OrdersTab from '../OrdersTab/OrdersTab';

type OrdersTabsProps = {
    tabNames: string[];
    tab: string;
    selectTab: (tab: string) => void;
};

function OrdersTabs({ tabNames, tab, selectTab }: OrdersTabsProps) {
    return (
        <form className={`${styles.orders - tabs}`}>
            {tabNames.map((name, index) => {
                return <OrdersTab key={`${name}-${index}`} name={name} tab={tab} selectTab={selectTab} />;
            })}
        </form>
    );
}

export default OrdersTabs;
