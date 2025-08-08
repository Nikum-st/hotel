import styles from './Button.module.css';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ children, width, style, ...props }) => (
	<button className={styles.Button} style={{ width, ...style }} {...props}>
		{children}
	</button>
);
