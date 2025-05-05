import { VenueType } from '../../../../../../contexts/RestaurantsContext';
import styles from './TypeStep.module.scss';
import { useTranslation } from 'react-i18next';

type TypeStepProps = {
    selectedType: string;
    onTypeChange: (type: string) => void;
    types: VenueType[];
};

const TypeStep = ({ selectedType, onTypeChange, types }: TypeStepProps) => {
    const { t } = useTranslation();

    return (
        <fieldset className={styles.fieldset}>
            <label className={styles.fieldset__name}>{t('pages.cateringManagement.chooseTypeOfVenue')}</label>
            <ul className={styles.fieldset__types}>
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
        </fieldset>
    );
};

export default TypeStep;
