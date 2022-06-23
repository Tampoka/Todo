import axios from "axios"

const developmentMode = true

export const instance = developmentMode
    ? axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        withCredentials: true,
        headers: {
            'API-KEY': process.env.REACT_APP_API_KEY!,
        }
    })
    : axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
    })