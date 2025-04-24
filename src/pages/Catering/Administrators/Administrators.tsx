import { useLocation, useNavigate } from 'react-router-dom';
import AdministratorsList from './AdministratorsList/AdministratorsList';
import { useGetAdministrators } from '../../../utils/hooks/useAdministrators/useAdministrators';
import Preloader from '../../../components/Preloader/Preloader';
import Popup from '../../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import ButtonIconAdd from '../../../components/ButtonIconAdd/ButtonIconAdd';
import { useEffect, useState } from 'react';
import SuccessMessage from '../../../components/SuccessMessage/SuccessMessage';

const Administrators = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const { data, isSuccess, isPending } = useGetAdministrators();
    const administrators = isSuccess ? data.data : [];

    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (location.state?.fromSubmit) {
            setMessage(t('pages.administrators.successMessage'));

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, navigate, location.pathname, t]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 6000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    const onClose = () => {
        navigate('/');
    };

    const addAdministrator = () => {
        navigate('/catering/administrators/add');
    };

    const editAdministrator = (administratorId: string) => {
        navigate(`/catering/administrators/${administratorId}`);
    };

    return (
        <>
            <Popup title={t('pages.administrators.titleAdd')} arrowBack onClose={onClose}>
                {isPending && <Preloader />}
                {administrators.length > 0 && <AdministratorsList administrators={administrators} onEdit={editAdministrator} />}
                <ButtonIconAdd onClick={addAdministrator}>{t('pages.administrators.buttonAdd')}</ButtonIconAdd>
            </Popup>
            {message && <SuccessMessage message={message} />}
        </>
    );
};

export default Administrators;
