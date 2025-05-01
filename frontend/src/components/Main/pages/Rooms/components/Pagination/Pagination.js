import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { PageNambers } from './components/PageNumbers';
import styles from './Pagination.module.css';
import {
	selectCurrentPage,
	selectTotalPages,
	setCurrentPage,
} from '../../../../../../store';

export const Pagination = () => {
	const totalPages = useSelector(selectTotalPages);

	const currentPage = useSelector(selectCurrentPage);
	const dispatch = useDispatch();

	const handlePrevPage = () => {
		if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
	};
	const handlePageClick = (page) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className={styles.pagination}>
			<Button onClick={handlePrevPage} disabled={currentPage === 1}>
				&lt; Prev
			</Button>
			<PageNambers
				pageNumbers={totalPages}
				handlePageClick={handlePageClick}
				currentPage={currentPage}
			/>
			<Button onClick={handleNextPage} disabled={currentPage === totalPages}>
				Next &gt;
			</Button>
		</div>
	);
};
