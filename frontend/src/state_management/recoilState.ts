import { atom } from 'recoil'

const backendHost = JSON.stringify(import.meta.env.VITE_BACKEND_HOST);
export const backendHostInURL = JSON.parse(backendHost) as string;


export const isLoggedInState = atom<boolean>({
    key: 'isLoggedInState',
    default: false,
});

export const userNameState = atom<string>({
    key: 'userNameState',
    default: ''
})