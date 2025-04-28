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
import { emptyRestaurants } from '../../../../utils/api/cateringService/MockCateringService';
import { useEffect } from 'react';
import { Restaurant } from '../../../../utils/api/restaurantsService/restaurantsService';
import styles from './AdministratorForm.module.scss';

type AdministratorFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    isLoading?: boolean;
    defaultValues?: {
        login: string;
        password: string;
        restaurant: Restaurant;
    };
    onCopied?: () => void;
    renderDeleteButton?: React.ReactNode;
};

const AdministratorForm = ({ onSubmit, isLoading, defaultValues = { login: '', password: '', restaurant: emptyRestaurants[0] }, onCopied, renderDeleteButton }: AdministratorFormProps) => {
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
        if (defaultValues.restaurant) {
            setLastClickedRestaurantId(defaultValues.restaurant.id);
            setActiveRestaurant(defaultValues.restaurant.id);
            setValue('restaurant', defaultValues.restaurant);
        }
    }, [defaultValues.restaurant, setLastClickedRestaurantId, setActiveRestaurant, setValue]);

    const handleRestaurantClick = (restaurant: Restaurant) => {
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
                        {emptyRestaurants.map((restaurant) => (
                            <li
                                key={restaurant.id}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleRestaurantClick(restaurant);
                                }}
                            >
                                <RestaurantCardCompact card={restaurant} isTheOnlyOne={emptyRestaurants.length === 1} isActive={restaurant.id === selectedRestaurant?.id} />
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
