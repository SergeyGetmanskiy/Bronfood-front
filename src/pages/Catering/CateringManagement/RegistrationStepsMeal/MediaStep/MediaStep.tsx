import { useState } from 'react';
import InputImage from '../../../../../components/InputImage/InputImage';
import styles from './MediaStep.module.scss';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import Input from '../../../../../components/Input/Input';
import { regexClientName, regexNumber } from '../../../../../utils/consts';
import FormInputs from '../../../../../components/FormInputs/FormInputs';

const MediaStep = () => {
    const { t } = useTranslation();

    const {
        register,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext();

    const values = watch();

    const [previewImage, setPreviewImage] = useState<string | null>(values.photo || null);

    const handleImageUpload = (image: string | null) => {
        setPreviewImage(image);
        setValue('photo', image || '', { shouldValidate: true });
    };
    return (
        <fieldset className={styles.fieldset}>
            <FormInputs>
                <InputImage nameLabel={t('pages.cateringManagement.nameLabelPhotoMeal')} name="photo" register={register} errors={errors} onChange={handleImageUpload} previewImage={previewImage} />
                <Input type="text" nameLabel={t('pages.cateringManagement.nameLabelName')} placeholder={t('pages.cateringManagement.placeholderNameMeal')} name="name" register={register} errors={errors} pattern={regexClientName} value={values.name} />
                <Input type="number" nameLabel={t('pages.cateringManagement.nameLabelPrice')} placeholder={t('pages.cateringManagement.placeholderPrice')} name="price" register={register} errors={errors} pattern={regexNumber} value={values.price} />
            </FormInputs>
        </fieldset>
    );
};

export default MediaStep;
