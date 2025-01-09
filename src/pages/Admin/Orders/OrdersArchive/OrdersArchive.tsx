import { uniq } from 'lodash';
import { AdminOrder } from '../../../../utils/api/adminService/adminService';
import AccordionListArchive from './AccordionListArchive/AccordionListArchive';

function OrdersArchive({ orders }: { orders: AdminOrder[] }) {
    const dates = uniq(
        orders
            .map((order) => order.issuedAt)
            .map((date) => {
                const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`;
                const month = date.getMonth() > 9 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
                const year = `${date.getFullYear()}`;
                return `${day}.${month}.${year}`;
            })
    );
    return <AccordionListArchive dates={dates} content={orders} />;
}

export default OrdersArchive;
