import styles from './AccordionList.module.scss';
import Accordion from './Accordion/Accordion';
import { OrderNotAccepted } from '../OrdersNotAccepted/OrdersNotAccepted';

function AccordionList({ data }: { data: OrderNotAccepted[] }) {
    return (
        <ul className={`${styles.accordion_list} bronfood-scrollbar`}>
            {data.map((order, index) => {
                return <Accordion key={`${order.summary.orderCode}-${index}`} content={order} />;
            })}
        </ul>
    );
}

export default AccordionList;