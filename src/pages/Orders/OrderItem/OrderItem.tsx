import { FC } from 'react';
import styles from './OrderItem.module.scss';
import { useTranslation } from 'react-i18next';
import { MealChoice, UserOrder, UserOrderMeal } from '../../../utils/api/orderService/orderService';
import { formatDateTime } from '../../../utils/serviceFuncs/formatDateTime';

type OrderItemProps = {
    order: UserOrder;
    onClickFeedback: () => void;
    showDetails: () => void;
    isShow: boolean;
};

const Choices: FC<{ choices: MealChoice[] }> = ({ choices }) => {
    return (
        <ul className={styles['choices']}>
            {choices.map((choice) => (
                <li key={choice.id}>
                    <p className={styles['choices__name']}>• {choice.name}</p>
                </li>
            ))}
        </ul>
    );
};

const OrderMeal: FC<{ meal: UserOrderMeal }> = ({ meal }) => {
    if (!meal || !meal) return null;
    return (
        <li className={styles['meal']}>
            <div className={styles['meal__info']}>
                <p className={styles['meal__name']}>
                    {meal.name}
                    <span className={styles['meal__count']}>x{meal.count}</span>
                </p>
                <p className={`${styles['meal__price']} ${meal.is_available ? '' : styles['meal__price_unavailable']}`}>
                    {meal.price} <span>₸</span>
                </p>
            </div>
            <Choices choices={meal.choices} />
            {meal.is_available ? null : (
                <div className={styles['meal__unavailable']}>
                    <p className={styles['meal__unavailable_text']}>недоступно</p>
                </div>
            )}
        </li>
    );
};

const OrderItem: FC<OrderItemProps> = ({ order, onClickFeedback, showDetails, isShow }) => {
    const { t } = useTranslation();
    const getStatusColor = (status: string) => {
        if (['ready', 'completed'].includes(status)) return 'green';
        if (['unclaimed', 'cancelled_by_user', 'cancelled_by_admin', 'cancelled_by_timeout'].includes(status)) return 'red';
        return 'orange';
    };

    return (
        <div className={styles['card']}>
            <div className={styles['restaurant__container']}>
                <div className={styles['restaurant__image']} style={{ backgroundImage: `url(${order.restaurant.photo})` }} />
                <div className={styles['restaurant__description']}>
                    <div className={styles['restaurant__title_container']}>
                        <p className={styles['restaurant__title']}>{order.restaurant.name}</p>
                        <p className={styles['restaurant__rating']}>{order.restaurant.rating}</p>
                        <div className={`${styles['restaurant__icon']} ${styles['restaurant__icon_star']} ${styles['restaurant__icon_large']}`} />
                    </div>
                    <div className={styles['restaurant__feature']}>
                        <div className={`${styles['restaurant__icon']} ${styles['restaurant__icon_placemark']} ${styles['restaurant__icon_small']}`} />
                        <p className={styles['restaurant__feature_title']}>{order.restaurant.address}</p>
                    </div>
                </div>
            </div>

            <div className={styles['card__container_info']}>
                <div className={styles['card__code']}>
                    <p className={styles['card__code_text']}># {order.order_code}</p>
                    <p className={styles['card__date_text']}>{formatDateTime(order.created_at)}</p>
                </div>
                <p className={`${styles['card__status']} ${styles[`card__status--${getStatusColor(order.status)}`]}`}>{t(`pages.order.${order.status}`)}</p>
            </div>
            {order.status === 'accepted' && order.waiting_time ? (
                <div>
                    {t('pages.order.waitingTime')} {order.waiting_time}
                </div>
            ) : null}
            {!order.rating && order.status === 'completed' ? (
                <button className={styles['card__button-feedback']} onClick={onClickFeedback}>
                    {t('pages.order.feedback')}
                </button>
            ) : null}
            {order.rating ? (
                <div className={styles['card__rating-feedback']}>
                    {t('pages.order.assignedRating')} {order.rating}
                </div>
            ) : null}
            <p className={styles['card__title']}>Состав заказа</p>
            <article className={styles['order-item']}>
                <ul className={styles['order-item__list']}>
                    {order.meals.map((meal) => (
                        <OrderMeal meal={meal} key={meal.id} />
                    ))}
                </ul>
            </article>

            <div className={styles['card__button-container']}>
                <div className={styles['order-item__amount']}>
                    <h3 className={styles['order-item__title']}>
                        {order.amount}
                        <span>₸</span>
                    </h3>
                </div>
                <button onClick={showDetails} className={styles['card__button-info']}>
                    {isShow ? 'скрыть ⬆' : 'подробнее ⬇'}
                </button>
            </div>

            {isShow && (
                <div className={styles['detail-info']}>
                    <p className={styles['card__title']}>Информация о заказе</p>
                    <div className={styles['detail-info__contant']}>
                        {order.canceled_at ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.dateOfCanceled')}</p>
                                <p className={styles['detail-info__text']}>{formatDateTime(order.canceled_at)}</p>
                            </div>
                        ) : null}
                        {order.cancellation_reason ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.cancellationReason')}</p>
                                <p className={styles['detail-info__text']}>{order.cancellation_reason}</p>
                            </div>
                        ) : null}
                        {order.issued_at ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.dateOfIssue')}</p>
                                <p className={styles['detail-info__text']}>{formatDateTime(order.issued_at)}</p>
                            </div>
                        ) : null}
                        <div className={styles['detail-info__container']}>
                            <p className={styles['detail-info__title']}>{t('pages.order.currency')}</p>
                            <p className={styles['detail-info__text']}>{order.currency}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderItem;
