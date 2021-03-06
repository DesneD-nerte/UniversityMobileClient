import { useContext, useEffect, useLayoutEffect, useMemo } from 'react'
import axios from 'axios'
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const RequestIncerceptor = ({ children }) => {
    const { signIn, signOut } = useContext(AuthContext);

    // const $api = axios.create();
    
    useLayoutEffect(() => {
        axios.interceptors.request.use(async config => {
            const token = await AsyncStorage.getItem('token')
            config.headers.Authorization = token;
        
            return config;
        }, error => {
            console.log('lol');

            return Promise.reject(error);
        })
    }, [])

   
    useLayoutEffect(() => {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
                console.log(error);
                if(error.response.status == 401) {
                    signOut();
                }

                return Promise.reject(error);
            }
        )
    }, [])

    return children
}

export default RequestIncerceptor