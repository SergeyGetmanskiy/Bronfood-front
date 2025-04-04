import { Dispatch, SetStateAction } from 'react';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionList from '../AccordionList/AccordionList';
import { OrderStatus } from '../Orders';
import { useGetAdminOrders } from '../../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../../components/Preloader/Preloader';

function OrdersNotAccepted({ setOrderStatus }: { setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const { data, isSuccess, isPending } = useGetAdminOrders('paid');
    const adminOrders: AdminOrder[] = isSuccess ? data.data : [];
    return isPending ? <Preloader /> : <AccordionList data={adminOrders} isArchive={false} setOrderStatus={setOrderStatus as Dispatch<SetStateAction<OrderStatus>>} />;
}

export default OrdersNotAccepted;
