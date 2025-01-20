import styles from './RestaurantImage.module.scss';

function RestaurantImage({ image }: { image: string }) {
    return (
        <div className={styles.restaurant - image_container}>
            <div className={styles.restaurant - image} style={{ backgroundImage: `url(${image})` }} />
        </div>
    );
}

export default RestaurantImage;
