import { useTranslation } from 'react-i18next';
import styles from './BasketTotal.module.scss';
import Button from '../../../components/Button/Button';

function BasketTotal({ sum }: {sum: number}) {
    const { t } = useTranslation();
    return (
        <div className={styles.basket_total}>
            <div className={styles.basket_total__title}>
                <p className={styles.basket_total__text}>{t(`pages.basket.total`)}</p>
                <span className={styles.basket_total__sum}>{`${sum} ₸`}</span>
            </div>
            <div className={styles.basket_total__button}>
                <Button>{t(`pages.basket.pay`)}</Button>
            </div>
        </div>
    );
}

export default BasketTotal;
