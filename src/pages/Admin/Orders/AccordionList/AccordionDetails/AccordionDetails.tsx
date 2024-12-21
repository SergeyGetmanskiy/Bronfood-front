import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import { MealInBasket } from '../../../../../utils/api/basketService/basketService';
import { Choice, Meal as MealInterface } from '../../../../../utils/api/restaurantsService/restaurantsService';
import ButtonGrey from '../../../../../components/ButtonGrey/ButtonGrey';

function Meal({ meal, count, choices }: { meal: MealInterface; count: number; choices: Choice[] }) {
    return (
        <li className={styles.details__meal}>
            <p className={styles.details__meal_name}>
                {meal.name}
                {choices &&
                    choices.map((choice, index) => {
                        return (
                            <span key={`${choice.name}-${index}`} className={styles.details__meal_feature}>
                                {choice.name}
                            </span>
                        );
                    })}
            </p>
            {count > 1 ? <span className={styles.details__meal_count}>{`(${count})`}</span> : null}
            <span className={styles.details__meal_price}>{`${meal.price} ₸`}</span>
        </li>
    );
}

function OrderNotAcceptedDetails({ price }: { price: number }) {
    const { t } = useTranslation();
    return (
        <>
            <div className={styles.details__total}>
                <p>{t('pages.admin.total')}</p>
                <span className={styles.details__total_price}>{`${price} ₸`}</span>
            </div>
            <Button>{t('pages.admin.accept')}</Button>
        </>
    );
}

function OrderCookingDetails({ acceptedAt }: { acceptedAt: string }) {
    const { t } = useTranslation();
    return (
        <div className={styles.details__cooking}>
            <div className={styles.details__cooking_time_accepted_at}>
                <p className={styles.details__cooking_time_accepted_at_text}>{t('pages.admin.timeOrderAccepted')}</p>
                <span className={styles.details__cooking_time_accepted_at_time}>{acceptedAt}</span>
            </div>
            <div className={styles.details__cooking_progress}>
                <div className={styles.details__cooking_progress_timer}>
                    <div className={styles.details__cooking_progress_timer_icon}></div>
                    <p className={styles.details__cooking_progress_timer_text}>10 мин</p>
                </div>
                <div className={styles.details__cooking_progress_bar}></div>
                <h4 className={styles.details__cooking_progress_title}>{t('pages.admin.waitingTime')}</h4>
            </div>
            <div className={styles.details__cooking_buttons}>
                <div className={styles.details__cooking_buttons_grey}>
                    <ButtonGrey>{t('pages.admin.cancel')}</ButtonGrey>
                </div>
                <Button>{t('pages.admin.orderReady')}</Button>
            </div>
        </div>
    );
}

function OrderCompleteDetails() {
    const { t } = useTranslation();
    return (
        <div className={styles.details__complete}>
            <Button>{t('pages.admin.complete')}</Button>
        </div>
    );
}

function AccordionDetails({ details, type }: { details: { meals: MealInBasket[] }; type: 'not accepted' | 'cooking' }) {
    const price = details.meals.reduce((acc, current) => {
        return acc + current.count * current.meal.price;
    }, 0);
    return (
        <div className={styles.details}>
            <ul className={styles.details__meals}>
                {details.meals.map((meal, index) => {
                    return <Meal key={`${meal.meal.name}-${index}`} meal={meal.meal} count={meal.count} choices={meal.choices} />;
                })}
            </ul>
            <hr />
            {type === 'not accepted' ? <OrderNotAcceptedDetails price={price} /> : type === 'cooking' ? <OrderCookingDetails acceptedAt={details.acceptedAt} /> : type === 'complete' ? <OrderCompleteDetails /> : null}
        </div>
    );
}

export default AccordionDetails;
