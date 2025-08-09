import { THeadProps } from './types';

export const Thead = ({ isIcon, archiveStyle }: THeadProps) => (
	<thead style={archiveStyle}>
		<tr>
			<th>Booking</th>
			<th>Email</th>
			<th>First name</th>
			<th>Last name</th>
			<th>Phone</th>
			<th>Room</th>
			<th>Check in</th>
			<th>Check out</th>
			{isIcon && <th>Action</th>}
		</tr>
	</thead>
);
