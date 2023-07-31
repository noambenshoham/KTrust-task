import { atom } from 'recoil'

const backendHost = JSON.stringify(import.meta.env.VITE_BACKEND_HOST);
export const backendHostInURL = JSON.parse(backendHost) as string;

function getToken(): string | null {
    const userToken = localStorage.getItem("accessToken");
    return userToken ?? null;
}
function getUsername(): string | undefined {
    const username = localStorage.getItem('username')
    return username ?? undefined
}

export const accessTokenState = atom({
    key: "accessTokenState",
    default: getToken(),
});

export const userNameState = atom<string | undefined>({
    key: 'userNameState',
    default: getUsername()
})

export const isAdminState = atom<Boolean>({
    key: 'isAdminState',
    default: false
})

export const allUsersState = atom<string[]>({
    key: 'allUsersState',
    default: []
})