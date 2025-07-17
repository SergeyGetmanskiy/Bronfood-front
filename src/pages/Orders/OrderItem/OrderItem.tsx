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
            {choices.map((choice, index) => (
                <li key={index}>
                    <p className={styles['choices__name']}>• {choice.name}</p>
                </li>
            ))}
        </ul>
    );
};

const OrderMeal: FC<{ meal: UserOrderMeal }> = ({ meal }) => {
    const { t } = useTranslation();
    return (
        <li className={`${meal.is_available ? styles['meal'] : styles['meal-unavailable']}`}>
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
                <>
                    <div className={styles['meal__unavailable-wrapper']}></div>
                    <div className={styles['meal__unavailable']}>
                        <p className={styles['meal__unavailable_text']}>{t('pages.order.mealUnavailable')}</p>
                    </div>
                </>
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
        <li className={styles['card']}>
            <div className={styles['restaurant']}>
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

            <div className={styles['card__container-info']}>
                <div className={styles['card__code']}>
                    <p className={styles['card__code_text']}># {order.order_code}</p>
                    <p className={styles['card__date_text']}>{formatDateTime(order.created_at)}</p>
                </div>
                <p className={`${styles['card__status']} ${styles[`card__status--${getStatusColor(order.status)}`]}`}>{t(`pages.order.${order.status}`)}</p>
            </div>

            {order.status === 'accepted' && order.waiting_time ? (
                <div className={`${styles['waiting-time']}`}>
                    <p className={`${styles['waiting-time_title']}`}>{t('pages.order.waitingTime')}</p>
                    <div className={`${styles['waiting-time_container']}`}>
                        <div className={`${styles['waiting-time_image']}`}></div>
                        <p className={`${styles['waiting-time_text']}`}>{order.waiting_time}</p>
                    </div>
                </div>
            ) : null}

            {order.status === 'created' && order.payment_url !== null ? (
                <div className={`${styles['payment']}`}>
                    <p className={`${styles['payment_title']}`}>{t('pages.order.paymentLink')}</p>
                    <a href={order.payment_url} target="_blank" className={`${styles['payment_link']}`}>
                        <div className={`${styles['payment_image']}`}></div>
                        <p className={`${styles['payment_text']}`}>{t('pages.order.proceedToPayment')}</p>
                    </a>
                </div>
            ) : null}

            {!order.rating && order.status === 'completed' ? (
                <div className={`${styles['feedback']}`}>
                    <p className={`${styles['feedback_title']}`}>{t('pages.order.howDoYouLikeTheOrder')}</p>
                    <div className={`${styles['feedback_container']}`} onClick={onClickFeedback}>
                        <div className={`${styles['feedback_image']}`}></div>
                        <p className={`${styles['feedback_text']}`}>{t('pages.order.feedback')}</p>
                    </div>
                </div>
            ) : null}

            {order.rating ? (
                <div className={`${styles['rating']}`}>
                    <p className={`${styles['rating__title']}`}>{t('pages.order.assignedRating')}</p>
                    <div className={`${styles['rating__container']}`}>
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className={`${styles['rating__image']} ${index < order.rating! ? styles['rating__image_orange'] : styles['rating__image_gray']}`}></div>
                        ))}
                    </div>
                </div>
            ) : null}

            <p className={styles['card__title']}>Состав заказа</p>

            <article className={styles['order-item']}>
                <ul className={styles['order-item__list']}>
                    {order.meals.map((meal, index) => (
                        <OrderMeal meal={meal} key={index} />
                    ))}
                </ul>
            </article>

            <div className={styles['card__amount-container']}>
                <div className={styles['order-item__amount']}>
                    <p className={styles['order-item__title']}>
                        {order.amount}
                        <span>₸</span>
                    </p>
                </div>
                {order.status !== 'created' && (
                    <button onClick={showDetails} className={styles['card__button-info']}>
                        {isShow ? (
                            <div className={styles['card__button-container']}>
                                <p className={styles['card__button-container_text']}>{t('pages.order.buttonHide')}</p>
                                <div className={styles['card__button-container_image-hide']}></div>
                            </div>
                        ) : (
                            <div className={styles['card__button-container']}>
                                <p className={styles['card__button-container_text']}>{t('pages.order.buttonShow')}</p>
                                <div className={styles['card__button-container_image-show']}></div>
                            </div>
                        )}
                    </button>
                )}
            </div>

            {isShow && order.status !== 'created' && (
                <div className={styles['detail-info']}>
                    <p className={styles['card__title']}>{t('pages.order.titleOrderInfo')}</p>
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
                        {order.paid_at ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.paidFor')}</p>
                                <p className={styles['detail-info__text']}>{formatDateTime(order.paid_at)}</p>
                            </div>
                        ) : null}
                        {order.issued_at ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.dateOfIssue')}</p>
                                <p className={styles['detail-info__text']}>{formatDateTime(order.issued_at)}</p>
                            </div>
                        ) : null}
                        {order.status !== 'created' && order.currency ? (
                            <div className={styles['detail-info__container']}>
                                <p className={styles['detail-info__title']}>{t('pages.order.currency')}</p>
                                <p className={styles['detail-info__text']}>{order.currency}</p>
                            </div>
                        ) : null}
                    </div>

                    {!order.is_order_repeatable ? <div className={styles['detail-info__not-repeat']}>{t('pages.order.notRepeatOrder')}</div> : <button className={styles['detail-info__repeat']}>{t('pages.order.buttonRepeatOrder')}</button>}
                </div>
            )}
        </li>
    );
};

export default OrderItem;
