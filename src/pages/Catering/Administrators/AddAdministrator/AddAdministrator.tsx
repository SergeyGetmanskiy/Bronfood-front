import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../../components/Popups/Popup/Popup';
import { useCreateAdministrator } from '../../../../utils/hooks/useAdministrators/useAdministrators';
import Preloader from '../../../../components/Preloader/Preloader';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import AdministratorForm from '../AdministratorForm/AdministratorForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const AddAdministrator = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutateAsync, isPending, error } = useCreateAdministrator();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await mutateAsync({
            login: data.login,
            password: data.password,
            restaurant: data.restaurant,
        });
        navigate('/catering/administrators', {
            state: {
                fromSubmit: true,
            },
        });
    };

    const onClose = () => {
        navigate('/');
    };

    return (
        <Popup title={t('pages.administrators.titleCreate')} arrowBack onClose={onClose}>
            {isPending && <Preloader />}
            {error && <ErrorMessage message={error.message} />}
            <AdministratorForm onSubmit={onSubmit} isLoading={isPending} />
        </Popup>
    );
};

export default AddAdministrator;
