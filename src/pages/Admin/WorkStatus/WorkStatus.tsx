import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';
import { useAdminPopup } from '../../../utils/hooks/useAdminPopup/useAdminPopup';

function WorkStatus() {
    const navigate = useNavigate();
    const { setIsPopupOpen } = useAdminPopup();
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

export default WorkStatus;
