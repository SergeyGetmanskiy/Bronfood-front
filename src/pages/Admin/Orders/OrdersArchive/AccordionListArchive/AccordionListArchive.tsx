import styles from './AccordionListArchive.module.scss';
import AccordionArchive from './AccordionArchive/AccordionArchive';
import { AdminOrder } from '../../../../../utils/api/adminService/adminService';

function AccordionListArchive({ dates, content }: { dates: string[]; content: AdminOrder[] }) {
    return (
        <ul className={`${styles['accordion-list-archive']} bronfood-scrollbar`}>
            {dates.map((date, index) => {
                const orders = content.filter((order) => {
                    const d = new Date(order.issuedAt);
                    if (d instanceof Date) {
                        const day = d.getDate() > 9 ? `${d.getDate()}` : `0${d.getDate()}`;
                        const month = d.getMonth() > 9 ? `${d.getMonth() + 1}` : `0${d.getMonth() + 1}`;
                        const year = `${d.getFullYear()}`;
                        return date === `${day}.${month}.${year}`;
                    } else return false;
                });
                return <AccordionArchive key={`${date}-${index}`} content={date} orders={orders} />;
            })}
        </ul>
    );
}

export default AccordionListArchive;
