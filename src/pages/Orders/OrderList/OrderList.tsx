import { FC, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderList.module.scss';
import { UserOrder } from '../../../utils/api/orderService/orderService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type OrderListProps = {
    orders: UserOrder[];
};

export const OrderList: FC<OrderListProps> = ({ orders }) => {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState<number | null>(null);

    const toggleShowDetails = (orderId: number) => {
        setShowDetails((prev) => (prev === orderId ? null : orderId));
    };

    const handleFeedback = (order: UserOrder) => {
        navigate('/leave-order-feedback', { state: { orderId: order.id, restaurantId: order.restaurant.id } });
    };

    return <ul className={styles['order-list']}>{orders?.map((order) => <OrderItem order={order} key={order.id} onClickFeedback={() => handleFeedback(order)} showDetails={() => toggleShowDetails(order.id)} isShow={showDetails === order.id} />)}</ul>;
};

export function OrderListEmpty() {
    const { t } = useTranslation();

    return <p className={styles['empty-title']}>{t('pages.order.titleMyOrdersEmpty')}</p>;
}
