import {instance} from "./api.tsx";
import {UserType} from "../mobx/store";

export const authAPI = {
    getIsAuth() {
        return instance.get<boolean>(`auth`).then((response) => {
            return response;
        })
    },
    logIn(payload: UserType) {
        return instance.post<UserType>(`auth`, payload).then((response) => {
            return response;
        })
    },
    logOut(payload: UserType) {
        return instance.post<UserType>(`auth`, payload).then((response) => {
            return response;
        })
    }

}
