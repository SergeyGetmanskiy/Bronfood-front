import { Administrator } from '../../../../../utils/api/cateringService/cateringService';
import styles from './AdministratorDetails.module.scss';

function AdministratorDetails({ administrator, onEdit }: { administrator: Administrator; onEdit: (id: string) => void }) {
    const { login, id } = administrator;
    return (
        <div className={styles.administrator}>
            <p className={styles.administrator__login}>{login}</p>
            <button className={styles.administrator__button} onClick={() => onEdit(id)}></button>
        </div>
    );
}

export default AdministratorDetails;
