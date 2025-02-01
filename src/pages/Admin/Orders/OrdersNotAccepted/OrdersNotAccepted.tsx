import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionList from '../AccordionList/AccordionList';

function OrdersNotAccepted({ orders }: { orders: AdminOrder[] }) {
    return <AccordionList data={orders} isArchive={false} />;
}

export default OrdersNotAccepted;
