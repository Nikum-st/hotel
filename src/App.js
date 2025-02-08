import { Header, Main } from './components';
import { useRequestRooms } from './hooks';

function App() {
	useRequestRooms();

	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}

export default App;
