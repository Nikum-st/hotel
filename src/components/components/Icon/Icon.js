export const Icon = ({ id, onClick, margin, size }) => (
	<div style={{ margin: margin, fontSize: size }} onClick={onClick}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);
