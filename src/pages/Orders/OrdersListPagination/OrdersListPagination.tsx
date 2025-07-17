import styles from './OrdersListPagination.module.scss';
import { FC } from 'react';

type OrdersListPaginationProps = {
    prevPage: () => void;
    nextPage: () => void;
    currentPage: number;
    totalItems: number;
    setPage: (page: number) => void;
    ordersCount: number;
};

const OrdersListPagination: FC<OrdersListPaginationProps> = ({ prevPage, nextPage, currentPage, totalItems, setPage, ordersCount }) => {
    const total = Math.ceil(totalItems / ordersCount);

    if (total < 2) return null;
    const getPages = () => {
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        if (currentPage <= 2) {
            return [1, 2, 3, 4, '...', total - 1, total];
        }
        if (currentPage >= total - 3) {
            return [1, 2, '...', total - 3, total - 2, total - 1, total];
        }

        return [1, '...', currentPage, currentPage + 1, currentPage + 2, '...', total];
    };

    return (
        <div className={styles['container']}>
            <button className={`${styles['container__button']} ${styles['container__button_prev']}`} onClick={prevPage} disabled={currentPage === 0}></button>
            {getPages().map((page, index) => (
                <button key={index} disabled={page === '...'} onClick={() => typeof page === 'number' && setPage(page - 1)} className={`${styles['container__button']} ${styles['container__button_page']} ${currentPage + 1 === page ? styles['active'] : ''}`}>
                    {page}
                </button>
            ))}
            <button className={`${styles['container__button']} ${styles['container__button_next']}`} onClick={nextPage} disabled={currentPage >= total - 1}></button>
        </div>
    );
};

export default OrdersListPagination;
