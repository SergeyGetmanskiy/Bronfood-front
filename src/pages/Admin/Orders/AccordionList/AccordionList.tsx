import styles from './AccordionList.module.scss';
import Accordion from './Accordion/Accordion';
import { MockOrder } from '../OrdersNotAccepted/OrdersNotAccepted';

function AccordionList({ data }: { data: MockOrder[] }) {
    return (
        <ul className={`${styles.accordion_list} bronfood-scrollbar`}>
            {data.map((order, index) => {
                return <Accordion key={`${order.summary.orderCode}-${index}`} order={order} />;
            })}
        </ul>
    );
}

export default AccordionList;