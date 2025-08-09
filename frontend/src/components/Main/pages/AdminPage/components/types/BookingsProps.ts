import { SendRequestFn } from './../../../../../../hooks/types/UseRequesrTypes';

import { archiveType } from '../../../../../../types/archiveType';
import { bookingType } from '../../../../../../types/bookingsType';
import { IconProps } from '../../../../../components/types';

export type BookingsProps = {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	bookings: bookingType[] | archiveType[];
	archiveType?: boolean;
	styleHeader?: { background: string; color: string };
	styleBody?: { background: string };
	Icon?: React.FC<IconProps>;
	setBookings?: React.Dispatch<React.SetStateAction<bookingType[]>>;
	sendRequest?: SendRequestFn;
	clearArchive?: () => Promise<void>;
};
