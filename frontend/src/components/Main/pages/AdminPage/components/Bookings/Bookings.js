import { forwardRef } from 'react';
import { Input, Info } from '../../../../../components';
import styles from './Bookings.module.css';
import { Thead } from './components/thead';
import { Tbody } from './components/tbody';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../../../../../store';

export const Bookings = forwardRef(
	(
		{
			bookings,
			Icon,
			styleHeader,
			styleBody,
			search,
			setSearch,
			type,
			sendRequest,
			setBookings,
		},
		ref,
	) => {
		const dispatch = useDispatch();

		const deleteBooking = async (id) => {
			dispatch(
				openModal({
					text: 'remove the booking?',
					onConfirmModal: async () => {
						const isDeleted = await sendRequest(
							`/bookings/${id}`,
							'DELETE',
						);

						if (isDeleted) {
							setBookings(bookings.filter((b) => b.id !== id));
						}
						dispatch(CLOSE_MODAL);
					},
				}),
			);
		};
		const filteredBookings =
			bookings?.filter(
				(b) =>
					b.firstName?.toLowerCase().includes(search?.toLowerCase()) ||
					b.id?.toLowerCase().includes(search?.toLowerCase()),
			) || [];

		return (
			<>
				<Input
					type="text"
					placeholder="Search by name or booking..."
					value={search}
					style={{ margin: '20px', width: '300px' }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<h2>{type === 'archive' ? 'Archive bookings' : 'Active bookings'}</h2>
				{filteredBookings.length === 0 ? (
					<Info>
						{type === 'archive' ? 'Archive is empty' : 'No reservations'}
					</Info>
				) : (
					<div
						ref={ref}
						className={type === 'archive' ? styles.archive : undefined}
					>
						<table className={styles.tableAdmin}>
							<Thead archiveStyle={styleHeader} Icon={Icon} />
							<Tbody
								Icon={Icon}
								archiveStyle={styleBody}
								deleteBooking={deleteBooking}
								bookings={filteredBookings}
							/>
						</table>
					</div>
				)}
			</>
		);
	},
);
