import axios from "axios"

export const getBrands = () => {
    return axios.get(`${process.env.BE_API}/brands/getBrand`)
}