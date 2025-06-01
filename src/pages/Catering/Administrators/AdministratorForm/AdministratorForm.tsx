import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Form from '../../../../components/Form/Form';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import InputPassword from '../../../../components/InputPassword/InputPassword';
import FormInputs from '../../../../components/FormInputs/FormInputs';
import { regexClientName } from '../../../../utils/consts';
import { useRestaurantsContext } from '../../../../utils/hooks/useRestaurants/useRestaurantsContext';
import RestaurantCardCompact from '../../../../components/Cards/RestaurantCardCompact/RestaurantCardCompact';
import { emptyCaterings } from '../../../../utils/api/cateringService/MockCateringService';
import { useEffect } from 'react';
import styles from './AdministratorForm.module.scss';
import { Catering } from '../../../../utils/api/cateringService/cateringService';

type AdministratorFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    isLoading?: boolean;
    defaultValues?: {
        login: string;
        password: string;
        catering: Catering;
    };
    onCopied?: () => void;
    renderDeleteButton?: React.ReactNode;
};

const AdministratorForm = ({ onSubmit, isLoading, defaultValues = { login: '', password: '', catering: emptyCaterings[0] }, onCopied, renderDeleteButton }: AdministratorFormProps) => {
    const { t } = useTranslation();
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({ defaultValues });
    const { setLastClickedRestaurantId, setActiveRestaurant } = useRestaurantsContext();
    const formValues = watch();
    const selectedRestaurant = watch('restaurant');

    useEffect(() => {
        if (defaultValues.catering) {
            setLastClickedRestaurantId(defaultValues.catering.id);
            setActiveRestaurant(defaultValues.catering.id);
            setValue('restaurant', defaultValues.catering);
        }
    }, [defaultValues.catering, setLastClickedRestaurantId, setActiveRestaurant, setValue]);

    const handleRestaurantClick = (restaurant: Catering) => {
        setLastClickedRestaurantId(restaurant.id);
        setActiveRestaurant(restaurant.id);
        setValue('restaurant', restaurant);
    };

    const handleCopyData = () => {
        const text = `Логин: ${formValues.login}\nПароль: ${formValues.password}\nРесторан: ${formValues.restaurant.name}. ${formValues.restaurant.address}`;

        navigator.clipboard.writeText(text).then(() => {
            onCopied?.();
        });
    };

    const processSubmit = (data: FieldValues) => {
        onSubmit(data);
        handleCopyData();
    };

    return (
        <Form name="form-administrators" onSubmit={handleSubmit(processSubmit)}>
            <FormInputs>
                <Input type="text" name="login" placeholder={t('pages.administrators.placeholderLogin')} nameLabel={t('pages.administrators.nameLabelLogin')} register={register} errors={errors} pattern={regexClientName} value={defaultValues.login}></Input>
                <InputPassword name="password" nameLabel={t('pages.administrators.nameLabelPassword')} register={register} errors={errors} required></InputPassword>

                <div className={styles['restaurant__container']}>
                    <p className={styles['restaurant__title']}>{t('pages.administrators.chooseAnRestaurant')}</p>
                    <input type="hidden" {...register('restaurant')} />
                    <ul className={styles['restaurant__list']}>
                        {emptyCaterings.map((catering) => (
                            <li
                                key={catering.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRestaurantClick(catering);
                                }}
                            >
                                <RestaurantCardCompact card={catering} isTheOnlyOne={emptyCaterings.length === 1} isActive={catering.id === selectedRestaurant?.id} />
                            </li>
                        ))}
                    </ul>
                </div>
            </FormInputs>
            <p className={styles['form__info_title']}>{t('pages.administrators.copyInvitationText')}</p>
            <Button type="submit" disabled={isLoading}>
                {t('pages.administrators.buttonSaveAndCopy')}
            </Button>
            {renderDeleteButton}
        </Form>
    );
};

export default AdministratorForm;
