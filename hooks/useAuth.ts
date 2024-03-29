import { useReducer, useMemo, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IStateAuth {
    isAuth: boolean,
    token: string,
}
interface IAuthActions {
    signIn: (data) => void
    signOut: () => void
}
interface IAuth {
    stateAuth : IStateAuth,
    authActions: IAuthActions
}

export const useAuth = () : [IStateAuth, IAuthActions] => {
    const [stateAuth, dispatch] = useReducer(
        (prevState, action) => {
            switch (action.type) {
    
                case 'SIGN_IN':
                AsyncStorage.setItem('token', action.token);
                return {
                    isAuth: true,
                    token: action.token,
                };
    
                case 'SIGN_OUT':
                AsyncStorage.clear();
                return {
                    isAuth: false,
                    token: null,
                };
            }
        },
        {
            isAuth: false,
            token: null,
        }
    );
    
    const authActions = useMemo(() => ({
        signIn: (data) => {
            dispatch({ type: 'SIGN_IN', token: data });
        },
        signOut: () => {
            dispatch({ type: 'SIGN_OUT' })
        },
    }), []);

    return [stateAuth, authActions];
}

