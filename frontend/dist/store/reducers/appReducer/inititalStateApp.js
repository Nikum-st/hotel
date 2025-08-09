const sessionStorageJSON = sessionStorage.getItem('userData');
const userData = sessionStorageJSON ? JSON.parse(sessionStorageJSON) : null;
export const initialStateApp = {
    isAuthenticated: !!userData,
    loading: false,
    currentPage: 1,
    totalPages: 0,
    modal: {
        isOpen: false,
        text: 'Are you sure you want to ',
        OnConfirmModal: function () { },
    },
};
