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
                if (date instanceof Date) {
                    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
                    const month = date.getMonth() > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
                    const year = `${date.getFullYear()}`;
                    return `${day}.${month}.${year}`;
                } else return date;
            })
    );
    return isPending ? <Preloader /> : <AccordionListArchive dates={dates} content={adminOrders} />;
}

export default OrdersArchive;
