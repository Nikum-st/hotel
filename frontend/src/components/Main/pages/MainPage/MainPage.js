import styles from './MainPage.module.css';
import { FiveStars } from './components/5stars/FiveStars';
import { AwardInfo } from './components/AwardInfo/AwardInfo';
import { BookRooms } from './components/BookRooms/BookRooms';
import { Footer } from './components/Footer/Footer';
import { HotelImage } from './components/HotelImage/HotelImage';
import { Info } from './components/Info/Info';
import { WeAreTheBestHotel } from './components/WeAreTheBestHotel/WeAreTheBestHotel';

export const MainPage = () => {
	return (
		<div className={styles.mainPage}>
			<HotelImage />
			<Info />
			<FiveStars />
			<AwardInfo />
			<BookRooms />
			<WeAreTheBestHotel />
			<Footer />
		</div>
	);
};
