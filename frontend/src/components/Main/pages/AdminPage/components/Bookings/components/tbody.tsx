import { Icon, Info } from '../../../../../../components';
import { TBodyProps } from './types';

export const Tbody = ({ isIcon, bookings, archiveStyle, deleteBooking }: TBodyProps) => {
	return (
		<tbody style={archiveStyle}>
			{bookings?.length === 0 ? (
				<tr>
					<td
						colSpan={9}
						style={{
							textAlign: 'center',
							padding: '20px',
						}}
					>
						<Info>No reservations</Info>
					</td>
				</tr>
			) : (
				bookings?.map((b) => (
					<tr key={b.id}>
						<td>{b.id}</td>
						<td>
							{typeof b.user === 'object' && b.user !== null
								? b.user.email
								: b.user}
						</td>
						<td>{b.firstName}</td>
						<td>{b.lastName}</td>
						<td>{b.phone}</td>
						<td>{b.room}</td>
						<td>{b.checkIn}</td>
						<td>{b.checkOut}</td>
						{isIcon && (
							<td>
								<Icon
									onClick={() => deleteBooking(b.id)}
									size={'30px'}
									id={'fa-times'}
									title={'Сomplete'}
									color={'#f43232'}
								/>
							</td>
						)}
					</tr>
				))
			)}
		</tbody>
	);
};
