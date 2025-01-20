import styles from './MealImage.module.scss';

function MealImage({ image }: { image: string }) {
    return (
        <div className={styles.meal - image_container}>
            <div className={styles.meal - image} style={{ backgroundImage: `url(${image})` }} />
        </div>
    );
}

export default MealImage;
