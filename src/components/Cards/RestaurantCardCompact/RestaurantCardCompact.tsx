import { Restaurant } from '../../../utils/api/restaurantsService/restaurantsService';
import styles from './RestaurantCardCompact.module.scss';

function RestaurantCardCompact({ card, isTheOnlyOne, isActive }: { card: Restaurant; isTheOnlyOne: boolean; isActive: boolean }) {
    return (
        <div className={`${styles.card} ${isTheOnlyOne || isActive ? styles.card__active : ''}`}>
            <div className={styles.card__container}>
                <div>
                    <div className={styles.card__image} style={{ backgroundImage: `url(${card.photo})` }} />
                </div>
                <div className={styles.card__description}>
                    <p className={styles.card__title}>{card.name}</p>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_placemark} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.address}</p>
                    </div>
                    <div className={styles.card__feature}>
                        <div className={`${styles.card__icon} ${styles.card__icon_clock} ${styles.card__icon_small}`} />
                        <p className={styles.card__feature_title}>{card.workingTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCardCompact;
