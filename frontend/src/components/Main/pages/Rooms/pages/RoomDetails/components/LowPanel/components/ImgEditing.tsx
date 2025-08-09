import { roomType } from '../../../../../../../../../types/roomType';
import { Icon } from '../../../../../../../../components';
import styles from './ImgEditing.module.css';

type ImgEditingProps = {
	img: File | null;
	room: roomType;
	setImg: React.Dispatch<React.SetStateAction<File | null>>;
};

export const ImgEditing = ({ img, room, setImg }: ImgEditingProps) => {
	return (
		<div className={styles.imgContainer}>
			{(img || room?.img) && (
				<img src={img ? URL.createObjectURL(img) : room?.img} alt={room?.name} />
			)}
			<label>
				<div className={styles.iconContainer}>
					<Icon type="file" color="black" size="45px" id="fa-picture-o" />
					<input
						type="file"
						onChange={(e) => {
							if (!e.target.files?.[0]) return;
							setImg(e.target.files[0]);
						}}
						style={{ display: 'none' }}
						accept="image/jpeg"
					/>
				</div>
			</label>
		</div>
	);
};
