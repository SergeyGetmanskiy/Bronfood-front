import styles from './TypeStep.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { VenueType } from '../../../../../utils/api/cateringService/cateringService';

type TypeStepProps = {
    types: VenueType[];
};

const TypeStep = ({ types }: TypeStepProps) => {
    const { t } = useTranslation();
    const { setValue, watch } = useFormContext();
    const [currentTag, setCurrentTag] = useState('');

    const selectedType = watch('type');
    const tags: string[] = watch('tags') || [];

    const handleTypeChange = (type: VenueType) => {
        setValue('type', type, { shouldValidate: true });
    };

    const handleAddTag = (tag: string) => {
        const newTags = [...tags, tag];
        setValue('tags', newTags, { shouldValidate: true });
    };

    const handleDeleteTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setValue('tags', newTags, { shouldValidate: true });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = currentTag.trim();
            if (value) {
                handleAddTag(value);
                setCurrentTag('');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTag(e.target.value);
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
            <div className={styles.tags}>
                <label className={styles.tags__title}>{t('pages.cateringManagement.nameLabelTags')}</label>
                <div className={styles.tags__container}>
                    <ul className={styles.tags__list}>
                        {tags.map((tag, index) => {
                            return (
                                <li key={index}>
                                    <div className={styles.tag__container}>
                                        <p className={styles.tag__text}>{tag}</p>
                                        <button className={styles.tag__button} type="button" onClick={() => handleDeleteTag(index)}></button>
                                    </div>
                                </li>
                            );
                        })}
                        <input className={styles.tags__input} type="text" placeholder={t('pages.cateringManagement.placeholderTags')} value={currentTag} onKeyDown={handleKeyDown} onChange={handleChange} />
                    </ul>
                </div>
            </div>
        </fieldset>
    );
};

export default TypeStep;
