import { Icon } from '../../../../../../../../components';
import styles from './ImgEditing.module.css';

export const ImgEditing = ({ img, room, setImg }) => {
	return (
		<div className={styles.imgContainer}>
			<img src={img ? URL.createObjectURL(img) : room?.img} alt={room?.name} />
			<label>
				<div className={styles.iconContainer}>
					<Icon type="file" color="black" size="45px" id="fa-picture-o" />
					<input
						type="file"
						onChange={(e) => setImg(e.target.files[0])}
						style={{ display: 'none' }}
						accept="image/jpeg"
					/>
				</div>
			</label>
		</div>
	);
};
