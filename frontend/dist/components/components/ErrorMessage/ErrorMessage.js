import { jsx as _jsx } from "react/jsx-runtime";
import styles from './ErrorMessage.module.css';
export const ErrorMessage = ({ children, ...props }) => (_jsx("div", { className: styles.errorMessage, ...props, children: children }));
