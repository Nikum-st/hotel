import { jsx as _jsx } from "react/jsx-runtime";
import styles from './Icon.module.css';
export const Icon = ({ id, onClick, margin, size, title, color, cursor, }) => (_jsx("div", { style: { margin: margin, fontSize: size, color: color, cursor: cursor }, className: styles.icon, onClick: onClick, children: _jsx("i", { className: `fa ${id}`, title: title, "aria-hidden": "true" }) }));
