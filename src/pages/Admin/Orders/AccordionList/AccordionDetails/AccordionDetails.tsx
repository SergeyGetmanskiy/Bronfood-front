import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import { sumBy } from 'lodash';

function Meal({ meal }) {
    const featureNames = meal.features.map((feature) => feature.name);

    return (
        <li className={styles.details__meal}>
            <p className={styles.details__meal_name}>
                {meal.name}
                {featureNames.map((featureName, index) => {
                    return (
                        <span key={`${featureName}-${index}`} className={styles.details__meal_feature}>
                            {featureName}
                        </span>
                    );
                })}
            </p>
            <span className={styles.details__meal_price}>{`${meal.price} ₸`}</span>
        </li>
    );
}

function AccordionDetails({ meals }) {
    const price = meals.reduce((acc, current) => {
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
                {meals.map((meal, index) => {
                    return <Meal key={`${meal.name}-${index}`} meal={meal.meal} />;
                })}
            </ul>
            <hr />
            <div className={styles.details__total}>
                <p>Итого:</p>
                <span className={styles.details__total_price}>{`${price} ₸`}</span>
            </div>
            <Button>Принять</Button>
        </div>
    );
}

export default AccordionDetails;
