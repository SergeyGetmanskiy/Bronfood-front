import { useTranslation } from 'react-i18next';
import { useCreateCatering } from '../../../../utils/hooks/useCatering/useCatering';
import Preloader from '../../../../components/Preloader/Preloader';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import RegistrationStepsCatering from '../RegistrationStepsCatering/RegistrationStepsCatering';

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
            cancellationTime: data.cancellationTime,
            photo: data.photo,
            rating: data.rating,
            tags: data.tags,
            workingTime: data.workingTime,
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
            <RegistrationStepsCatering title={t('pages.cateringManagement.titleRegistration')} onSubmit={onSubmit} />
        </>
    );
};

export default AddCatering;
