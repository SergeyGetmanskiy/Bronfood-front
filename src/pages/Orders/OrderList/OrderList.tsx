import { FC, useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import styles from './OrderList.module.scss';
import { UserOrder } from '../../../utils/api/orderService/orderService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import Preloader from '../../../components/Preloader/Preloader';
import PopupOrderCancelled from '../../PopupOrderCancelled/PopupOrderCancelled';
import { useOrderData } from '../../../utils/hooks/useOrderData/useOrderData';
import { useCurrentUser } from '../../../utils/hooks/useCurrentUser/useCurretUser';

type OrderListProps = {
    orders: UserOrder[];
};

export const OrderList: FC<OrderListProps> = ({ orders }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currentUser } = useCurrentUser();
    const { isLoading, setPreparationTime, setCancellationTime, cancelOrder } = useOrderData(currentUser?.id ?? null, null);
    const [showDetails, setShowDetails] = useState<number | null>(null);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
    const [showOrderCancelledPopup, setShowOrderCancelledPopup] = useState(false);
    const [orderToCancel, setOrderToCancel] = useState<number | null>(null);

    const toggleShowDetails = (orderId: number) => {
        setShowDetails((prev) => (prev === orderId ? null : orderId));
    };

    const handleFeedback = (order: UserOrder) => {
        navigate('/leave-order-feedback', { state: { orderId: order.id, restaurantId: order.restaurant.id } });
    };

    const handleCancelOrder = (orderId: number) => {
        setOrderToCancel(orderId);
        setShowConfirmationPopup(true);
    };

    const handleConfirmCancelOrder = () => {
        if (orderToCancel !== null) {
            cancelOrder.mutate(orderToCancel.toString());
        }
    };

    useEffect(() => {
        if (cancelOrder.isSuccess) {
            setShowOrderCancelledPopup(true);
            setPreparationTime(0);
            setCancellationTime(0);
            setOrderToCancel(null);
        }
    }, [cancelOrder.isSuccess, setPreparationTime, setCancellationTime]);

    return (
        <>
            <ul className={styles['order-list']}>{orders?.map((order) => <OrderItem order={order} key={order.id} onClickFeedback={() => handleFeedback(order)} showDetails={() => toggleShowDetails(order.id)} isShow={showDetails === order.id} onClickCancel={() => handleCancelOrder(order.id)} />)}</ul>
            {showConfirmationPopup && (
                <div className={styles['confirmation-popup-wrapper']}>
                    <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToCancelTheOrder')} confirmButtonText={t('components.confirmationPopup.yes')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmCancelOrder} />
                    {isLoading && (
                        <div className={styles['preloader-wrapper']}>
                            <Preloader />
                        </div>
                    )}
                </div>
            )}
            {showOrderCancelledPopup && <PopupOrderCancelled />}
        </>
    );
};

export function OrderListEmpty() {
    const { t } = useTranslation();

    return <p className={styles['empty-title']}>{t('pages.order.titleMyOrdersEmpty')}</p>;
}
