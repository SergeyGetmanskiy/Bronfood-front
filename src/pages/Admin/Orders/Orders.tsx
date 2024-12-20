import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import OrdersTabs from './OrdersTabs/OrdersTabs';
import OrdersNotAccepted from './OrdersNotAccepted/OrdersNotAccepted';
import OrdersCooking from './OrdersCooking/OrdersCooking';
import OrdersArchive from './OrdersArchive/OrdersArchive';
import Preloader from '../../../components/Preloader/Preloader';
import { MealInBasket } from '../../../utils/api/basketService/basketService';

const tabNames = ['notAccepted', 'cooking', 'archive'];

export interface Order {
    summary: {
        userName: string;
        orderCode: string;
    };
    details: {
        meals: MealInBasket[];
    };
    type: 'not accepted' | 'cooking';
}

function Orders() {
    const [isPending, startTransition] = useTransition();
    const [tab, setTab] = useState('notAccepted');
    const navigate = useNavigate();
    const close = () => {
        navigate('/admin');
    };
    const selectTab = (nextTab: string) => {
        startTransition(() => {
            setTab(nextTab);
        });
    };

    return (
        <>
            <AdminPopup close={close}>
                <OrdersTabs tabNames={tabNames} tab={tab} selectTab={selectTab} />
                {isPending && <Preloader />}
                {tab === 'notAccepted' && <OrdersNotAccepted />}
                {tab === 'cooking' && <OrdersCooking />}
                {tab === 'archive' && <OrdersArchive />}
            </AdminPopup>
        </>
    );
}

export default Orders;
