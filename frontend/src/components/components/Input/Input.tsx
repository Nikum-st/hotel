import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import { InputProps } from '../types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, ...props }, ref) => (
		<input ref={ref} name={name} className={styles.Input} {...props} />
	),
);
