import { BaseProps } from '../types';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ children, ...props }: BaseProps<HTMLDivElement>) => (
	<div className={styles.errorMessage} {...props}>
		{children}
	</div>
);
