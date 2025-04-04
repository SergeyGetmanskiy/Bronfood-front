import styles from './AdministratorsList.module.scss';
import AdministratorDetails from './AdministratorsDetails/AdministratorDetails';
import { Administrator } from '../../../../utils/api/cateringService/cateringService';

const AdministratorsList = ({ administrators, onEdit }: { administrators: Administrator[]; onEdit: (id: string) => void }) => {
    return (
        <ul className={styles.administrators}>
            {administrators.map((administrator) => {
                return (
                    <li key={administrator.id}>
                        <AdministratorDetails administrator={administrator} onEdit={() => onEdit(administrator.id)} />
                    </li>
                );
            })}
        </ul>
    );
};

export default AdministratorsList;
