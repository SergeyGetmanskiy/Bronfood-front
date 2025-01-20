import styles from './RestaurantDescription.module.scss';

type RestaurantDescriptionProps = {
    name: string;
    address: string;
    workingTime: string;
    rating: number;
    reviews: string;
};

function RestaurantDescription({ name, address, workingTime, rating, reviews }: RestaurantDescriptionProps) {
    return (
        <div className={styles.restaurant - description}>
            <h1 className={styles.restaurant - description__name}>{name}</h1>
            <div className={styles.restaurant - description__features}>
                <div className={styles.restaurant - description__feature}>
                    <div className={`${styles.restaurant - description__icon} ${styles.restaurant - description__icon_placemark} ${styles.restaurant - description__icon_small}`} />
                    <p className={styles.restaurant - description__feature_title}>{address}</p>
                </div>
                <div className={styles.restaurant - description__feature}>
                    <div className={`${styles.restaurant - description__icon} ${styles.restaurant - description__icon_clock} ${styles.restaurant - description__icon_small}`} />
                    <p className={styles.restaurant - description__feature_title}>{workingTime}</p>
                </div>
            </div>
            <div className={styles.restaurant - description__rating_container}>
                <span className={styles.restaurant - description__rating}>{rating}</span>
                <div className={`${styles.restaurant - description__icon} ${styles.restaurant - description__icon_star} ${styles.restaurant - description__icon_large}`} />
                <span className={styles.restaurant - description__reviews}>{reviews}</span>
            </div>
        </div>
    );
}

export default RestaurantDescription;
