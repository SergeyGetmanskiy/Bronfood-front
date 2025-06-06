import { FC } from 'react';
import ButtonUnderline from '../ButtonUnderline/ButtonUnderline';
import styles from './Captcha.module.scss';
import { formatSecondsToMinutes } from '../../utils/serviceFuncs/formatSecondsToMinutes';

interface Captcha {
    timer: number;
    loadCaptcha: () => void;
    isCaptchaLoading: boolean;
    captchaImage: string;
    textButton?: string;
}

const Captcha: FC<Captcha> = ({ ...props }) => {
    return (
        <div className={styles.captcha}>
            {props.isCaptchaLoading || !props.captchaImage ? (
                <div className={styles.spinner}></div>
            ) : (
                <div className={styles.captcha__content}>
                    <div style={{ backgroundImage: `url(${props.captchaImage})` }} className={styles.captcha__image}></div>
                    <ButtonUnderline type="button" onClick={props.loadCaptcha}>
                        {props.textButton}
                        <div className={styles.captcha__timer}>
                            <span className={styles.captcha__timer_span}>(</span>
                            <p className={styles.captcha__timer_text}>{formatSecondsToMinutes(props.timer)}</p>
                            <span>)</span>
                        </div>
                    </ButtonUnderline>
                </div>
            )}
        </div>
    );
};

export default Captcha;
