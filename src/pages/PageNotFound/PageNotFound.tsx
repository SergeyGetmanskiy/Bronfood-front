import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import Popup from '../../components/Popups/Popup/Popup';
import Button from '../../components/Button/Button';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const queryClient = useQueryClient();
    const navigateToRoot = () => {
        queryClient.invalidateQueries();
        navigate('/');
    };
    return (
        <Popup onClose={navigateToRoot}>
            <div className={styles['page-not-found']}>
                <div className={styles['page-not-found__error']}>
                    4
                    <div className={styles['page-not-found__icon']} />4
                </div>
                <p className={styles['page-not-found__message']}>{t('pages.pageNotFound.somethingWentWrong')}</p>
                <Button type="button" onClick={navigateToRoot}>
                    {t('pages.pageNotFound.goBack')}
                </Button>
            </div>
        </Popup>
    );
};

export default PageNotFound;
