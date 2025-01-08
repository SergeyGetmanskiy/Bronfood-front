import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import ButtonGrey from '../../../../../components/ButtonGrey/ButtonGrey';
import { AdminOrderStatus, ChoiceInAdminOrder, MealInAdminOrder, MealInOrder } from '../../../../../utils/api/adminService/adminService';
import { useAdminOrdersMutations } from '../../../../../utils/hooks/useAdminOrders/useAdminOrders';
import Preloader from '../../../../../components/Preloader/Preloader';

function Meal({ meal, count, choices }: { meal: MealInAdminOrder; count: number; choices: ChoiceInAdminOrder[] }) {
    return (
        <li className={styles.details__meal}>
            <p className={styles.details__meal_name}>
                {meal.name}
                {choices &&
                    choices.map((choice, index) => {
                        return (
                            <span key={`${choice.name}-${index}`} className={styles.details__meal_feature}>
                                {choice.name}
                            </span>
                        );
                    })}
            </p>
            {count > 1 ? <span className={styles.details__meal_count}>{`(${count})`}</span> : null}
            <span className={styles.details__meal_price}>{`${meal.price} ₸`}</span>
        </li>
    );
}

function OrderNotAcceptedDetails({ id, price }: { id: number; price: number }) {
    const { t } = useTranslation();
    const { changeAdminOrderStatus } = useAdminOrdersMutations();
    const handleClick = async () => {
        await changeAdminOrderStatus.mutateAsync({ id, status: 'cooking' });
    };
    return (
        <>
            <div className={styles.details__total}>
                <p>{t('pages.admin.total')}</p>
                <span className={styles.details__total_price}>{`${price} ₸`}</span>
            </div>
            {changeAdminOrderStatus.isPending && <Preloader />}
            <Button onClick={handleClick} disabled={changeAdminOrderStatus.isPending}>
                {t('pages.admin.accept')}
            </Button>
        </>
    );
}

function OrderCookingDetails({ id, acceptedAt }: { id: number; acceptedAt: Date | '' }) {
    const { t } = useTranslation();
    const { changeAdminOrderStatus } = useAdminOrdersMutations();
    const handleCancelClick = async () => {
        await changeAdminOrderStatus.mutateAsync({ id, status: 'canceled' });
    };
    const handleReadyClick = async () => {
        await changeAdminOrderStatus.mutateAsync({ id, status: 'ready' });
    };
    const time = acceptedAt !== '' ? `${acceptedAt.getHours()}:${acceptedAt.getMinutes()}` : '';
    return (
        <div className={styles.details__cooking}>
            <div className={styles.details__cooking_time_accepted_at}>
                <p className={styles.details__cooking_time_accepted_at_text}>{t('pages.admin.timeOrderAccepted')}</p>
                <span className={styles.details__cooking_time_accepted_at_time}>{time}</span>
            </div>
            <div className={styles.details__cooking_progress}>
                <div className={styles.details__cooking_progress_timer}>
                    <div className={styles.details__cooking_progress_timer_icon}></div>
                    <p className={styles.details__cooking_progress_timer_text}>10 мин</p>
                </div>
                <div className={styles.details__cooking_progress_bar}></div>
                <h4 className={styles.details__cooking_progress_title}>{t('pages.admin.waitingTime')}</h4>
            </div>
            <div className={styles.details__cooking_buttons}>
                <div className={styles.details__cooking_buttons_grey}>
                    <ButtonGrey onClick={handleCancelClick}>{t('pages.admin.cancel')}</ButtonGrey>
                </div>
                <Button onClick={handleReadyClick}>{t('pages.admin.orderReady')}</Button>
            </div>
        </div>
    );
}

function OrderReadyDetails({ id }: { id: number }) {
    const { t } = useTranslation();
    const { changeAdminOrderStatus } = useAdminOrdersMutations();
    const handleClick = async () => {
        await changeAdminOrderStatus.mutateAsync({ id, status: 'archive' });
    };
    return (
        <div className={styles.details__complete}>
            <Button onClick={handleClick}>{t('pages.admin.complete')}</Button>
        </div>
    );
}

function AccordionDetails({ id, meals, status, acceptedAt }: { id: number; meals: MealInOrder[]; status: AdminOrderStatus; acceptedAt: Date | '' }) {
    const price = meals.reduce((acc, current) => {
        return acc + current.count * current.meal.price;
    }, 0);
    return (
        <div className={styles.details}>
            <ul className={styles.details__meals}>
                {meals.map((meal, index) => {
                    return <Meal key={`${meal.meal.name}-${index}`} meal={meal.meal} count={meal.count} choices={meal.choices} />;
                })}
            </ul>
            <hr />
            {status === 'not accepted' ? <OrderNotAcceptedDetails id={id} price={price} /> : status === 'cooking' ? <OrderCookingDetails id={id} acceptedAt={acceptedAt} /> : status === 'ready' ? <OrderReadyDetails id={id} /> : null}
        </div>
    );
}

export default AccordionDetails;
