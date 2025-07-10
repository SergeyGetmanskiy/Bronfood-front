import { FC, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderList.module.scss';
import { UserOrder } from '../../../utils/api/orderService/orderService';
import { useNavigate } from 'react-router-dom';

type OrderListProps = {
    orders?: UserOrder[];
};

const OrderList: FC<OrderListProps> = ({ orders }) => {
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState<number | null>(null);

    const toggleShowDetails = (orderId: number) => {
        setShowDetails((prev) => (prev === orderId ? null : orderId));
    };

    const handleFeedback = () => {
        navigate('/leave-order-feedback');
    };

    return (
        <>
            <div className={styles['order-list']}>{orders?.map((order) => <OrderItem order={order} key={order.id} onClickFeedback={handleFeedback} showDetails={() => toggleShowDetails(order.id)} isShow={showDetails === order.id} />)}</div>
        </>
    );
};

export default OrderList;
