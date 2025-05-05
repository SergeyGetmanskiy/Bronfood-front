import { useTranslation } from 'react-i18next';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import { useCreateCatering } from '../../../../utils/hooks/useCatering/useCatering';
import Preloader from '../../../../components/Preloader/Preloader';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';

const AddCatering = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { mutateAsync, isPending, error } = useCreateCatering();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const cateringData = {
            name: data.name,
            address: data.address,
            description: data.description,
            type: data.type,
            cancellationDeadlineMinutes: Number(data.cancellationDeadlineMinutes) || null,
            photo: data.photo,
            rating: data.rating,
        };
        const response = await mutateAsync(cateringData);
        const createdCatering = response.data;
        if (createdCatering?.id) {
            navigate(`/catering/${createdCatering.id}`, {
                state: { catering: createdCatering },
            });
        } else {
            navigate('/catering');
        }
    };

    return (
        <>
            {isPending && <Preloader />}
            {error && <ErrorMessage message={error.message} />}
            <RegistrationForm title={t('pages.cateringManagement.titleRegistration')} onSubmit={onSubmit} isLoading={isPending} />
        </>
    );
};

export default AddCatering;
