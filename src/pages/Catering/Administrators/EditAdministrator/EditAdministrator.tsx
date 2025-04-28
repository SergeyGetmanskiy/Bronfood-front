import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Popup from '../../../../components/Popups/Popup/Popup';
import { useUpdateAdministrator, useGetAdministratorById, useDeleteAdministrator } from '../../../../utils/hooks/useAdministrators/useAdministrators';
import AdministratorForm from '../AdministratorForm/AdministratorForm';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Preloader from '../../../../components/Preloader/Preloader';
import ButtonGrey from '../../../../components/ButtonGrey/ButtonGrey';
import { useState, MouseEvent } from 'react';
import ConfirmationPopup from '../../../../components/Popups/ConfirmationPopup/ConfirmationPopup';
import styles from './EditAdministrator.module.scss';

const EditAdministrator = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const { administratorId } = useParams();
    const { data: administrator, isLoading: isFetching } = useGetAdministratorById(administratorId!);
    const { mutateAsync: updateAdmin, isPending: isUpdating } = useUpdateAdministrator();
    const { mutateAsync: deleteAdmin, isPending: isDeleting } = useDeleteAdministrator();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await updateAdmin({
            id: administratorId!,
            login: data.login,
            password: data.password,
            restaurant: data.restaurant,
        });
        navigate('/catering/administrators', {
            state: {
                fromSubmit: true,
            },
        });
    };

    const handleDelete = () => {
        setShowConfirmationPopup(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmationPopup(false);
        await deleteAdmin(administratorId!);
        navigate('/catering/administrators');
    };

    const onClose = () => {
        navigate('/');
    };

    const handleOverlayClick = (e: MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowConfirmationPopup(false);
        }
    };

    return (
        <>
            <Popup title={t('pages.administrators.titleEdit')} arrowBack onClose={onClose}>
                {isFetching && <Preloader />}
                {administrator && (
                    <AdministratorForm
                        onSubmit={onSubmit}
                        isLoading={isUpdating}
                        defaultValues={{
                            login: administrator.data.login,
                            password: '',
                            restaurant: administrator.data.restaurant,
                        }}
                        renderDeleteButton={
                            <ButtonGrey type="button" onClick={handleDelete}>
                                {t('pages.administrators.buttonDelete')}
                            </ButtonGrey>
                        }
                    />
                )}
            </Popup>
            {showConfirmationPopup && (
                <div className={styles['confirmation-popup-wrapper']} onClick={handleOverlayClick}>
                    <ConfirmationPopup title={t('components.confirmationPopup.areYouSureYouWantToRemoveTheAdministrator')} confirmButtonText={t('components.confirmationPopup.delete')} onCancel={() => setShowConfirmationPopup(false)} onSubmit={handleConfirmDelete} />
                    {isDeleting && (
                        <div className={styles['preloader-wrapper']}>
                            <Preloader />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default EditAdministrator;
