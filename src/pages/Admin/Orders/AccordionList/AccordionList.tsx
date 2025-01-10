import styles from './AccordionList.module.scss';
import Accordion from './Accordion/Accordion';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';

function AccordionList({ data, isArchive }: { data: AdminOrder[]; isArchive: boolean }) {
    return (
        <ul className={`${styles.accordion_list} bronfood-scrollbar`}>
            {data.map((order, index) => {
                return <Accordion key={`${order.orderCode}-${index}`} content={order} isArchive={isArchive} />;
            })}
        </ul>
    );
}

export default AccordionList;
