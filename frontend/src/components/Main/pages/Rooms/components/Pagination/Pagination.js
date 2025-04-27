import { LIMIT_ROOMS_PER_PAGES } from '../../../../../../constants';
import { Button } from '../../../../../components';
import { PageNambers } from './components/PageNumbers';
import styles from './Pagination.module.css';

export const Pagination = ({ totalRooms, currentPage, onChangePage }) => {
	const totalPages = Math.ceil(totalRooms / LIMIT_ROOMS_PER_PAGES);

	const handlePrevPage = () => {
		if (currentPage > 1) onChangePage(currentPage - 1);
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) onChangePage(currentPage + 1);
	};
	const handlePageClick = (page) => {
		onChangePage(page);
	};

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={styles.pagination}>
			<Button onClick={handlePrevPage} disabled={currentPage === 1}>
				&lt; Prev
			</Button>
			<PageNambers
				pageNumbers={pageNumbers}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
			<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
				Next &gt;
			</Button>
		</div>
	);
};
