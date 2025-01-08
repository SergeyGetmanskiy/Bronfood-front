import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionList from '../AccordionList/AccordionList';

function OrdersArchive({ orders }: { orders: AdminOrder[] }) {
    return <AccordionList data={orders} />;
}

export default OrdersArchive;
