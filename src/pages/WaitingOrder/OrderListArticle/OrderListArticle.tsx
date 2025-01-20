import { FC } from 'react';
import { OrderState } from '../../../utils/api/orderService/orderService';
import { OrderListItem } from '../OrderListItem/OrderListItem';
import styles from './OrderListArticle.module.scss';

type OrderListArticleProps = {
    order: OrderState;
};

const OrderListArticle: FC<OrderListArticleProps> = ({ order }) => {
    return (
        <article className={styles.order - list - article}>
            <ul className={styles.order - list - article__list}>
                {order.orderedMeal.map((item) => (
                    <OrderListItem item={item} key={item.orderedMeal.id} />
                ))}
            </ul>
            <div className={styles.order - list - article__amount}>
                <h3 className={styles.order - list - article__title}>Итого: </h3>
                <h3 className={styles.order - list - article__title}>{order.totalAmount} &#x20B8;</h3>
            </div>
        </article>
    );
};

export default OrderListArticle;
