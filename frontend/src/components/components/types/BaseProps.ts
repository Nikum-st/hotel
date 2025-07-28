import { HTMLAttributes } from 'react';

export type BaseProps<T = HTMLElement> = {
	children: React.ReactNode;
} & HTMLAttributes<T>;
