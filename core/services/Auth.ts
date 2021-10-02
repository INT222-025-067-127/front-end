import axios from "axios"

export const postsignin = (body: {username: string, password: string}) => {
    axios.post(`${process.env.API}/users/login`, body)
}