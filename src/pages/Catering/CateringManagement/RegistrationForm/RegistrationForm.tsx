import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Form from '../../../../components/Form/Form';
import Button from '../../../../components/Button/Button';
import ProgressSteps from '../../../../components/ProgressSteps/ProgressSteps';
import { useTranslation } from 'react-i18next';
import TypeStep from './RegistrationStepsCatering/TypeStep/TypeStep';
import LocationStep from './RegistrationStepsCatering/LocationStep/LocationStep';
import MediaStep from './RegistrationStepsCatering/MediaStep/MediaStep';
import { useNavigate } from 'react-router-dom';
import RegistrationPopup from './RegistrationPopup/RegistrationPopup';
import { useRestaurantsContext } from '../../../../utils/hooks/useRestaurants/useRestaurantsContext';
import restaurant1 from '../../../../utils/api/cateringService/MockImages/restaurant1.png';

type RegistrationFormProps = {
    title: string;
    onSubmit: SubmitHandler<FieldValues>;
    defaultValues?: {
        type: string;
        name: string;
        address: string;
        description?: string;
        cancellationDeadlineMinutes?: number | null;
        photo: string;
        rating: number;
    };
    isLoading?: boolean;
};

const RegistrationForm = ({
    title,
    onSubmit,
    defaultValues = {
        type: 'fastFood',
        name: '',
        address: '',
        description: '',
        cancellationDeadlineMinutes: null,
        rating: 0,
        photo: restaurant1,
    },
}: RegistrationFormProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const totalSteps = 3;
    const { t } = useTranslation();
    const { venueTypes } = useRestaurantsContext();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        trigger,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues,
        mode: 'onChange',
    });

    const formValues = watch();

    const onClose = () => {
        navigate('/');
    };

    const handleNextClick = async () => {
        if (currentStep === 1 && !formValues.type) {
            return;
        }
        if (currentStep === 2) {
            const fieldsToValidate = ['name', 'address'];
            const isValid = await trigger(fieldsToValidate);

            if (!isValid) {
                return;
            }
        }
        if (currentStep === 3) {
            const isValid = await trigger();
            if (!isValid) {
                return;
            }
            await handleSubmit(onSubmit)();
            return;
        }
        setCurrentStep((prev) => prev + 1);
    };

    const handlePrevClick = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const handleTypeChange = (type: string) => {
        setValue('type', type, { shouldValidate: true });
    };

    return (
        <RegistrationPopup title={title} close={onClose} {...(currentStep !== 1 && { prevStep: handlePrevClick })}>
            <ProgressSteps currentStep={currentStep} totalSteps={totalSteps}></ProgressSteps>
            <Form name="form-registration-establishments" onSubmit={(e) => e.preventDefault()}>
                {currentStep === 1 && <TypeStep selectedType={formValues.type} onTypeChange={handleTypeChange} types={venueTypes.all} />}
                {currentStep === 2 && <LocationStep register={register} errors={errors} values={formValues} />}
                {currentStep === 3 && <MediaStep register={register} errors={errors} values={formValues} />}
                {currentStep < totalSteps ? (
                    <Button type="button" onClick={handleNextClick}>
                        {t('pages.cateringManagement.buttonNext')}
                    </Button>
                ) : (
                    <Button type="submit" onClick={() => handleSubmit(onSubmit)()}>
                        {' '}
                        {t('pages.cateringManagement.buttonSave')}
                    </Button>
                )}
            </Form>
        </RegistrationPopup>
    );
};

export default RegistrationForm;
