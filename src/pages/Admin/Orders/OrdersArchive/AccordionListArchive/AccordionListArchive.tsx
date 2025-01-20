import styles from './AccordionListArchive.module.scss';
import AccordionArchive from './AccordionArchive/AccordionArchive';
import { AdminOrder } from '../../../../../utils/api/adminService/adminService';

function AccordionListArchive({ dates, content }: { dates: string[]; content: AdminOrder[] }) {
    return (
        <ul className={`${styles['accordion-list-archive']} bronfood-scrollbar`}>
            {dates.map((date, index) => {
                const orders = content.filter((order) => {
                    if (order.issuedAt instanceof Date) {
                        const orderDate = order.issuedAt;
                        const day = orderDate.getDate() > 9 ? `${orderDate.getDate()}` : `0${orderDate.getDate()}`;
                        const month = orderDate.getMonth() > 9 ? `${orderDate.getMonth() + 1}` : `0${orderDate.getMonth() + 1}`;
                        const year = `${orderDate.getFullYear()}`;
                        return date === `${day}.${month}.${year}`;
                    } else return false;
                });
                return <AccordionArchive key={`${date}-${index}`} content={date} orders={orders} />;
            })}
        </ul>
    );
}

export default AccordionListArchive;
