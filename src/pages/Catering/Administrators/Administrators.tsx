import { useNavigate } from 'react-router-dom';
import AdministratorsList from './AdministratorsList/AdministratorsList';
import { useGetAdministrators } from '../../../utils/hooks/useAdministrators/useAdministrators';
import Preloader from '../../../components/Preloader/Preloader';
import Popup from '../../../components/Popups/Popup/Popup';
import { useTranslation } from 'react-i18next';
import ButtonIconAdd from '../../../components/ButtonIconAdd/ButtonIconAdd';

const Administrators = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { data, isSuccess, isPending } = useGetAdministrators();
    const administrators = isSuccess ? data.data : [];
    const onClose = () => {
        navigate('/');
    };

    const addAdministrator = () => {
        navigate('/catering/administrators/add');
    };

    const editAdministrator = (administratorId: string) => {
        navigate(`/catering/administrators/edit/${administratorId}`);
    };

    return (
        <Popup title={t('pages.administrators.titleAdd')} arrowBack onClose={onClose}>
            {isPending && <Preloader />}
            {administrators.length > 0 && <AdministratorsList administrators={administrators} onEdit={editAdministrator} />}
            <ButtonIconAdd onClick={addAdministrator}>{t('pages.administrators.buttonAdd')}</ButtonIconAdd>
        </Popup>
    );
};

export default Administrators;
