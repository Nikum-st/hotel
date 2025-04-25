export const Thead = ({ Icon, archiveStyle }) => (
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
			{Icon && <th>Action</th>}
		</tr>
	</thead>
);
