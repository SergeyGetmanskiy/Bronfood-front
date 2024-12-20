import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import { MealInBasket } from '../../../../../utils/api/basketService/basketService';
import { Choice, Meal as MealInterface } from '../../../../../utils/api/restaurantsService/restaurantsService';

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

function OrdersNotAcceptedDetails({ price }: { price: number }) {
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
            {type === 'not accepted' ? <OrdersNotAcceptedDetails price={price} /> : null}
        </div>
    );
}

export default AccordionDetails;
