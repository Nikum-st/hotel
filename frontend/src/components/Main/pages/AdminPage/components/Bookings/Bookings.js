import { forwardRef } from 'react';
import { Input, Info } from '../../../../../components';
import styles from './Bookings.module.css';
import { Thead } from './components/thead';
import { Tbody } from './components/tbody';

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
			deleteBooking,
		},
		ref,
	) => {
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
				<h2>{type === 'archive' ? undefined : 'Active bookings'}</h2>
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
