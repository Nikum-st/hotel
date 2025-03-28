import styles from './Info.module.css';

export const Info = ({ room, children }) => {
	return (
		<div className={styles.infoContainer}>
			<div className={styles.shortDescription}>{room.shortDescription}</div>
			<div className={styles.category}>Сategory: {room.category}</div>
			<div className={styles.size}>Size: {room.size} sq.m</div>
			<div className={styles.beds}>Beds: {room.beds}</div>
			<div className={styles.description}>{room.description}</div>
			<ul className={styles.amenities}>
				{room.amenities.map((amenity, index) => (
					<li key={index}>{amenity}</li>
				))}
			</ul>
			<div className={styles.price}>Prise: ${room.price}</div>
			{children}
		</div>
	);
};
