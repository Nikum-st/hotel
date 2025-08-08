import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../components';
import { PageNambers } from './components/PageNumbers';
import styles from './Pagination.module.css';
import { RootState } from '../../../../../../store/store';
import { setCurrentPage } from '../../../../../../store';

export const Pagination = () => {
	const totalPages = useSelector((state: RootState) => state.app.totalPages);

	const currentPage = useSelector((state: RootState) => state.app.currentPage);
	const dispatch = useDispatch();

	const handlePrevPage = () => {
		if (currentPage > 1) dispatch(setCurrentPage(currentPage - 1));
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) dispatch(setCurrentPage(currentPage + 1));
	};
	const handlePageClick = (page: number) => {
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
