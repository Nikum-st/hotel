import styles from './Icon.module.css';

export const Icon = ({ id, onClick, margin, size, title }) => (
	<div
		style={{ margin: margin, fontSize: size }}
		className={styles.icon}
		onClick={onClick}
	>
		<i className={`fa ${id}`} title={title} aria-hidden="true"></i>
	</div>
);
