import styles from './PageNumbers.module.css';

export const PageNambers = ({ pageNumbers, handlePageClick, currentPage }) => (
	<div className={styles.pageNumbers}>
		{pageNumbers.map((number) => (
			<button
				key={number}
				className={`${styles.pageNumber} ${currentPage === number ? styles.active : ''}`}
				onClick={() => handlePageClick(number)}
			>
				{number}
			</button>
		))}
	</div>
);
