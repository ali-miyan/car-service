import Cookies from 'js-cookie';

export const getInitialToken = (name:string) => {
    const token = Cookies.get(name);
    return token || null;
};