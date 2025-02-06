import styles from './AccordionList.module.scss';
import Accordion from './Accordion/Accordion';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import { Dispatch, SetStateAction } from 'react';
import { OrderStatus } from '../Orders';

function AccordionList({ data, isArchive, setOrderStatus }: { data: AdminOrder[]; isArchive: boolean; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    return (
        <ul className={`${styles['accordion-list']} bronfood-scrollbar`}>
            {data.map((order, index) => {
                return <Accordion key={`${order.orderCode}-${index}`} content={order} isArchive={isArchive} setOrderStatus={setOrderStatus} />;
            })}
        </ul>
    );
}

export default AccordionList;
