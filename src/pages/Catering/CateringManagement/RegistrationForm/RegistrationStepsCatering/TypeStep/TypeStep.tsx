import { VenueType } from '../../../../../../contexts/RestaurantsContext';
import styles from './TypeStep.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type TypeStepProps = {
    selectedType: string;
    onTypeChange: (type: string) => void;
    types: VenueType[];
    tags: string[];
    onAddTag: (tag: string) => void;
    onDeleteTag: (index: number) => void;
};

const TypeStep = ({ selectedType, onTypeChange, types, tags, onAddTag, onDeleteTag }: TypeStepProps) => {
    const { t } = useTranslation();

    const [currentTag, setCurrentTag] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = currentTag.trim();
            if (value) {
                onAddTag(value);
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
                        const isSelected = selectedType === type.name;
                        return (
                            <li key={type.id}>
                                <label className={styles.type__container}>
                                    <input className={styles.type__input} type="radio" checked={isSelected} onChange={() => onTypeChange(type.name)} />
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
                                        <button className={styles.tag__button} type="button" onClick={() => onDeleteTag(index)}></button>
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
