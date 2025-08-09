import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Button.module.css';
export const Button = ({ children, width, ...props }) => (_jsx("button", { className: styles.Button, ...props, children: children }));
