import axios from "axios"

export const getSize = () => {
    return axios.get(`${process.env.API}/sizes/getSize`)
}