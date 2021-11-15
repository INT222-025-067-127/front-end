import axios from "axios"

export const getBrands = () => {
    return axios.get(`${process.env.API}/brands/getBrand`)
}