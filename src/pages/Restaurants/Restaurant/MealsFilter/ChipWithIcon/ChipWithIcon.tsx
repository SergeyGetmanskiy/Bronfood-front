import styles from './ChipWithIcon.module.scss';

type ChipWithIconProps = {
    /**
     * Text displayed on HTML element
     */
    text: string;
    /**
     * Icon displayed inside HTML element
     */
    icon: 'food' | 'drink' | 'dessert';
    /**
     * Determines whether chip is selected by user
     */
    isActive: boolean;
    /**
     * Fires when user clicks on meal's type. Sets type selected
     */
    add: () => void;
    /**
     * Fires when user clicks on meal's type. Sets type deselected
     */
    delete: () => void;
};

const ChipWithIcon = (props: ChipWithIconProps) => {
    const handleChange = () => {
        if (props.isActive) {
            props.delete();
        } else {
            props.add();
        }
    };
    return (
        <label className={`${styles.chipwithicon} ${props.isActive ? styles.chipwithicon_active : ''}`}>
            <input className={`${styles.chipwithicon_input}`} type="checkbox" defaultChecked={false} onChange={handleChange} />
            <div className={`${styles.chipwithicon_icon} ${styles[`chipwithicon_${props.icon}`]}`} />
            <span className={`${styles.chipwithicon_text} ${props.isActive ? styles.chipwithicon_text_active : ''}`}>{props.text}</span>
        </label>
    );
};

export default ChipWithIcon;
