import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './Modal.module.css';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsOpenModal, selectOnConfirmModal, selectTextModal, CLOSE_MODAL, } from '../../../store';
export const Modal = () => {
    const text = useSelector(selectTextModal);
    const dispatch = useDispatch();
    const onConfirmModal = useSelector(selectOnConfirmModal);
    const isOpen = useSelector(selectIsOpenModal);
    if (!isOpen) {
        return;
    }
    return (_jsxs("div", { className: styles.modalContainer, children: [_jsx("div", { className: styles.overlay }), _jsxs("div", { className: styles.box, children: [_jsx("h3", { children: text }), _jsxs("div", { className: styles.buttons, children: [_jsx(Button, { onClick: onConfirmModal, width: "120px", children: "Yes" }), _jsx(Button, { onClick: () => dispatch(CLOSE_MODAL), width: "120px", children: "Cancel" })] })] })] }));
};
