import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import { sumBy } from 'lodash';
import { MealInBasket } from '../../../../../utils/api/basketService/basketService';
import { Meal as MealInterface } from '../../../../../utils/api/restaurantsService/restaurantsService';

function Meal({ meal, count }: { meal: MealInterface; count: number }) {
    return (
        <li className={styles.details__meal}>
            <p className={styles.details__meal_name}>
                {meal.name}
                {meal.features &&
                    meal.features.map((feature, index) => {
                        const choice = feature.choices.find((choice) => choice.default);
                        if (choice) {
                            return (
                                <span key={`${choice.name}-${index}`} className={styles.details__meal_feature}>
                                    {choice.name}
                                </span>
                            );
                        }
                    })}
            </p>
            {count > 1 ? <span className={styles.details__meal_count}>{`(${count})`}</span> : null}
            <span className={styles.details__meal_price}>{`${meal.price} ₸`}</span>
        </li>
    );
}

function AccordionDetails({ details }: { details: { meals: MealInBasket[] } }) {
    const { t } = useTranslation();
    const price = details.meals.reduce((acc, current) => {
        if (current.meal.features && current.meal.features.length > 0) {
            return (
                acc +
                current.count *
                    sumBy(current.meal.features, (feature) => {
                        const isChosen = feature.choices.some((choice) => choice.chosen);
                        if (isChosen) {
                            return feature.choices.filter((choice) => choice.chosen)[0].price;
                        } else {
                            return feature.choices.filter((choice) => choice.default)[0].price;
                        }
                    })
            );
        }
        return acc + current.count * current.meal.price;
    }, 0);
    return (
        <div className={styles.details}>
            <ul className={styles.details__meals}>
                {details.meals.map((meal, index) => {
                    return <Meal key={`${meal.meal.name}-${index}`} meal={meal.meal} count={meal.count} />;
                })}
            </ul>
            <hr />
            <div className={styles.details__total}>
                <p>{t('pages.admin.total')}</p>
                <span className={styles.details__total_price}>{`${price} ₸`}</span>
            </div>
            <Button>{t('pages.admin.accept')}</Button>
        </div>
    );
}

export default AccordionDetails;