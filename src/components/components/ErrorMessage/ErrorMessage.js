import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ children }) => (
	<div className={styles.errorMessage}>{children}</div>
);
