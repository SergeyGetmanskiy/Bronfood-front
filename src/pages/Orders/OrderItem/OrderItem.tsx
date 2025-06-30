import { FC } from 'react';
import styles from './OrderItem.module.scss';
import { useTranslation } from 'react-i18next';
import { MealChoice, UserOrder, UserOrderMeal } from '../../../utils/api/orderService/orderService';

type OrderItemProps = {
    order: UserOrder;
    onClickFeedback: () => void;
    showDetails: () => void;
    isShow: boolean;
};

export const Choices: FC<{ choices: MealChoice[] }> = ({ choices }) => {
    return (
        <ul className={styles['choices']}>
            {choices.map((choice) => (
                <li key={choice.choice.id}>
                    <p className={styles['choices__name']}>{choice.choice.name}</p>
                </li>
            ))}
        </ul>
    );
};

export const OrderMeal: FC<{ meal: UserOrderMeal }> = ({ meal }) => {
    return (
        <div className={styles['meal']}>
            <div className={styles['meal__info']}>
                <p className={styles['meal__name']}>
                    {meal.meal.name}
                    <span className={styles['meal__count']}>x{meal.count}</span>
                </p>
                <p className={styles['meal__price']}>{meal.meal.price}</p>
            </div>
            <Choices choices={meal.choices} />
        </div>
    );
};

const OrderItem: FC<OrderItemProps> = ({ order, onClickFeedback, showDetails, isShow }) => {
    const { t } = useTranslation();

    return (
        <div className={styles['card']}>
            <div className={styles['restaurant__container']}>
                <div className={styles['restaurant__image']} style={{ backgroundImage: `url(${order.restaurant?.photo})` }} />
                <div className={styles['restaurant__description']}>
                    <p className={styles['restaurant__name']}>{order.restaurant?.name}</p>
                    <div className={styles['restaurant__feature']}>
                        <div className={`${styles['restaurant__icon']} ${styles['restaurant__icon_placemark']} ${styles['restaurant__icon_small']}`} />
                        <p className={styles['restaurant__feature_title']}>{order.restaurant?.address}</p>
                    </div>
                </div>
            </div>

            <div>
                {order.order_code} от {order.created_at}
            </div>
            {order.waiting_time ? (
                <div>
                    {t('pages.order.waitingTime')} {order.waiting_time}
                </div>
            ) : null}
            <p>статус: {order.status}</p>

            <div className={styles['card__button']}>
                <button onClick={showDetails} className={`${styles['card__button-container']} ${isShow ? styles['card__show-button'] : styles['card__hide-button']}`}>
                    {isShow ? 'скрыть подробности' : 'подробнее'}
                </button>
            </div>

            {isShow && (
                <>
                    {order.canceled_at ? (
                        <div>
                            {t('pages.order.dateOfCanceled')} {order.canceled_at}
                        </div>
                    ) : null}
                    {order.cancellation_reason ? (
                        <div>
                            {t('pages.order.cancellationReason')} {order.cancellation_reason}
                        </div>
                    ) : null}
                    {order.issued_at ? (
                        <div>
                            {t('pages.order.dateOfIssue')} {order.issued_at}
                        </div>
                    ) : null}
                    {order.rating ? (
                        <div>
                            {t('pages.order.assignedRating')} {order.rating}
                        </div>
                    ) : null}
                    <article className={styles['order-item']}>
                        <ul className={styles['order-item__list']}>
                            {order.meals.map((meal) => (
                                <OrderMeal meal={meal} key={meal.meal.id} />
                            ))}
                        </ul>
                        <div className={styles['order-item__amount']}>
                            <h3 className={styles['order-item__title']}>Итого: </h3>
                            <h3 className={styles['order-item__title']}>{order.amount}</h3>
                            <h3 className={styles['order-item__title']}>{order.currency}</h3>
                        </div>
                    </article>
                    {order.rating ? null : (
                        <div className={styles['button']}>
                            <button className={styles['button__feedback']} onClick={onClickFeedback}>
                                {t('pages.order.feedback')}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OrderItem;
