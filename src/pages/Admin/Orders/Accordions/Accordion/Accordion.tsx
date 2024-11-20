import { useRef, useState } from 'react';
import styles from './Accordion.module.scss';
import { MockOrder } from '../../OrdersNotAccepted/OrdersNotAccepted';

function Accordion({ order }: { order: MockOrder }) {
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
        <li className={`${styles.accordion} ${isOpen ? styles.accordion_active : ''}`}>
            <div className={`${styles.accordion__summary} ${isOpen ? styles.accordion__summary_active : ''}`} onClick={toggleAccordion}>
                <h3 className={`${styles.accordion__username} ${isOpen ? styles.accordion__username_active : ''}`}>{order.summary.userName}</h3>
                <h3 className={`${styles.accordion__ordercode} ${isOpen ? styles.accordion__ordercode_active : ''}`}>{order.summary.orderCode}</h3>
                <div className={`${styles.accordion__icon} ${isOpen ? styles.accordion__icon_active : ''}`} />
            </div>
            <div ref={ref} className={styles.accordion__details}>
                dfghdfthdfhdfghdfghdfgh
            </div>
        </li>
    );
}

export default Accordion;
