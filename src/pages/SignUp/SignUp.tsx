import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Input from '../../components/Input/Input';
import Popup from '../../components/Popups/Popup/Popup';
import { regexCaptcha, regexClientName } from '../../utils/consts';
import InputPhone from '../../components/InputPhone/InputPhone';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SignUp.module.scss';
import InputPassword from '../../components/InputPassword/InputPassword';
import { useCurrentUser } from '../../utils/hooks/useCurrentUser/useCurretUser';
import Preloader from '../../components/Preloader/Preloader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import PopupSignupSuccess from './PopupSignupSuccess/PopupSignupSuccess';
import SMSVerify from '../../components/SMSVerify/SMSVerify';
import { getErrorMessage } from '../../utils/serviceFuncs/getErrorMessage';
import Captcha from '../../components/Captcha/Captcha';

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp, confirmSignUp, getCaptcha } = useCurrentUser();
    const [captchaImage, setCaptchaImage] = useState<string>('');
    const [captchaTTL, setCaptchaTTL] = useState(0);
    const [isCaptchaLoading, setIsCaptchaLoading] = useState(false);
    const signUpErrorMessage = signUp.isError ? getErrorMessage(signUp.error, 'pages.signUp.') : '';
    const confirmSignUpErrorMessage = confirmSignUp.isError ? getErrorMessage(confirmSignUp.error, 'pages.signUp.') : '';
    const { t } = useTranslation();

    const isFirstRender = useRef(true);
    const isReloadingCaptcha = useRef(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { password, phoneNumber, username, captcha } = data;
        await signUp.mutateAsync({ phone: phoneNumber.replace(/\D/g, ''), password, name: username, captcha });
        setIsConfirmOpen(true);
    };

    const loadCaptcha = useCallback(async () => {
        if (isReloadingCaptcha.current) return;
        isReloadingCaptcha.current = true;
        setIsCaptchaLoading(true);
        try {
            const res = await getCaptcha.mutateAsync();
            setCaptchaImage(res.image);
            setCaptchaTTL(res.ttl);
        } finally {
            setIsCaptchaLoading(false);
            isReloadingCaptcha.current = false;
        }
    }, [getCaptcha]);

    useEffect(() => {
        const timerId = timerRef.current;

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, []);

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (captchaTTL > 0) {
            timerRef.current = setInterval(() => {
                setCaptchaTTL((prev) => {
                    if (prev === 1) {
                        loadCaptcha();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    }, [captchaTTL, loadCaptcha]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            loadCaptcha();
        }
    }, [loadCaptcha]);

    const confirm = async (code: string) => {
        await confirmSignUp.mutateAsync({ confirmation_code: code });
        signUp.reset();
        setIsInfoPopupOpen(true);
    };

    return (
        <>
            {isConfirmOpen && isInfoPopupOpen && <PopupSignupSuccess isOpened={isInfoPopupOpen} />}
            {isConfirmOpen && !isInfoPopupOpen && <SMSVerify onClose={confirmSignUp.reset} isErrorVisible={confirmSignUp.isError} isLoading={confirmSignUp.isPending} error={confirmSignUpErrorMessage} onSubmit={confirm} />}
            {!isConfirmOpen && (
                <Popup
                    title={t('pages.signUp.signUpHeading')}
                    onClose={() => {
                        signUp.reset();
                        navigate('/');
                    }}
                >
                    {signUp.isPending && <Preloader />}
                    <Form name="form-signup" onSubmit={handleSubmit(onSubmit)}>
                        {signUp.isError && <ErrorMessage message={signUpErrorMessage} />}
                        <fieldset className={styles.form__field} disabled={signUp.isPending}>
                            <FormInputs>
                                <Input type="text" name="username" placeholder={t('pages.signUp.namePlaceholder')} nameLabel={t('pages.signUp.name')} register={register} errors={errors} pattern={regexClientName}></Input>
                                <InputPhone register={register} errors={errors}></InputPhone>
                                <InputPassword register={register} errors={errors} name="password" nameLabel={t('pages.signUp.password')} required={true} />
                                <Captcha timer={captchaTTL} loadCaptcha={loadCaptcha} captchaImage={captchaImage} isCaptchaLoading={isCaptchaLoading} textButton={t('pages.signUp.reloadCaptcha')} />
                                <Input type="text" name="captcha" placeholder={t('pages.signUp.captchaPlaceholder')} nameLabel={t('pages.signUp.captcha')} register={register} errors={errors} pattern={regexCaptcha}></Input>
                            </FormInputs>
                        </fieldset>
                        <Button disabled={signUp.isPending}>{t('pages.signUp.registerButton')}</Button>
                    </Form>
                </Popup>
            )}
        </>
    );
};

export default SignUp;
