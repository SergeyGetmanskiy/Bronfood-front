import styles from './BasketMeal.module.scss';
import Counter from '../../../components/Counter/Counter';
import { MealInBasket } from '../../../utils/api/basketService/basketService';
import { useBasketMutations } from '../../../utils/hooks/useBasket/useBasket';

function BasketMeal({ mealInBasket }: { mealInBasket: MealInBasket }) {
    const { meal, count, choices, price, id } = mealInBasket;
    const { name, photo } = meal;
    const sizeChoices = ['Маленький', 'Большой', 'Средний'];
    const toppings = choices.map((choice) => choice.name).filter((c) => (sizeChoices.some((sc) => sc === c) ? false : true));
    const size = choices.map((choice) => choice.name).find((c) => sizeChoices.some((sc) => sc === c));
    const { increment, decrement } = useBasketMutations();
    return (
        <div className={`${styles['basket-meal']}`}>
            <div className={styles['basket-meal__container']}>
                <div className={styles['basket-meal__image']} style={{ backgroundImage: `url(${photo})` }} />
                <div className={styles['basket-meal__description']}>
                    <p className={styles['basket-meal__name']}>{name}</p>
                    <ul>
                        {toppings &&
                            toppings.map((choice, index) => {
                                return (
                                    <li key={`${choice}-${index}`}>
                                        <p className={styles['basket-meal__feature']}>{choice}</p>
                                    </li>
                                );
                            })}
                    </ul>
                    <div className={styles['basket-meal__price_container']}>
                        {size && <p className={styles['basket-meal__size']}>{size}</p>}
                        <span className={styles['basket-meal__price']}>{`${price} ₸`}</span>
                    </div>
                </div>
                <div className={styles['basket-meal__counter']}>
                    <Counter count={count} increment={() => increment.mutateAsync({ mealId: id })} decrement={() => decrement.mutateAsync({ mealId: id })} />
                </div>
            </div>
        </div>
    );
}

export default BasketMeal;
