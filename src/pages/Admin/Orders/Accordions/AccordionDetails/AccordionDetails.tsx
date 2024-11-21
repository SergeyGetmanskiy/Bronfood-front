import styles from './AccordionDetails.module.scss';

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
            <span className={styles.details__meal_price}></span>
        </li>
    );
}

function AccordionDetails({ meals }) {
    return (
        <div className={styles.details}>
            <ul className={styles.details__meals}>
                {meals.map((meal, index) => {
                    return <Meal key={`${meal.name}-${index}`} meal={meal} />;
                })}
            </ul>
            <hr />
            <div className={styles.details__total}></div>
            <button className={styles.details__button}></button>
        </div>
    );
}

export default AccordionDetails;
