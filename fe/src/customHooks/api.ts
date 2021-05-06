import React from 'react'
import axios from "axios"
import { apiLink } from '../settings'
export const API =  axios.create({
    baseURL: `${apiLink}/api`
});


interface AxiosRequestConfig {
    endPoint?: string;
    method?:   any;
    options?: any;
}

export const useFetch = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const fetchData = async (options : AxiosRequestConfig, callback :any = null) => {
        try {
            setIsLoading(true)
            const result = await API( options )
            setIsLoading(false)
            if (callback)
                callback (result,null)
            return result
        }
        catch (error) {   
            setIsLoading(false)     
            console.log(error)     
            if (callback)
                callback ([], error)
            return []
        }
    }
    return { loading: isLoading, fetchData: fetchData };
};
  