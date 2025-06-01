import { useFormContext } from 'react-hook-form';
import Textarea from '../../../../../components/Textarea/Textarea';
import styles from './DetailsStep.module.scss';
import { useTranslation } from 'react-i18next';
import { regexClientName } from '../../../../../utils/consts';
import InputTag from '../../../../../components/InputTag/InputTag';
import { useState } from 'react';

const DetailsStep = () => {
    const { t } = useTranslation();
    const [currentTag, setCurrentTag] = useState('');

    const {
        setValue,
        register,
        formState: { errors },
        watch,
    } = useFormContext();

    const values = watch();
    const tags: { name: string }[] = watch('tags') || [];

    const handleAddTag = (tag: string) => {
        const newTags = [...tags, { name: tag }];
        setValue('tags', newTags, { shouldValidate: true });
        setCurrentTag('');
    };

    const handleDeleteTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setValue('tags', newTags, { shouldValidate: true });
    };

    const handleTagChange = (tag: string) => {
        setCurrentTag(tag);
    };

    return (
        <fieldset className={styles.fieldset}>
            <Textarea name="description" placeholder={t('pages.cateringManagement.placeholderDescription')} nameLabel={t('pages.cateringManagement.nameLabelDescription')} details={t('pages.cateringManagement.nameLabelDetails')} register={register} errors={errors} pattern={regexClientName} value={values.description} />
            <InputTag tags={tags} onDelete={handleDeleteTag} onAdd={handleAddTag} onChange={handleTagChange} nameLabel={t('pages.cateringManagement.nameLabelTagsMeal')} placeholder={t('pages.cateringManagement.placeholderTags')} value={currentTag} />
        </fieldset>
    );
};

export default DetailsStep;
