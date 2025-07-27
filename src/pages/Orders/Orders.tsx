import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserOrders } from '../../utils/hooks/useOrderData/useOrderData';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popups/Popup/Popup';
import { OrderList, OrderListEmpty } from './OrderList/OrderList';
import { UserOrder } from '../../utils/api/orderService/orderService';
import SpinerPreloader from '../../components/SpinerPreloader/SpinerPreloader';

const MyOrders: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const ORDERS_COUNT = 5;
    const triggerRef = useRef<HTMLDivElement>(null);
    const [allOrders, setAllOrders] = useState<UserOrder[]>([]);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [currentOffset, setCurrentOffset] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const { data: userOrders, isLoading, error } = useUserOrders(ORDERS_COUNT, currentOffset);

    useEffect(() => {
        if (!userOrders) return;
        setAllOrders((prev) => {
            const newOrders = userOrders.results.filter((newOrder) => !prev.some((existingOrder) => existingOrder.id === newOrder.id));
            return currentOffset === 0 ? userOrders.results : [...prev, ...newOrders];
        });
        setNextUrl(userOrders.next);
        if (currentOffset > 0) setIsLoadingMore(false);
    }, [userOrders, currentOffset]);

    const loadMore = useCallback(() => {
        if (nextUrl && !isLoading && !isLoadingMore) {
            const url = new URL(nextUrl);
            const offset = parseInt(url.searchParams.get('offset') || '0');
            setIsLoadingMore(true);
            setCurrentOffset(offset);
        }
    }, [nextUrl, isLoading, isLoadingMore]);

    useEffect(() => {
        const triggerElement = triggerRef.current;
        if (!triggerElement || !nextUrl || isLoading || isLoadingMore) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) loadMore();
            },
            { threshold: 1 }
        );
        observer.observe(triggerElement);

        return () => {
            observer.unobserve(triggerElement);
        };
    }, [nextUrl, isLoading, loadMore, isLoadingMore]);

    return (
        <Popup
            title={t('pages.order.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            {isLoading && currentOffset === 0 && <Preloader />}
            {error && <ErrorMessage message={error.message} />}
            {!isLoading && !error ? (
                allOrders.length > 0 ? (
                    <>
                        <OrderList orders={allOrders} />
                        {isLoadingMore && <SpinerPreloader />}
                        {nextUrl && <div ref={triggerRef}></div>}
                    </>
                ) : (
                    <OrderListEmpty />
                )
            ) : null}
        </Popup>
    );
};

export default MyOrders;
