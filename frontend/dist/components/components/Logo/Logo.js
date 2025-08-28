import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
export const Logo = () => {
    return (_jsx(Link, { to: "/", children: _jsxs("div", { className: styles.logoContainer, children: [_jsx("div", { className: styles.logo, children: "GL" }), _jsx("div", { className: styles.textHotel, children: "HOTEL" })] }) }));
};
