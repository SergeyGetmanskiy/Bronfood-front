import { useRef, useState } from 'react';
import styles from './AccordionArchive.module.scss';
import AccordionList from '../../../AccordionList/AccordionList';
import { AdminOrder } from '../../../../../../utils/api/adminService/adminService';

function AccordionArchive({ content, orders }: { content: string; orders: AdminOrder[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const toggleAccordion = () => {
        if (ref.current!) {
            if (ref.current.style.maxHeight) {
                ref.current.style.maxHeight = '';
            } else {
                ref.current.style.maxHeight = ref.current.scrollHeight + 'px';
            }
            setIsOpen(!isOpen);
        }
    };
    return (
        <li className={`${styles.accordion_archive} ${isOpen ? styles.accordion_archive_active : ''}`}>
            <div className={`${styles.accordion_archive__summary} ${isOpen ? styles.accordion_archive__summary_active : ''}`} onClick={toggleAccordion}>
                <h3 className={styles.accordion_archive__date}>{content}</h3>
                <div className={`${styles.accordion_archive__icon} ${isOpen ? styles.accordion_archive__icon_active : ''}`} />
            </div>
            <div ref={ref} className={styles.accordion_archive__details}>
                <AccordionList data={orders} isArchive={true} />
            </div>
        </li>
    );
}

export default AccordionArchive;
