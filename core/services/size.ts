import axios from "axios"

export const getSize = () => {
    return axios.get(`${process.env.BE_API}/sizes/getSize`)
}