import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../../components/Popups/Popup/Popup';
import { useCreateAdministrator } from '../../../../utils/hooks/useAdministrators/useAdministrators';
import Preloader from '../../../../components/Preloader/Preloader';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { regexClientName } from '../../../../utils/consts';
import Form from '../../../../components/Form/Form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import InputPassword from '../../../../components/InputPassword/InputPassword';
import FormInputs from '../../../../components/FormInputs/FormInputs';

const AddAdministrator = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutateAsync, isPending, error } = useCreateAdministrator();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await mutateAsync({
            login: data.login,
            password: data.password,
        });
        navigate('/catering/administrators');
    };

    const onClose = () => {
        navigate('/');
    };

    return (
        <Popup title={t('pages.administrators.titleCreate')} arrowBack onClose={onClose}>
            {isPending && <Preloader />}
            {error && <ErrorMessage message={error.message} />}
            <Form name="form-add-administrators" onSubmit={handleSubmit(onSubmit)}>
                <FormInputs>
                    <Input type="text" name="login" placeholder={t('pages.administrators.placeholderLogin')} nameLabel={t('pages.administrators.nameLabelLogin')} register={register} errors={errors} pattern={regexClientName}></Input>
                    <InputPassword name="password" nameLabel={t('pages.administrators.nameLabelPassword')} register={register} errors={errors}></InputPassword>
                </FormInputs>
                <Button type="submit">{t('pages.administrators.buttonForm')}</Button>
            </Form>
        </Popup>
    );
};

export default AddAdministrator;
