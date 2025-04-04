import { Link } from 'react-router-dom';
import styles from '../Navigation.module.scss';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CateringNavigation {
    /**
     * Click on menu item redirects to link and close menu
     */
    handleItemMenuClick: React.MouseEventHandler<HTMLElement>;
}

const CateringNavigation: FC<CateringNavigation> = (props) => {
    const { t } = useTranslation();

    return (
        <ul className={`${styles.nav__menu} ${styles.nav__menu_user}`}>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_add}`}></div>
                <Link to="/administrators" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    {t('components.cateringNavigation.administrators')}
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_list}`}></div>
                <Link to="/feedback" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    {t('components.cateringNavigation.aboutService')}
                </Link>
            </li>
            <li className={styles.nav__item}>
                <div className={`${styles.nav__icon} ${styles.nav__icon_exit}`}></div>
                <Link to="/logout" className={styles.nav__link} onClick={props.handleItemMenuClick}>
                    {t('components.cateringNavigation.signOut')}
                </Link>
            </li>
        </ul>
    );
};

export default CateringNavigation;
