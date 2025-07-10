import { FC, useState } from 'react';
import OrderList from './OrderList/OrderList';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import { useUserOrders } from '../../utils/hooks/useOrderData/useOrderData';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const MyOrders: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(0);
    const offset = page * PAGE_SIZE;

    const { data: userOrders, isLoading, error } = useUserOrders(PAGE_SIZE, offset);

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
            {!isLoading && userOrders && userOrders.results ? (
                <>
                    <OrderList orders={userOrders?.results} />
                    <div>
                        <button onClick={handlePrevPage} disabled={page === 0}>
                            назад
                        </button>
                        <button onClick={handleNextPage} disabled={page === 0}>
                            вперед
                        </button>
                    </div>
                </>
            ) : (
                <p>нет заказов</p>
            )}
            {error && <ErrorMessage message={error.message} />}
        </Popup>
    );
};

export default MyOrders;
