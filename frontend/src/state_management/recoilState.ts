import { atom } from 'recoil'

const backendHost = JSON.stringify(import.meta.env.VITE_BACKEND_HOST);
export const backendHostInURL = JSON.parse(backendHost) as string;

function getToken(): string | null {
    const userToken = localStorage.getItem("token");
    return userToken ?? null;
}

function getIsAdmin(): Boolean {
    const isAdmin = localStorage.getItem("isAdmin");
    return isAdmin?.toLowerCase() === 'true';
}

export const accessTokenState = atom({
    key: "accessTokenState",
    default: getToken(),
});

export const userNameState = atom<string>({
    key: 'userNameState',
    default: ''
})

export const isAdminState = atom<Boolean>({
    key: 'isAdminState',
    default: getIsAdmin()
})