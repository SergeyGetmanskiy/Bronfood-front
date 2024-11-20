import styles from './Accordions.module.scss';
import Accordion from './Accordion/Accordion';

function Accordions({ data }) {
    return (
        <ul className={styles.accordions}>
            {data.map((order, index) => {
                return <Accordion key={`${order.summary.orderCode}-${index}`} order={order} />;
            })}
        </ul>
    );
}

export default Accordions;
