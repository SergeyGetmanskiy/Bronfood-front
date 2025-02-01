import { FC } from 'react';
import { OrderState } from '../../../utils/api/orderService/orderService';
import styles from './OrderListItem.module.scss';

export const OrderListItem: FC<{ item: OrderState['orderedMeal'][number] }> = ({ item }) => (
    <li className={styles['order-list-item__item']}>
        <h3 className={styles['order-list-item__title']}>{item.orderedMeal.name}</h3>
        <p className={styles['order-list-item__price']}>
            {item.orderedMeal.price} &#x20B8;&nbsp;
            <span className={styles['order-list-item__span']}>x{item.quantity}</span>
        </p>
    </li>
);
