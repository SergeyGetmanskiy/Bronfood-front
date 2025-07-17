import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserOrders } from '../../utils/hooks/useOrderData/useOrderData';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popups/Popup/Popup';
import { OrderList, OrderListEmpty } from './OrderList/OrderList';
import OrdersListPagination from './OrdersListPagination/OrdersListPagination';

const MyOrders: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const ORDERS_COUNT = 5;
    const [page, setPage] = useState(0);
    const offset = page * ORDERS_COUNT;
    const { data: userOrders, isLoading, error } = useUserOrders(ORDERS_COUNT, offset);
    const totalItems = userOrders?.count || 0;

    const handleNextPage = () => {
        setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setPage((prev) => prev - 1);
    };

    return (
        <Popup
            title={t('pages.order.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            {isLoading && <Preloader />}

            {!isLoading &&
                (userOrders?.results?.length ? (
                    <>
                        <OrderList orders={userOrders.results} />
                        <OrdersListPagination prevPage={handlePrevPage} nextPage={handleNextPage} currentPage={page} totalItems={totalItems} setPage={setPage} ordersCount={ORDERS_COUNT} />{' '}
                    </>
                ) : (
                    <OrderListEmpty />
                ))}

            {error && <ErrorMessage message={error.message} />}
        </Popup>
    );
};

export default MyOrders;
