import styles from './Search.module.scss';
import Filter from '../../components/Filter/Filter';
import RestaurantCardLarge from '../../components/Cards/RestaurantCardLarge/RestaurantCardLarge';
import { useNavigate } from 'react-router-dom';
import { useRestaurantsContext } from '../../utils/hooks/useRestaurants/useRestaurantsContext';

const Search = () => {
    const navigate = useNavigate();
    const { restaurantsFiltered } = useRestaurantsContext();

    return (
        <div className={styles.search}>
            <Filter
                close={() => navigate('/')}
                children={
                    <ul className={`${styles.search__list} bronfood-scrollbar`}>
                        {restaurantsFiltered.map((card) => (
                            <li key={card.id} className={styles.search__list_item}>
                                <RestaurantCardLarge card={card} onRestaurantClick={() => navigate(`/restaurants/${card.id}`)} />
                            </li>
                        ))}
                    </ul>
                }
            />
        </div>
    );
};

export default Search;
