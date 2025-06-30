import { FC } from 'react';
import OrderList from './OrderList/OrderList';
import { mockOrders } from './OrdersMock';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';

const MyOrders: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <Popup
            title={t('pages.order.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            <OrderList orders={mockOrders} />
        </Popup>
    );
};

export default MyOrders;
