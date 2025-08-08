import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export type SubmitUserDatesType = ({
	login,
	password,
}: {
	login: string;
	password: string;
}) => Promise<void>;

export type AuthProps = {
	isLoading: boolean;
	register: UseFormRegister<{
		login: string;
		password: string;
	}>;
	handleSubmit: UseFormHandleSubmit<
		{
			login: string;
			password: string;
		},
		undefined
	>;
	errorMessage: string | null;
	onSubmit: SubmitUserDatesType;
	setErrorServer: React.Dispatch<React.SetStateAction<string | null>> | undefined;
};
