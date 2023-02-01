import md5 from "md5"

// Encrypting password with md5
export const encryptPassword = (password: string) : string => {
    return md5(password);
}