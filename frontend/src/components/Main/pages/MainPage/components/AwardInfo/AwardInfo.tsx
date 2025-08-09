import { Separator } from '../components/Separator/Separator';
import styles from './AwardInfo.module.css';

export const AwardInfo = () => {
	return (
		<div className={styles.awardInfo}>
			<img src="/img/photo-1522798514-97ceb8c4f1c8.avif" alt="dining room" />
			<div className={styles.textBox}>
				<h2>Where Timeless Luxury Meets Meaningful Experience</h2>
				<Separator />
				<p>
					Grand Lotus Hotel is more than just a five-star hotel — it’s a unique
					space where style meets the soul of the place. Every guest is immersed
					in an atmosphere of sophistication, inspired by the region’s culture
					and history. We don’t just offer service — we provide intuitive
					hospitality that anticipates your every need.
				</p>
				<Separator />
				<p>
					Awarded Global Luxury Hotel of the Year and Excellence in Boutique
					Hospitality, Grand Lotus Hotel has been recognized as one of the
					world’s finest hotels for its outstanding service, design, and
					attention to detail. The cozy ambiance, thoughtfully designed
					interiors, and authentic comfort make staying at Grand Lotus Hotel
					more than just a visit — it’s a truly priceless experience.
				</p>
			</div>
			<img src="/img/photo-1559508551-44bff1de756b.avif" alt="living room" />
		</div>
	);
};
