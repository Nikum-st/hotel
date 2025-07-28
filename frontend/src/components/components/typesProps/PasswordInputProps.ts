import { FieldValues, UseFormRegister } from 'react-hook-form';

export type PasswordInputProps<T extends FieldValues = FieldValues> = {
	register: UseFormRegister<T>;
	setErrorServer: React.Dispatch<React.SetStateAction<string | null>>;
};
