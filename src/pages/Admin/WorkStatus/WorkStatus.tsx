import { useNavigate } from 'react-router-dom';
import AdminPopup from '../AdminPopup/AdminPopup';

function WorkStatus() {
    const navigate = useNavigate();
    const close = () => {
        navigate('/admin');
    };

    return (
        <>
            <AdminPopup close={close}></AdminPopup>
        </>
    );
}

export default WorkStatus;
