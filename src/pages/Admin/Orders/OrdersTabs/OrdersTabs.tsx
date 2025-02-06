import styles from './OrdersTabs.module.scss';
import OrdersTab from '../OrdersTab/OrdersTab';
import { TabNames } from '../Orders';

type OrdersTabsProps = {
    tabNames: TabNames[];
    tab: TabNames;
    selectTab: (tab: TabNames) => void;
};

function OrdersTabs({ tabNames, tab, selectTab }: OrdersTabsProps) {
    return (
        <form className={`${styles['orders-tabs']}`}>
            {tabNames.map((name, index) => {
                return <OrdersTab key={`${name}-${index}`} name={name} tab={tab} selectTab={selectTab} />;
            })}
        </form>
    );
}

export default OrdersTabs;
