import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminConfirmation.module.scss';
import ConfirmationPopup from '../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import { useEsc } from '../../../utils/hooks/useEsc/useEsc';
import Preloader from '../../../components/Preloader/Preloader';

const AdminConfirmation = ({ close, question, onSubmit, isLoading }: { close: () => void; question: string; onSubmit: () => void; isLoading: boolean }) => {
    const { t } = useTranslation();
    const handleSubmit = () => {
        onSubmit();
    };
    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };
    useEsc(() => close(), [close]);
    return (
        <div className={styles['admin-confirmation']} onClick={handleOverlayClick}>
            <ConfirmationPopup title={t(`pages.admin.${question}`)} confirmButtonText={t(`pages.admin.yes`)} onCancel={() => close()} onSubmit={handleSubmit} buttonDisabled={isLoading} />
            {isLoading ? <Preloader /> : null}
        </div>
    );
};

export default AdminConfirmation;
