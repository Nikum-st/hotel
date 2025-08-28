import { IconProps } from '../types';
import styles from './Icon.module.css';

export const Icon: React.FC<IconProps> = ({
	id,
	onClick,
	margin,
	size,
	title,
	color,
	cursor,
	colorHover,
}) => (
	<div
		style={
			{
				margin,
				fontSize: size,
				cursor,
				'--icon-color': color,
				'--icon-hover-color': colorHover,
			} as React.CSSProperties
		}
		className={styles.icon}
		onClick={onClick}
	>
		<i className={`fa ${id}`} title={title} aria-hidden="true"></i>
	</div>
);
