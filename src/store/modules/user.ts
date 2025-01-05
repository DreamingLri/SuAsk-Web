import { loginApi, logoutApi } from "@/api/user/login.api";
import { getUserInfoApi } from "@/api/user/user.api";
import { Role, type LoginReq, type User } from "@/model/user.model";
import type { Nullable } from "element-plus/es/components/cascader-panel/src/node.mjs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { pinia } from "..";

interface UserState {
    userInfo: Nullable<User>
    token?: string
    role: string
}

export const UserStore = defineStore(
    'user',
    () => {
        // const state = ref<UserState>({
        //     userInfo: null,
        //     role: Role.DEFAULT
        // })

        const userInfo = ref<Nullable<User>>(null)
        const token = ref<Nullable<string>>(null)
        const role = ref<string>(Role.DEFAULT)

        // const getUser = computed(() => state.value.userInfo || {} as User)

        function getUser(): User {
            return userInfo.value || {} as User
        }

        function getToken(): string {
            return token.value || ''
        }

        function getRole(): string {
            return role.value
        }

        function setToken(_token: string) {
            localStorage.setItem('token', _token)
            token.value = _token
        }

        function setUser(user: User) {
            userInfo.value = user
        }

        function setRole(_role: string) {
            role.value = _role
        }

        function resetState() {
            userInfo.value = null
            token.value = ''
            role.value = Role.DEFAULT
        }

        async function login(req: LoginReq): Promise<User | null> {
            try {
                const res = await loginApi(req)
                setToken(res.token)
                setRole(res.role)
                const user = await getUserInfo()
                return user
            } catch (e) {
                return Promise.reject(e)
            }
        }

        async function getUserInfo(): Promise<User | null> {
            const user = await getUserInfoApi()
            setUser(user)
            return user
        }

        async function logout(): Promise<any> {
            if (getToken()) {
                const res = await logoutApi()
                if (res) {
                    resetState()
                    return res
                } else {
                    return Promise.reject(res)
                }
            }
        }

        return { userInfo, token, role, getUser, getToken, getRole, setToken, setUser, login, logout }
    },
    {
        persist: true
    }
);

export function UserStoreWithOut() {
    return UserStore(pinia);
}