import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBookings, selectLoading } from '../../../../store';
import { Loader } from '../../../components';
import { useRequestServer } from '../../../../hooks';

export const AdminPage = () => {
	const [search, setSearch] = useState('');
	const bookings = useSelector(selectBookings);
	const isLoading = useSelector(selectLoading);
	const fetchBookings = useRequestServer();

	useEffect(() => {
		if (!bookings.length) {
		}
	}, []);

	const filteredBookings = bookings.filter((b) =>
		b.user.toLowerCase().includes(search.toLowerCase()),
	);

	return isLoading ? (
		<Loader />
	) : (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Администраторская панель</h1>

			<div className="bg-white p-4 rounded-lg shadow-md">
				<input
					type="text"
					placeholder="Поиск по пользователю..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="mb-4 p-2 border border-gray-300 rounded-md w-full"
				/>

				<table className="min-w-full table-auto">
					<thead>
						<tr>
							<th className="px-4 py-2 border-b">ID</th>
							<th className="px-4 py-2 border-b">Пользователь</th>
							<th className="px-4 py-2 border-b">Комната</th>
							<th className="px-4 py-2 border-b">Дата</th>
							<th className="px-4 py-2 border-b">Статус</th>
							<th className="px-4 py-2 border-b">Действия</th>
						</tr>
					</thead>
					<tbody>
						{filteredBookings.map((b) => (
							<tr key={b.id}>
								<td className="px-4 py-2 border-b">{b.id}</td>
								<td className="px-4 py-2 border-b">{b.user}</td>
								<td className="px-4 py-2 border-b">{b.room}</td>
								<td className="px-4 py-2 border-b">{b.date}</td>
								<td className="px-4 py-2 border-b">
									<span
										className={
											b.status === 'Активно'
												? 'text-green-600'
												: 'text-gray-500'
										}
									>
										{b.status}
									</span>
								</td>
								<td className="px-4 py-2 border-b">
									<button
										onClick={() =>
											alert(`Удалить бронирование ${b.id}`)
										}
										className="text-red-500 hover:text-red-700"
									>
										Удалить
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
