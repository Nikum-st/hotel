import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ children, ...props }) => (
	<div className={styles.errorMessage} {...props}>
		{children}
	</div>
);
