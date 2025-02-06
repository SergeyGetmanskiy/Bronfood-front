import { Dispatch, SetStateAction } from 'react';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionList from '../AccordionList/AccordionList';
import { OrderStatus } from '../Orders';

function OrdersBeingPrepared({ orders, setOrderStatus }: { orders: AdminOrder[]; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    return <AccordionList data={orders} isArchive={false} setOrderStatus={setOrderStatus} />;
}

export default OrdersBeingPrepared;
