import styles from './OrdersTabs.module.scss';

const tabNames = ['Not accepted', 'Cooking', 'Archive'];

function OrdersTabs() {
    return (
        <ul className={`${styles.orders_tabs}`}>
            {tabNames.map((name, index) => {
                return <li key={`${name}-${index}`}>asdf</li>;
            })}
        </ul>
    );
}

export default OrdersTabs;
