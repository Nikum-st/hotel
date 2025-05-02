import { useDispatch, useSelector } from 'react-redux';
import { selectRoom, setRoom } from '../../../../../../../../store';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoomInfoPanel } from '../RoomInfoPanel/RoomInfoPanel';
import styles from './LowPanel.module.css';
import { useRef, useState } from 'react';
import { useRequest } from '../../../../../../../../hooks/useRequest';
import { ImgEditing } from './components/ImgEditing';
import { validateImage } from './utils/validate-image';

export const LowPanel = () => {
	const [errorInput, setErrorInput] = useState(null);
	const room = useSelector(selectRoom);
	const [img, setImg] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isEditing = useMatch('/rooms/:name/edit');

	const refName = useRef();
	const refShortD = useRef();
	const refCategory = useRef();
	const refSize = useRef();
	const refBeds = useRef();
	const refDescription = useRef();
	const refAmenities = useRef();
	const refPrice = useRef();
	const { error } = useRequest();

	const handleSave = async () => {
		setErrorInput(false);

		if (img) {
			try {
				await validateImage(img);
			} catch (err) {
				setErrorInput(err);
				return;
			}
		}

		if (
			(!refDescription,
			!refName,
			!refShortD,
			!refCategory,
			!refSize,
			!refBeds,
			!refAmenities,
			!refPrice)
		) {
			setErrorInput('All fields must be filled in');
			return;
		}

		const formData = new FormData();
		img && formData.append('img', img);
		formData.append('name', refName.current.value);
		formData.append('shortDescription', refShortD.current.value);
		formData.append('category', refCategory.current.value);
		formData.append('size', refSize.current.value);
		formData.append('beds', refBeds.current.value);
		formData.append('description', refDescription.current.innerHTML);
		formData.append('amenities', refAmenities.current.value);
		formData.append('price', refPrice.current.value);

		await fetch(`/rooms/${room.id}`, {
			method: 'PATCH',
			body: formData,
		})
			.then((response) => response.json())
			.then(({ error, data }) => {
				if (error) {
					console.error(error);
				} else {
					dispatch(setRoom(data), navigate(`/rooms/${room.name}`));
				}
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className={styles.containerDetails}>
			{!isEditing ? (
				<img src={img ? URL.createObjectURL(img) : room?.img} alt={room?.name} />
			) : (
				<ImgEditing img={img} room={room} setImg={setImg} />
			)}
			<div className={styles.infoContainer} style={isEditing && { gap: '0px' }}>
				<RoomInfoPanel
					handleSave={handleSave}
					error={error}
					errorInput={errorInput}
					refs={{
						refName,
						refShortD,
						refCategory,
						refSize,
						refBeds,
						refDescription,
						refAmenities,
						refPrice,
					}}
				/>
			</div>
		</div>
	);
};
