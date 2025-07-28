import styles from './Button.module.css';
import { ButtonProps } from '../typesProps';

export const Button: React.FC<ButtonProps> = ({ children, width, ...props }) => (
	<button className={styles.Button} {...props}>
		{children}
	</button>
);
