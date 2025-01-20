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
        <li className={`${styles['accordion-archive']} ${isOpen ? styles['accordion-archive_active'] : ''}`}>
            <div className={`${styles['accordion-archive__summary']} ${isOpen ? styles['accordion-archive__summary_active'] : ''}`} onClick={toggleAccordion}>
                <h3 className={styles['accordion-archive__date']}>{content}</h3>
                <div className={`${styles['accordion-archive__icon']} ${isOpen ? styles['accordion-archive__icon_active'] : ''}`} />
            </div>
            <div ref={ref} className={`${styles['accordion-archive__details']} ${isOpen ? `${styles['accordion-archive__details_active']} bronfood-scrollbar` : ''}  `}>
                <AccordionList data={orders} isArchive={true} />
            </div>
        </li>
    );
}

export default AccordionArchive;
