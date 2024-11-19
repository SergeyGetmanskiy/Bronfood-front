import { useState } from 'react';
import styles from './Accordion.module.scss';

function Accordion() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => setIsOpen(!isOpen);

    return (
        <li className={`${styles.accordion} ${isOpen ? styles.accordion_active : ''}`}>
            <div className={styles.accordion__summary} onClick={toggleAccordion}>
                <h3 className={styles.accordion__username}>Ермек</h3>
                <h3 className={styles.accordion__ordercode}>LKJ65</h3>
                <div className={styles.accordion__icon} />
            </div>
            {isOpen && <div>dfghdfthdfhdfghdfghdfgh</div>}
        </li>
    );
}

export default Accordion;
