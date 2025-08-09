import { forwardRef } from 'react';
import { Input, Info } from '../../../../../components';
import styles from './Bookings.module.css';
import { Thead } from './components/thead';
import { Tbody } from './components/tbody';
import { BookingsProps } from '../types';
import { bookingType } from '../../../../../../types/bookingsType';
import { IconProps } from '../../../../../components/types';
import { archiveType } from '../../../../../../types/archiveType';
import { useModal } from '../../../../../components/Modal/ModalContext';

export const Bookings = forwardRef<HTMLDivElement, BookingsProps>(
	(
		{
			bookings,
			Icon,
			styleHeader,
			styleBody,
			search,
			setSearch,
			archiveType,
			sendRequest,
			setBookings,
		},
		ref,
	) => {
		const { openModal } = useModal();

		const deleteBooking = (id: string) => {
			if (!sendRequest || !setBookings) {
				return;
			}
			openModal('remove the booking?', async () => {
				try {
					const isDeleted = await sendRequest(`/bookings/${id}`, 'DELETE');
					if (isDeleted) {
						setBookings((prev) => prev.filter((b) => b.id !== id));
					}
				} catch (error) {
					console.error('Ошибка при удалении брони:', error);
				}
			});
		};

		type CommonItems = Pick<bookingType, 'id' | 'firstName'> &
			Pick<archiveType, 'id' | 'firstName'>;

		const filteredBookings = (bookings as CommonItems[]).filter(
			(b) =>
				b.firstName.toLowerCase().includes(search?.toLowerCase() || '') ||
				b.id.toLowerCase().includes(search?.toLowerCase() || ''),
		);

		return (
			<>
				<Input
					type="text"
					placeholder="Search by name or booking..."
					value={search}
					style={{ margin: '20px', width: '300px' }}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<h2>{archiveType ? 'Archive bookings' : 'Active bookings'}</h2>
				{filteredBookings.length === 0 ? (
					<Info>{archiveType ? 'Archive is empty' : 'No reservations'}</Info>
				) : (
					<div ref={ref} className={archiveType ? styles.archive : undefined}>
						<table className={styles.tableAdmin}>
							<Thead
								archiveStyle={
									styleHeader as { background: string; color: string }
								}
								Icon={Icon as React.FC<IconProps>}
							/>
							<Tbody
								Icon={Icon as React.FC<IconProps>}
								archiveStyle={styleBody as { background: string }}
								deleteBooking={deleteBooking}
								bookings={
									archiveType
										? (filteredBookings as archiveType[])
										: (filteredBookings as bookingType[])
								}
							/>
						</table>
					</div>
				)}
			</>
		);
	},
);
