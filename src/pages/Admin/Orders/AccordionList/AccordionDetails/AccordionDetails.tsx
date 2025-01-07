import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import ButtonGrey from '../../../../../components/ButtonGrey/ButtonGrey';
import { ChoiceInAdminOrder, MealInAdminOrder, MealInOrder } from '../../../../../utils/api/adminService/adminService';
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
        const status = 'cooking';
        await changeAdminOrderStatus.mutateAsync({ id, status });
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

function OrderCookingDetails({ acceptedAt }: { acceptedAt: string }) {
    const { t } = useTranslation();
    return (
        <div className={styles.details__cooking}>
            <div className={styles.details__cooking_time_accepted_at}>
                <p className={styles.details__cooking_time_accepted_at_text}>{t('pages.admin.timeOrderAccepted')}</p>
                <span className={styles.details__cooking_time_accepted_at_time}>{acceptedAt}</span>
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
                    <ButtonGrey>{t('pages.admin.cancel')}</ButtonGrey>
                </div>
                <Button>{t('pages.admin.orderReady')}</Button>
            </div>
        </div>
    );
}

function OrderCompleteDetails() {
    const { t } = useTranslation();
    return (
        <div className={styles.details__complete}>
            <Button>{t('pages.admin.complete')}</Button>
        </div>
    );
}

function AccordionDetails({ id, details, status }: { id: number; details: { meals: MealInOrder[]; acceptedAt: string }; status: 'not accepted' | 'cooking' | 'complete' }) {
    const price = details.meals.reduce((acc, current) => {
        return acc + current.count * current.meal.price;
    }, 0);
    return (
        <div className={styles.details}>
            <ul className={styles.details__meals}>
                {details.meals.map((meal, index) => {
                    return <Meal key={`${meal.meal.name}-${index}`} meal={meal.meal} count={meal.count} choices={meal.choices} />;
                })}
            </ul>
            <hr />
            {status === 'not accepted' ? <OrderNotAcceptedDetails id={id} price={price} /> : status === 'cooking' ? <OrderCookingDetails acceptedAt={details.acceptedAt} /> : status === 'complete' ? <OrderCompleteDetails /> : null}
        </div>
    );
}

export default AccordionDetails;
