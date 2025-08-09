import { roomType } from '../../../../../../../../../types/roomType';

export type TButtonsProps = {
	room: roomType;
	handleSave: () => Promise<void>;
};

export type FieldProps = {
	label?: string;
	value?: string | number;
	placeholder?: string;
};

type RefsType = {
	refName: React.RefObject<HTMLInputElement | null>;
	refShortD: React.RefObject<HTMLInputElement | null>;
	refCategory: React.RefObject<HTMLInputElement | null>;
	refSize: React.RefObject<HTMLInputElement | null>;
	refBeds: React.RefObject<HTMLInputElement | null>;
	refDescription: React.RefObject<HTMLDivElement | null>;
	refAmenities: React.RefObject<HTMLInputElement | null>;
	refPrice: React.RefObject<HTMLInputElement | null>;
};

export type RoomInfoPanelProps = {
	handleSave: () => Promise<void>;
	refs: RefsType;
	error: string | null;
	errorInput: string | null;
};
