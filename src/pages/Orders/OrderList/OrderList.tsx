import { FC, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderList.module.scss';
import { UserOrder } from '../../../utils/api/orderService/orderService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type OrderListProps = {
    orders?: UserOrder[];
    prevPage: () => void;
    nextPage: () => void;
};

export const OrderList: FC<OrderListProps> = ({ orders, prevPage, nextPage }) => {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState<number | null>(null);

    const toggleShowDetails = (orderId: number) => {
        setShowDetails((prev) => (prev === orderId ? null : orderId));
    };

    const handleFeedback = () => {
        navigate('/leave-order-feedback');
    };

    return (
        <div className={styles['order-list']}>
            {orders?.map((order) => <OrderItem order={order} key={order.id} onClickFeedback={handleFeedback} showDetails={() => toggleShowDetails(order.id)} isShow={showDetails === order.id} />)}
            <div className={styles['order-list_button-container']}>
                <button className={styles['order-list_button']} onClick={prevPage}>
                    назад
                </button>
                <button className={styles['order-list_button']} onClick={nextPage}>
                    вперед
                </button>
            </div>
        </div>
    );
};

export function OrderListEmpty() {
    const { t } = useTranslation();

    return <p className={styles['empty-title']}>{t('pages.order.titleMyOrdersEmpty')}</p>;
}
