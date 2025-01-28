import { useTranslation } from 'react-i18next';
import { Review as ReviewType } from '../../../../utils/api/restaurantsService/restaurantsService';
import styles from './Reviews.module.scss';

function Review({ review }: { review: ReviewType }) {
    return (
        <div className={styles.review}>
            <div className={styles.review__heading}>
                <h3 className={styles.review__heading_client}>Ирина</h3>
                <p className={styles.review__heading_ago}>
                    4 дня назад
                    <span className={styles.review__heading_rating}>{review.rating}</span>
                </p>
                <div className={styles.review__heading_icon} />
            </div>
            <p className={styles.review__comment}>{review.comment}</p>
        </div>
    );
}

function Reviews({ reviews }: { reviews: ReviewType[] }) {
    const { t } = useTranslation();

    return (
        <div className={styles.reviews__container}>
            <h4 className={styles.reviews__title}>{t('pages.restaurant.reviews')}</h4>
            <ul className={`${styles.reviews} bronfood-scrollbar `}>
                {reviews.map((review, index) => (
                    <li key={`${review.rating}-${index}`}>
                        <Review review={review} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Reviews;
