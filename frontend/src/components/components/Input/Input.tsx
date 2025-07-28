import React from 'react';
import styles from './Input.module.css';
import { InputProps } from '../types';

export const Input = ({ name, ...props }: InputProps) => (
	<input name={name} className={styles.Input} {...props} />
);
