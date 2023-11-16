import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";

type User = {
    id: number;
    name: string;
    email: string;
}

type Credentials = {
    email: string;
    password: string;
}

type RegistrationInfo = {
    username: string;
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isLoggedIn = computed(() => !!user.value)

    async function logout() {
        await useApiFetch("/logout", { method: "POST" });
        user.value = null;
       // navigateTo("/login");
    }

    async function fetchUser() {
        const { data, error } = await useApiFetch("/auth/user");
        user.value = data.value as User;
    }

    async function login(credentials: Credentials) {
        // await useApiFetch("/sanctum/csrf-cookie");


        const login = await useApiFetch("/login", {
            method: "POST",
            body: credentials,
        });

        await fetchUser();
      

        return login;
    }

    //   const login = (credentials: Credentials) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //            await useApiFetch('/login', {
    //                 method: "POST",
    //       body: credentials,
    //             })

    //             await fetchUser();
    //             // setUser(data.user)

    //             resolve(true)
    //         } catch (error) {
    //             reject(error)
    //         }
    //     })
    // }
    async function register(info: RegistrationInfo) {
        //  await useApiFetch("/sanctum/csrf-cookie");

        const register = await useApiFetch("/register", {
            method: "POST",
            body: info,
        });

        // if (user == null) {
        //     return navigateTo("/login", {replace: true});
        //   }

        return register;
    }

    return { user, login, isLoggedIn, fetchUser, logout, register }
})