import React, { createContext, useState, useContext } from 'react';
import { Modal } from './Modal';

type ModalContextType = {
	openModal: (text: string, onConfirm: () => void) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const initialModalText = 'Are you sure you want to ';

	const [isOpen, setIsOpen] = useState(false);
	const [text, setText] = useState(initialModalText);
	const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);

	const openModal = (modalText: string, confirmCallback: () => void) => {
		setText(initialModalText + modalText);
		setOnConfirm(() => confirmCallback);
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
		setText('');
		setOnConfirm(null);
	};

	return (
		<ModalContext.Provider value={{ openModal }}>
			{children}
			{isOpen && (
				<Modal
					isOpen={isOpen}
					text={text}
					onConfirm={() => {
						onConfirm && onConfirm();
						closeModal();
					}}
					onCancel={closeModal}
				/>
			)}
		</ModalContext.Provider>
	);
};

export const useModal = () => {
	const context = useContext(ModalContext);
	if (!context) throw new Error('useModal must be used within ModalProvider');
	return context;
};
