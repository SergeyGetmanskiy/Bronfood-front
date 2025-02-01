import styles from './BasketEmpty.module.scss';
import { useTranslation } from 'react-i18next';

function BasketEmpty() {
    const { t } = useTranslation();
    return (
        <div className={styles['basket-empty']}>
            <h1 className={styles['basket-empty__name']}>{t(`pages.basket.basketEmpty`)}</h1>
            <div className={styles['basket-empty__image']} />
        </div>
    );
}

export default BasketEmpty;
