import { InputHTMLAttributes } from 'react';

export type InputProps = {
	name?: string;
} & InputHTMLAttributes<HTMLInputElement>;
