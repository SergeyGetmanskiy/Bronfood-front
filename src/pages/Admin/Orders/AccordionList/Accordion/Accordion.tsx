import { useRef, useState } from 'react';
import styles from './Accordion.module.scss';
import AccordionDetails from '../AccordionDetails/AccordionDetails';
import { AdminOrder } from '../../../../../utils/api/adminService/adminService';

function Accordion({ content, isArchive }: { content: AdminOrder; isArchive: boolean }) {
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
        <li className={`${styles.accordion} ${isOpen && isArchive ? styles.accordion - archive_active : isOpen && !isArchive ? styles.accordion_active : ''}`}>
            <div className={`${isArchive ? styles.accordion__summary_archive : styles.accordion__summary} ${isOpen && isArchive ? styles.accordion__summary_archive_active : isOpen && !isArchive ? styles.accordion__summary_active : ''} `} onClick={toggleAccordion}>
                <h3 className={`${styles.accordion__username} ${isOpen ? styles.accordion__username_active : ''} ${isArchive ? styles.accordion__username_archive : ''}`}>{content.userName}</h3>
                <h3 className={`${styles.accordion__ordercode} ${isOpen ? styles.accordion__ordercode_active : ''} ${isArchive ? styles.accordion__ordercode_archive : ''}`}>{content.orderCode}</h3>
                <div className={`${isArchive ? styles.accordion__icon_archive : styles.accordion__icon} ${isOpen && isArchive ? styles.accordion__icon_archive_active : isOpen && !isArchive ? styles.accordion__icon_active : ''} `} />
            </div>
            <div ref={ref} className={styles.accordion__details}>
                <AccordionDetails order={content} />
            </div>
        </li>
    );
}

export default Accordion;
