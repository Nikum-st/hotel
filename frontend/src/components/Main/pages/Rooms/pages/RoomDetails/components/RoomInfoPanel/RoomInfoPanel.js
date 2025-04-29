import { ErrorMessage, Input, Wrapper } from '../../../../../../../components';
import { Amenities } from './components/Amenities/Amenities';
import { Field } from './components/Field/Field';
import { useRef, useState } from 'react';
import { Buttons } from './components/Buttons/Buttons';
import { Description } from './components/Description/Description';
import { useMatch, useNavigate } from 'react-router-dom';
import { useRequest } from '../../../../../../../../hooks/useRequest';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../../../../../../../../store';
import { sanitizeDescription } from './utils/sanitize-description';

export const RoomInfoPanel = ({ room }) => {
	const [errorInput, setErrorInput] = useState(null);
	const isEditing = useMatch('/rooms/:name/edit');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const refName = useRef();
	const refImg = useRef();
	const refShortD = useRef();
	const refCategory = useRef();
	const refSize = useRef();
	const refBeds = useRef();
	const refDescription = useRef();
	const refAmenities = useRef();
	const refPrice = useRef();
	const { sendRequest, error } = useRequest();

	const handleSave = async () => {
		setErrorInput(false);
		const editData = {
			img: refImg.current.files[0],
			description: sanitizeDescription(refDescription.current.innerHTML),
			name: refName.current.value.trim(),
			shortDescription: refShortD.current.value.trim(),
			category: refCategory.current.value.trim(),
			size: Number(refSize.current.value.trim()),
			beds: refBeds.current.value.trim(),
			amenities: refAmenities.current.value
				.replace(/\s*,\s*/g, ',')
				.trim()
				.split(','),
			price: Number(refPrice.current.value.trim()),
		};

		if (editData.img) {
			if (editData.img.type !== 'image/jpeg') {
				setErrorInput('The image must be of type image/jpeg');
				return;
			}

			const img = new Image();
			img.onload = () => {
				if (img.width !== 1024 || img.height !== 1024) {
					setErrorInput('The image must be 1024x1024 pixels');
				}
			};
		}

		// if (
		// 	(!editData.description,
		// 	!editData.name,
		// 	!editData.short,
		// 	!editData.category,
		// 	!editData.size,
		// 	!editData.beds,
		// 	!editData.amenities,
		// 	!editData.price)
		// ) {
		// 	setErrorInput('All fields must be filled in');
		// 	return;
		// }
		// const updatedRoom = await sendRequest(`/rooms/${room.id}`, 'PATCH', editData);

		// if (updatedRoom) {
		// 	dispatch(updateRoom(updatedRoom, room.id));
		// 	navigate(`/rooms/${updatedRoom.name}`);
		// }
	};

	return (
		<Wrapper
			error={error}
			adminPage={isEditing && true}
			alwaysAccess={isEditing ? false : true}
		>
			{errorInput && <ErrorMessage>{errorInput}</ErrorMessage>}
			<Field
				value={room.name}
				placeholder={`name...`}
				label={'Name:'}
				ref={refName}
			/>
			<Field
				value={room.shortDescription}
				placeholder={`short description...`}
				ref={refShortD}
			/>
			<Field
				value={room.category}
				label={'Сategory:'}
				placeholder={`category...`}
				ref={refCategory}
			/>
			<Field
				value={room.size}
				label={'Size(sq.m):'}
				placeholder={`size...`}
				ref={refSize}
			/>
			<Field
				value={room.beds}
				label={'Beds:'}
				placeholder={`beds...`}
				ref={refBeds}
			/>
			<Description ref={refDescription} room={room} />
			{isEditing ? (
				<Input ref={refAmenities} defaultValue={room.amenities?.join(', ')} />
			) : (
				<Amenities room={room} />
			)}
			<Field
				placeholder={`price...`}
				ref={refPrice}
				value={room.price}
				label={'Priсe:$'}
			/>
			<Buttons ref={refImg} handleSave={handleSave} room={room} />
		</Wrapper>
	);
};
