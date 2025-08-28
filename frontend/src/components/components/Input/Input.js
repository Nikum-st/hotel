import React from 'react';
import styles from './Input.module.css';

export const Input = ({ name, ...props }) => (
	<input name={name} className={styles.Input} {...props} />
);
