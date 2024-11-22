import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './BoxFood.module.scss';
import Button from '../../../../components/ButtonIconOrange/ButtonIconOrange';
import { Meal, Restaurant } from '../../../../utils/api/restaurantsService/restaurantsService';
import { useCurrentUser } from '../../../../utils/hooks/useCurrentUser/useCurretUser';
import { useBasketMutations } from '../../../../utils/hooks/useBasket/useBasket';
import { useQueryClient } from '@tanstack/react-query';
import { Basket } from '../../../../utils/api/basketService/basketService';

function BoxFood({ card, setIsMealPageOpen }: { card: Meal; setIsMealPageOpen: Dispatch<SetStateAction<boolean>> }) {
    const { id, features } = card;
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const restaurantId = parseInt(params.restaurantId ? params.restaurantId : '');
    const { addMeal, emptyBasket } = useBasketMutations();
    const hasFeatures = features && features.length > 0;
    const { isLogin } = useCurrentUser();
    const queryClient = useQueryClient();
    const restaurant: undefined | { data: Restaurant } = queryClient.getQueryData(['restaurant', restaurantId]);
    const handleClick = async () => {
        const basket: undefined | { data: Basket } = queryClient.getQueryData(['basket']);
        console.log(basket);
        if (isLogin && restaurant) {
            if (hasFeatures) {
                navigate(`${pathname}/meal/${id}`);
                setIsMealPageOpen(true);
            } else if (restaurant.data.id === basket?.data.restaurant.id) {
                console.log('тот же ресторан');
                addMeal.mutateAsync({ restaurantId: restaurant.data.id, mealId: id, features: features || [] });
            } else if (JSON.stringify(basket?.data.restaurant) === JSON.stringify({})) {
                console.log('пустая корзина');
                addMeal.mutateAsync({ restaurantId: restaurant.data.id, mealId: id, features: features || [] });
            } else if (restaurant) {
                console.log('другой ресторан');
                await emptyBasket.mutateAsync();
                addMeal.mutateAsync({ restaurantId: restaurant.data.id, mealId: id, features: features || [] });
            }
        } else {
            navigate(`/signin`);
        }
    };
    return (
        <div className={`${styles.boxfood}`} onClick={handleClick}>
            <div className={styles.boxfood__container}>
                <div className={styles.boxfood__image} style={{ backgroundImage: `url(${card.photo})` }} />
                <div className={styles.boxfood__description}>
                    <p className={styles.boxfood__name}>{card.name}</p>
                    <span className={styles.boxfood__price}>{`${card.price} ₸`}</span>
                    <div className={styles.boxfood__button}>
                        <Button type="button" icon="add" isActive={addMeal.isPending} disabled={addMeal.isPending} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxFood;
