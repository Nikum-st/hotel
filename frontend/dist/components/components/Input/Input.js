import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Input.module.css';
export const Input = ({ name, ...props }) => (_jsx("input", { name: name, className: styles.Input, ...props }));
