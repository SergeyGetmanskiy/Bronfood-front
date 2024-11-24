import styles from './Accordions.module.scss';
import Accordion from './Accordion/Accordion';
import { MockOrder } from '../OrdersNotAccepted/OrdersNotAccepted';

function Accordions({ data }: { data: MockOrder[] }) {
    return (
        <ul className={`${styles.accordion} bronfood-scrollbar`}>
            {data.map((order, index) => {
                return <Accordion key={`${order.summary.orderCode}-${index}`} order={order} />;
            })}
        </ul>
    );
}

export default Accordions;
