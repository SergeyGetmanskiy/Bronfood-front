import { useNavigate, useOutletContext } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';

function Orders() {
    const navigate = useNavigate();
    const [setIsPopupOpen] = useOutletContext();
    const close = () => {
        navigate('/admin');
        setIsPopupOpen(false);
    };
    return (
        <>
            <AdminPopup close={close}></AdminPopup>
        </>
    );
}

export default Orders;