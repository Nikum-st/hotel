import { Icon } from '../../../../../components/Icon/Icon';
import styles from './Footer.module.css';

export const Footer = () => (
	<div className={styles.footer}>
		<div className={styles.adress}>
			<h2>Grand Lotus Hotel</h2>
			<address>
				350 5th Ave, Loss Tons, LT 10118
				<br />
				<a href="tel:12127363101110">+1 212-736-3101110</a>
				<br />
				<a href="mailto:contacts@grand.lotus.com">contacts@grand.lotus.com</a>
			</address>
		</div>
		<div>
			<h2>Follow us on social media</h2>
			<div className={styles.socialMediaIcons}>
				<Icon id="fa-instagram" size="30px" color="white" />
				<Icon id="fa-facebook" size="30px" color="white" />
				<Icon id="fa-twitter" size="30px" color="white" />
				<Icon id="fa-youtube-play" size="30px" color="white" />
				<Icon id="fa-pinterest-p" size="30px" color="white" />
			</div>
			<div className={styles.policy}>
				© {new Date().getFullYear()} Grand Lotus Hotel. All rights reserved.
				<a href="/">Privacy Policy</a>
			</div>
		</div>
	</div>
);
