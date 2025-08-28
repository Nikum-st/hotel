import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TFormData } from '../../Main/pages/RegisterPage/types/Register';

export type PasswordInputProps = {
	register: UseFormRegister<TFormData>;
	setErrorServer?: React.Dispatch<React.SetStateAction<string | null>>;
};
