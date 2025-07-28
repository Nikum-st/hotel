import { BaseProps } from '../types';
import styles from './Info.module.css';

export const Info = ({ children }: BaseProps<HTMLDivElement>) => (
	<div className={styles.Info}>{children}</div>
);
