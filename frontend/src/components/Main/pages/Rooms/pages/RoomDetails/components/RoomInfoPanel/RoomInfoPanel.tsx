import { ErrorMessage, Input, Wrapper } from '../../../../../../../components';
import { Amenities } from './components/Amenities/Amenities';
import { Field } from './components/Field/Field';
import { Buttons } from './components/Buttons/Buttons';
import { Description } from './components/Description/Description';
import { useMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoomInfoPanelProps } from './types/PorpsTypes';
import { RootState } from '../../../../../../../../store/store';

export const RoomInfoPanel = ({
	error,
	errorInput,
	refs,
	handleSave,
}: RoomInfoPanelProps) => {
	const {
		refName,
		refShortD,
		refCategory,
		refSize,
		refBeds,
		refDescription,
		refAmenities,
		refPrice,
	} = refs;

	const isEditing = useMatch('/rooms/:name/edit');
	const room = useSelector((state: RootState) => state.room);

	return (
		<Wrapper error={error}>
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
			<Buttons handleSave={handleSave} room={room} />
		</Wrapper>
	);
};
