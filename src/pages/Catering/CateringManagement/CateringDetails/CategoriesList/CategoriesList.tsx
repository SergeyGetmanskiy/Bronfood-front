import { mealTypes as types } from '../../../../../utils/consts';
import styles from './CategoriesList.module.scss';
import { useTranslation } from 'react-i18next';

const CategoriesList = () => {
    const { t } = useTranslation();
    return (
        <ul className={styles.types}>
            {types.map((type, index) => {
                return (
                    <li key={`${type}-${index}`} className={styles.type}>
                        <div className={styles.type__image}></div>
                        <p className={styles.type__name}>{t(`pages.restaurant.${type}`)}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default CategoriesList;
