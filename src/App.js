import { Header, Main } from './components';
import { useGetSessionStorage } from './hooks';

function App() {
	useGetSessionStorage();
	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}

export default App;
