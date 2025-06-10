export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/


export type authType = {
    username?: string,
    email: string,
    password: string
    errors: {
        server?: string,
        email?: string,
        password?: string,
        username?: string,
    }
}


export type FormValues = {
    username?: string
    email: string;
    password: string;
};