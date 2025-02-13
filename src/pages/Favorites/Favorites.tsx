import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popups/Popup/Popup';
import styles from './Favorites.module.scss';
import { t } from 'i18next';
import Preloader from '../../components/Preloader/Preloader';
import useGetFavorites from '../../utils/hooks/useFavorites/useFavorites';
import RestaurantCardLarge from '../../components/Cards/RestaurantCardLarge/RestaurantCardLarge';

const Favorites = () => {
    const navigate = useNavigate();
    const { data: favoritesData, error: favoritesError, isLoading: favoritesLoading, isFetching: favoritesFetching, isSuccess: isFavoritesSuccess } = useGetFavorites();
    const favorites = isFavoritesSuccess && favoritesData.data;

    return (
        <Popup
            title={t('pages.favorites.title')}
            onClose={() => {
                navigate('/');
            }}
        >
            {favoritesFetching ? <Preloader /> : ''}
            {favoritesLoading ? (
                <Preloader />
            ) : (
                <>
                    {favoritesError ? (
                        <span className={styles.favorites__error}>{t('pages.favorites.error_load')}</span>
                    ) : (
                        <div className={styles.favorites}>
                            {favorites.length > 0 ? (
                                <ul className={`${styles.favorites__list} bronfood-scrollbar`}>
                                    {favorites.map((favorite) => {
                                        return (
                                            <li key={favorite.id} className={styles.favorites__item}>
                                                <RestaurantCardLarge card={favorite.restaurant} isFavorite={true} onRestaurantClick={() => navigate(`/restaurants/${favorite.restaurant.id}`)}></RestaurantCardLarge>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <span className={styles.favorites__empty}>{t('pages.favorites.list_empty')}</span>
                            )}
                        </div>
                    )}
                </>
            )}
        </Popup>
    );
};

export default Favorites;
