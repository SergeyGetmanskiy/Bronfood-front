import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';

function Orders() {
    const navigate = useNavigate();
    const close = () => {
        navigate(-1);
    };
    return (
        <>
            <AdminPopup close={close}></AdminPopup>
        </>
    );
}

export default Orders;
