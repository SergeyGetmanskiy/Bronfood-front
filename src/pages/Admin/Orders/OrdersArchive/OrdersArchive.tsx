import { uniq } from 'lodash';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionListArchive from './AccordionListArchive/AccordionListArchive';
import { useGetAdminOrders } from '../../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../../components/Preloader/Preloader';

function OrdersArchive() {
    const { data, isSuccess, isPending } = useGetAdminOrders('archive');
    const adminOrders: AdminOrder[] = isSuccess ? data.data : [];
    const dates = uniq(
        adminOrders
            .map((order) => order.issuedAt)
            .map((date) => {
                const d = new Date(date);
                if (d instanceof Date) {
                    const day = d.getDate() > 9 ? `${d.getDate()}` : `0${d.getDate()}`;
                    const month = d.getMonth() > 9 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
                    const year = `${d.getFullYear()}`;
                    return `${day}.${month}.${year}`;
                } else return d;
            })
    );
    return isPending ? <Preloader /> : <AccordionListArchive dates={dates} content={adminOrders} />;
}

export default OrdersArchive;
