import styles from './MealsList.module.scss';
import { Meal } from '../../../../utils/api/restaurantsService/restaurantsService';
import BoxFood from '../BoxFood/BoxFood';

const MealsList = ({ meals, handleClick, isActive }: { meals: Meal[]; handleClick: (meal: Meal) => void; isActive: boolean }) => {
    return (
        <ul className={`${styles.meals - list} bronfood-scrollbar ${meals.length === 1 ? styles.meals_list_short : ''}`}>
            {meals.map((meal, index) => (
                <li key={`${meal}-${index}`}>
                    <BoxFood card={meal} handleClick={handleClick} isActive={isActive} />
                </li>
            ))}
        </ul>
    );
};

export default MealsList;
