import styles from './Button.module.css';

export const Button = ({ children, width, ...props }) => (
	<button className={styles.Button} {...props}>
		{children}
	</button>
);
