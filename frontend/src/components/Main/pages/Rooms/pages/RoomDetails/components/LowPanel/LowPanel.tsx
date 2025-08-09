import { useDispatch, useSelector } from 'react-redux';
import { useMatch, useNavigate } from 'react-router-dom';
import { RoomInfoPanel } from '../RoomInfoPanel/RoomInfoPanel';
import styles from './LowPanel.module.css';
import { useRef, useState } from 'react';
import { useRequest } from '../../../../../../../../hooks/useRequest';
import { ImgEditing } from './components/ImgEditing';
import { validateImage } from './utils/validate-image';
import { RootState } from '../../../../../../../../store/store';
import { closeModal, openModal, setRoom } from '../../../../../../../../store';

export const LowPanel = () => {
	const [errorInput, setErrorInput] = useState<string | null>(null);
	const room = useSelector((state: RootState) => state.room);
	const [img, setImg] = useState<File | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isEditing = useMatch('/rooms/:name/edit');

	const refName = useRef<HTMLInputElement>(null);
	const refShortD = useRef<HTMLInputElement>(null);
	const refCategory = useRef<HTMLInputElement>(null);
	const refSize = useRef<HTMLInputElement>(null);
	const refBeds = useRef<HTMLInputElement>(null);
	const refDescription = useRef<HTMLDivElement>(null);
	const refAmenities = useRef<HTMLInputElement>(null);
	const refPrice = useRef<HTMLInputElement>(null);
	const { error } = useRequest();

	const handleSave = async () => {
		setErrorInput(null);

		if (img) {
			try {
				await validateImage(img);
			} catch (err) {
				if (typeof err === 'string') {
					setErrorInput(err);
					return;
				}
			}
		}
		if (
			!refDescription.current ||
			!refDescription.current.innerHTML ||
			!refName.current ||
			!refName.current.value ||
			!refShortD.current ||
			!refShortD.current.value ||
			!refCategory.current ||
			!refCategory.current.value ||
			!refSize.current ||
			!refSize.current.value ||
			!refBeds.current ||
			!refBeds.current.value ||
			!refAmenities.current ||
			!refAmenities.current.value ||
			!refPrice.current ||
			!refPrice.current.value
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

		dispatch(
			openModal({
				text: 'save the new values for the room?',
				onConfirmModal: async () => {
					await fetch(`/api/rooms/${room.id}`, {
						method: 'PATCH',
						body: formData,
					})
						.then((response) => response.json())
						.then(({ error, data }) => {
							if (error) {
								console.error(error);
							} else {
								dispatch(setRoom(data));
								navigate(`/rooms/${data.name}`);
							}
						})
						.catch((e) => console.error(e))
						.finally(() => {
							dispatch(closeModal());
						});
				},
			}),
		);
	};

	return (
		<div className={styles.containerDetails}>
			{!isEditing ? (
				<img src={img ? URL.createObjectURL(img) : room?.img} alt={room?.name} />
			) : (
				<ImgEditing img={img} room={room} setImg={setImg} />
			)}
			<div className={styles.infoContainer} style={isEditing ? { gap: '0px' } : {}}>
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
