import FormInputs from '../../../../../../components/FormInputs/FormInputs';
import Input from '../../../../../../components/Input/Input';
import styles from './MediaStep.module.scss';
import { useTranslation } from 'react-i18next';
import { regexNumber } from '../../../../../../utils/consts';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type MediaStepProps = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    values: FieldValues;
};

const MediaStep = ({ register, errors, values }: MediaStepProps) => {
    const { t } = useTranslation();
    return (
        <fieldset className={styles.fieldset}>
            <FormInputs>
                <label>{t('pages.cateringManagement.timeToCancelAnOrder')}</label>
                <Input type="text" name="timeToCancel" placeholder={t('pages.cateringManagement.placeholderTimeToCancel')} nameLabel={t('pages.cateringManagement.nameLabelTimeToCancel')} register={register} errors={errors} pattern={regexNumber} value={values.cancellationDeadlineMinutes} />
            </FormInputs>
        </fieldset>
    );
};

export default MediaStep;
