import { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import RestaurantPopup from './RestaurantPopup/RestaurantPopup';
import RestaurantImage from './RestaurantImage/RestaurantImage';
import RestaurantDescription from './RestaurantDescription/RestaurantDescription';
import MealsList from './MealsList/MealsList';
import MealsFilter from './MealsFilter/MealsFilter';
import Preloader from '../../../components/Preloader/Preloader';
import PageNotFound from '../../PageNotFound/PageNotFound';
import { Meal, MealType } from '../../../utils/api/restaurantsService/restaurantsService';
import useGetFavorites from '../../../utils/hooks/useFavorites/useFavorites';
import styles from './RestaurantPopup/RestaurantPopup.module.scss';
import { useRestaurants } from '../../../utils/hooks/useRestaurants/useRestaurants';
import { useMeals } from '../../../utils/hooks/useMeals/useMeals';
import { useRestaurant } from '../../../utils/hooks/useRestaurant/useRestaurant';
import { useCurrentUser } from '../../../utils/hooks/useCurrentUser/useCurretUser';
import { useBasketMutations, useGetBasket } from '../../../utils/hooks/useBasket/useBasket';

function Restaurant() {
    const [isMealPageOpen, setIsMealPageOpen] = useState(false);
    const [selectedMealTypes, setSelectedMealTypes] = useState<MealType[]>([]);
    const navigate = useNavigate();
    const params = useParams();
    const { isLogin } = useCurrentUser();
    const restaurantId = parseInt(params.restaurantId ? params.restaurantId : '');
    const { setActiveRestaurant } = useRestaurants();
    const { data: restaurantData, isLoading: restaurantLoading, error: restaurantError, isSuccess: isRestaurantSuccess } = useRestaurant(restaurantId);
    const restaurant = isRestaurantSuccess && restaurantData.data;
    const { data, isPending: mealsLoading, isSuccess } = useMeals(restaurantId);
    const meals = isSuccess && data.data;
    const { data: favoriteRestaurants, isLoading: favoritesLoading } = useGetFavorites();
    const { addMeal } = useBasketMutations();
    const { refetch: refetchBasket } = useGetBasket();

    const handleAddMealClick = async (meal: Meal) => {
        if (isLogin && restaurant) {
            if (meal.hasFeatures) {
                navigate(`meal/${meal.id}`);
                setIsMealPageOpen(true);
            } else {
                await addMeal.mutateAsync({ restaurantId: restaurant.id, mealId: meal.id, features: [] });
                refetchBasket();
            }
        } else {
            navigate(`/signin`);
        }
    };

    const close = () => {
        navigate('/restaurants');
    };

    const addMealType = (mealType: MealType) => {
        setSelectedMealTypes([...selectedMealTypes, mealType]);
    };

    const deleteMealType = (mealType: MealType) => {
        setSelectedMealTypes(selectedMealTypes.filter((type) => type !== mealType));
    };
    useEffect(() => {
        if (restaurantId) {
            setActiveRestaurant(restaurantId);
        }
    }, [restaurantId, setActiveRestaurant]);
    if (restaurantLoading || favoritesLoading) {
        return (
            <div className={styles.restaurant_popup_overlay}>
                <div className={styles.restaurant_popup}>
                    <Preloader />
                </div>
            </div>
        );
    }

    if (restaurantError) {
        return <PageNotFound />;
    }

    if (!restaurant || !favoriteRestaurants) {
        return null;
    }

    const mealsFiltered = meals && selectedMealTypes.length === 0 ? meals : meals ? meals.filter((meal) => selectedMealTypes.includes(meal.type)) : [];

    return (
        <>
            <RestaurantPopup close={close} isMealPageOpen={isMealPageOpen} setIsMealPageOpen={setIsMealPageOpen} restaurant={restaurant}>
                <RestaurantImage image={restaurant.photo} />
                <RestaurantDescription name={restaurant.name} address={restaurant.address} workingTime={restaurant.workingTime} rating={restaurant.rating} reviews="(123+)" />
                <MealsFilter selectedTypes={selectedMealTypes} addType={addMealType} deleteType={deleteMealType} />
                {mealsLoading ? <Preloader /> : <MealsList meals={mealsFiltered} handleClick={handleAddMealClick} isActive={addMeal.isPending} />}
            </RestaurantPopup>
            <Outlet />
        </>
    );
}

export default Restaurant;
