import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import styles from './AccordionDetails.module.scss';
import ButtonGrey from '../../../../../components/ButtonGrey/ButtonGrey';
import { AdminOrder, ChoiceInAdminOrder, MealInAdminOrder } from '../../../../../utils/api/adminService/adminService';
import ProgressBar from '../../../../../components/ProgressBar/ProgressBar';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OrderStatus } from '../../Orders';

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

function OrderNotAcceptedDetails({ id, price, setOrderStatus }: { id: number; price: number; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const { t } = useTranslation();
    const handleAcceptClick = () => {
        setOrderStatus({
            id,
            status: 'accepted',
            confirmQuestion: 'acceptOrder',
            isConfirmationPopupOpen: true,
        });
    };
    const handleCancelClick = () => {
        setOrderStatus({
            id,
            status: 'cancel',
            confirmQuestion: 'cancelOrder',
            isConfirmationPopupOpen: true,
        });
    };
    return (
        <>
            <div className={styles.details__total}>
                <p>{t('pages.admin.total')}</p>
                <span className={styles.details__total_price}>{`${price} ₸`}</span>
            </div>
            <div className={styles.details__buttons}>
                <div className={styles.details__buttons_grey}>
                    <ButtonGrey onClick={handleCancelClick}>{t('pages.admin.cancel')}</ButtonGrey>
                </div>
                <Button onClick={handleAcceptClick}>{t('pages.admin.accept')}</Button>
            </div>
        </>
    );
}

function OrderCookingDetails({ id, acceptedAt, waitingTime, setOrderStatus }: { id: number; acceptedAt: Date | ''; waitingTime: string; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const cookingTime = waitingTime * 60;
    const [remainingTime, setRemainingTime] = useState(cookingTime - (Date.now() - Date.parse(acceptedAt as string)) / 1000);
    const { t } = useTranslation();
    const handleCancelClick = () => {
        setOrderStatus({
            id,
            status: 'cancel',
            confirmQuestion: 'cancelOrder',
            isConfirmationPopupOpen: true,
        });
    };
    const handleReadyClick = () => {
        setOrderStatus({
            id,
            status: 'ready',
            confirmQuestion: 'isOrderReady',
            isConfirmationPopupOpen: true,
        });
    };
    const hours = acceptedAt instanceof Date ? acceptedAt.getHours() : 0;
    const minutes = acceptedAt instanceof Date ? acceptedAt.getMinutes() : 0;
    const time = acceptedAt !== '' ? `${hours}:${minutes < 10 ? `0${minutes}` : minutes}` : '';
    useEffect(() => {
        const interval = setInterval(() => {
            if (remainingTime < 0) {
                setRemainingTime((prevTime) => prevTime);
            } else {
                setRemainingTime((prevTime) => prevTime - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [remainingTime]);
    return (
        <div className={styles.details__cooking}>
            <div className={styles.details__cooking_time_accepted_at}>
                <p className={styles.details__cooking_time_accepted_at_text}>{t('pages.admin.timeOrderAccepted')}</p>
                <span className={styles.details__cooking_time_accepted_at_time}>{time}</span>
            </div>
            <div className={styles.details__cooking_progress}>
                <div className={styles.details__cooking_progress_timer}>
                    <div className={styles.details__cooking_progress_timer_icon}></div>
                    <p className={styles.details__cooking_progress_timer_text}>{`${waitingTime} мин`}</p>
                </div>
                <ProgressBar initialTime={cookingTime} currentTime={remainingTime} />
                <h4 className={styles.details__cooking_progress_title}>{t('pages.admin.waitingTime')}</h4>
            </div>
            <div className={styles.details__buttons}>
                <div className={styles.details__buttons_grey}>
                    <ButtonGrey onClick={handleCancelClick}>{t('pages.admin.cancel')}</ButtonGrey>
                </div>
                <Button onClick={handleReadyClick}>{t('pages.admin.orderReady')}</Button>
            </div>
        </div>
    );
}

function OrderReadyDetails({ id, setOrderStatus }: { id: number; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const { t } = useTranslation();
    const handleClick = () => {
        setOrderStatus({
            id,
            status: 'completed',
            confirmQuestion: 'issueOrder',
            isConfirmationPopupOpen: true,
        });
    };
    return (
        <div className={styles.details__complete}>
            <Button onClick={handleClick}>{t('pages.admin.complete')}</Button>
        </div>
    );
}

function OrderArchiveDetails({ issuedAt }: { issuedAt: Date | '' }) {
    const { t } = useTranslation();
    const hours = issuedAt instanceof Date ? issuedAt.getHours() : 0;
    const minutes = issuedAt instanceof Date ? issuedAt.getMinutes() : 0;
    const time = issuedAt !== '' ? ` ${hours}:${minutes < 10 ? `0${minutes}` : minutes}` : '';
    return (
        <div className={styles.details__archive}>
            <p className={styles.details__archive_text}>
                {t('pages.admin.issuedTime')}
                <span className={styles.details__archive_time}>{time}</span>
            </p>
            <div className={styles.details__archive_icon}></div>
        </div>
    );
}

function AccordionDetails({ order, setOrderStatus }: { order: AdminOrder; setOrderStatus: Dispatch<SetStateAction<OrderStatus>> }) {
    const { id, meals, status, acceptedAt, issuedAt, waitingTime } = order;
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
            {status === 'paid' ? <OrderNotAcceptedDetails id={id} price={price} setOrderStatus={setOrderStatus} /> : status === 'accepted' ? <OrderCookingDetails id={id} acceptedAt={acceptedAt} waitingTime={waitingTime} setOrderStatus={setOrderStatus} /> : status === 'ready' ? <OrderReadyDetails id={id} setOrderStatus={setOrderStatus} /> : status === 'archive' ? <OrderArchiveDetails issuedAt={issuedAt} /> : null}
        </div>
    );
}

export default AccordionDetails;
