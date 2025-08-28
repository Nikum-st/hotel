import { Separator } from '../../../components/Separator/Separator';
import styles from './InfoField.module.css';

export const InfoField = () => {
	return (
		<div className={styles.infoField}>
			<img src="/img/photo-1556020685-ae41abfc9365.avif" alt="bed" />
			<div className={styles.info}>
				<h2>An extraordinary stay for curious travelers.</h2>
				<Separator />
				<div className={styles.panel}>
					<img src="/img/istockphoto-484358020-612x612.webp" alt="bed2" />
					<div>
						<p>
							World Boutique Hotel Awards is the first and only
							international award dedicated exclusively to recognizing the
							unique excellence of luxury boutique hotels.
						</p>
					</div>
				</div>
				<div className={styles.panel}>
					<div>
						<p>
							World Boutique Hotel Awards is the first and only
							international award dedicated exclusively to recognizing the
							unique excellence of luxury boutique hotels.
						</p>
					</div>
					<img src="/img/istockphoto-2157757253-612x612.webp" alt="bed3" />
				</div>
			</div>
		</div>
	);
};
