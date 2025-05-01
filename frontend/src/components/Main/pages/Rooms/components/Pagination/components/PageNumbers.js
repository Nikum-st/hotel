import styles from './PageNumbers.module.css';

export const PageNambers = ({ pageNumbers, handlePageClick, currentPage }) => {
	const buttons = [];
	for (let i = 1; i <= pageNumbers; i++) {
		buttons.push(
			<button
				key={i}
				className={`${styles.pageNumber} ${currentPage === i ? styles.active : ''}`}
				onClick={() => handlePageClick(i)}
			>
				{i}
			</button>,
		);
	}

	return <div className={styles.pageNumbers}>{buttons}</div>;
};
