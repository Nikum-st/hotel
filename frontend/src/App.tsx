import { Header, Main } from './components';
import { ModalProvider } from './components/components/Modal/ModalContext';

function App() {
	return (
		<ModalProvider>
			<Header />
			<Main />
		</ModalProvider>
	);
}

export default App;
