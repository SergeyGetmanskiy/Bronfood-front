import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import FormInputs from '../../../../../../components/FormInputs/FormInputs';
import Input from '../../../../../../components/Input/Input';
import styles from './LocationStep.module.scss';
import { useTranslation } from 'react-i18next';
import { regexAddress, regexClientName } from '../../../../../../utils/consts';
import Textarea from '../../../../../../components/Textarea/Textarea';

type LocationStepProps = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    values: FieldValues;
};

const LocationStep = ({ register, errors, values }: LocationStepProps) => {
    const { t } = useTranslation();
    return (
        <fieldset className={styles.fieldset}>
            <FormInputs>
                <Input type="text" name="name" placeholder={t('pages.cateringManagement.placeholderName')} nameLabel={t('pages.cateringManagement.nameLabelName')} register={register} errors={errors} pattern={regexClientName} value={values.name} />
                <Input type="text" name="address" placeholder={t('pages.cateringManagement.placeholderAdress')} nameLabel={t('pages.cateringManagement.nameLabelAdress')} register={register} errors={errors} pattern={regexAddress} value={values.address} />
                <Textarea name="description" placeholder={t('pages.cateringManagement.placeholderDescription')} nameLabel={t('pages.cateringManagement.nameLabelDescription')} details={t('pages.cateringManagement.nameLabelDetails')} register={register} errors={errors} pattern={regexClientName} value={values.description} />
            </FormInputs>
        </fieldset>
    );
};

export default LocationStep;
