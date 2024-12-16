import styles from './BasketMealsList.module.scss';
import BasketMeal from '../BasketMeal/BasketMeal';
import { MealInBasket } from '../../../utils/api/basketService/basketService';

const BasketMealsList = ({ meals }: { meals: MealInBasket[] }) => {
    return (
        <ul className={`${styles.basket_meals_list} bronfood-scrollbar`}>
            {meals.map((meal) => {
                return (
                    <li key={meal.meal.id}>
                        <BasketMeal mealInBasket={meal} />
                    </li>
                );
            })}
        </ul>
    );
};

export default BasketMealsList;
