import { FC } from 'react';
import styles from './SuccessMessage.module.scss';
interface SuccessMessage {
    message?: string;
}

const SuccessMessage: FC<SuccessMessage> = (props) => {
    const { message } = props;
    return (
        <div className={styles.success}>
            <div className={styles.success__container}>
                <div className={styles.success__icon} />
                <p className={styles.success__text}>{message}</p>
            </div>
        </div>
    );
};

export default SuccessMessage;
