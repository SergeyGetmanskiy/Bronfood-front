import { useNavigate } from 'react-router-dom';
import OrdersPopup from './OrdersPopup/OrdersPopup';

function Orders() {
    const navigate = useNavigate();
    const close = () => {
        navigate(-1);
    };
    return (
        <>
            <OrdersPopup close={close}></OrdersPopup>
        </>
    );
}

export default Orders;
