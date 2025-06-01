import styles from './TypeStep.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { VenueType } from '../../../../../utils/api/cateringService/cateringService';
import InputTag from '../../../../../components/InputTag/InputTag';

type TypeStepProps = {
    types: VenueType[];
};

const TypeStep = ({ types }: TypeStepProps) => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();
    const [currentTag, setCurrentTag] = useState('');

    const selectedType = watch('type');
    const tags: { name: string }[] = watch('tags') || [];

    const handleTypeChange = (type: VenueType) => {
        setValue('type', type, { shouldValidate: true });
    };

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
            <div className={styles.types}>
                <label className={styles.types__title}>{t('pages.cateringManagement.chooseTypeOfVenue')}</label>
                <ul className={styles.types__list}>
                    {types.map((type) => {
                        const isSelected = selectedType.type === type.type;
                        return (
                            <li key={type.type}>
                                <label className={styles.type__container}>
                                    <input className={styles.type__input} type="radio" checked={isSelected} onChange={() => handleTypeChange(type)} />
                                    <span className={`${styles.type__text} ${isSelected ? styles.type__text_active : ''}`}>{t(`pages.cateringManagement.${type.name}`)}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <InputTag tags={tags} onDelete={handleDeleteTag} onAdd={handleAddTag} onChange={handleTagChange} nameLabel={t('pages.cateringManagement.nameLabelTags')} placeholder={t('pages.cateringManagement.placeholderTags')} value={currentTag} />
        </fieldset>
    );
};

export default TypeStep;
