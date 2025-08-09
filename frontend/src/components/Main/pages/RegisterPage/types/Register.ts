import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

export type Register = {
	handleSubmit: UseFormHandleSubmit<TFormData, undefined>;
	submitNewUser: SubmitNewUserFC;
	register: UseFormRegister<TFormData>;
	errorMessage: string | null;
	setErrorServer?: React.Dispatch<React.SetStateAction<string | null>>;
};

export type TFormData = {
	login: string;
	email: string;
	password: string;
	passcheck: string;
};

export type SubmitNewUserFC = ({
	login,
	password,
	email,
}: {
	login: string;
	password: string;
	email: string;
}) => Promise<void>;
