import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Form from '../../../../components/Form/Form';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import InputPassword from '../../../../components/InputPassword/InputPassword';
import FormInputs from '../../../../components/FormInputs/FormInputs';
import { regexClientName } from '../../../../utils/consts';

type AdministratorFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    isLoading?: boolean;
    defaultValues?: {
        login: string;
        password: string;
    };
    renderDeleteButton?: React.ReactNode;
    renderCopyButton?: React.ReactNode;
};

const AdministratorForm = ({ onSubmit, isLoading, defaultValues = { login: '', password: '' }, renderDeleteButton, renderCopyButton }: AdministratorFormProps) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({ defaultValues });

    return (
        <Form name="form-administrators" onSubmit={handleSubmit(onSubmit)}>
            <FormInputs>
                <Input type="text" name="login" placeholder={t('pages.administrators.placeholderLogin')} nameLabel={t('pages.administrators.nameLabelLogin')} register={register} errors={errors} pattern={regexClientName} value={defaultValues?.login}></Input>
                <InputPassword name="password" nameLabel={t('pages.administrators.nameLabelPassword')} register={register} errors={errors} required></InputPassword>
            </FormInputs>
            {renderCopyButton}
            <Button type="submit" disabled={isLoading}>
                {t('pages.administrators.buttonForm')}
            </Button>
            {renderDeleteButton}
        </Form>
    );
};

export default AdministratorForm;
