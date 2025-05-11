import Input from '../../../../../../components/Input/Input';
import styles from './MediaStep.module.scss';
import { useTranslation } from 'react-i18next';
import { regexNumber } from '../../../../../../utils/consts';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useRef } from 'react';
import ButtonIconRound from '../../../../../../components/ButtonIconRound/ButtonIconRound';

type MediaStepProps = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    values: FieldValues;
    previewImage?: string | null;
    onImageChange: (image: string) => void;
};

const MediaStep = ({ register, errors, values, previewImage, onImageChange }: MediaStepProps) => {
    const { t } = useTranslation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target?.result as string;
            onImageChange(base64String);
        };
        reader.readAsDataURL(file);
    };

    return (
        <fieldset className={styles.fieldset}>
            <div className={styles.photo}>
                <label>{t('pages.cateringManagement.nameLabelPhoto')}</label>
                <input className={styles.photo__input} type="file" onChange={handleInputChange} accept="image/*" ref={fileInputRef} />

                {previewImage ? (
                    <div className={styles.photo__image} style={{ backgroundImage: `url(${previewImage})` }}>
                        <div className={styles.photo__image_edit}>
                            <ButtonIconRound icon="edit" onClick={triggerFileInput} />
                        </div>
                    </div>
                ) : (
                    <div className={styles.photo__upload} onClick={triggerFileInput}>
                        <div className={styles.photo__upload_wrapper}>
                            <button className={styles.photo__upload_add}></button>
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.schedule}>
                <label>{t('pages.cateringManagement.nameLabelWorkingTime')}</label>
            </div>
            <div className={styles.cancel}>
                <label>{t('pages.cateringManagement.timeToCancelAnOrder')}</label>
                <Input type="text" name="timeToCancel" placeholder={t('pages.cateringManagement.placeholderTimeToCancel')} nameLabel={t('pages.cateringManagement.nameLabelTimeToCancel')} register={register} errors={errors} pattern={regexNumber} value={values.cancellationDeadlineMinutes} />
            </div>
        </fieldset>
    );
};

export default MediaStep;
