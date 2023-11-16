import { defineStore } from "pinia";
import { useApiFetch } from "~/composables/useApiFetch";
import { useDialogStore } from "./dialog";
import { url } from "inspector";

type UrlDetails = {
    originalUrl: string,
    urlAlias: string
}
type UrlNumber = {
    urlLength: string,
}


export const useUrlStore = defineStore('url', () => {
    const nuxtApp = useNuxtApp();
    const dialog = useDialogStore();

    const urlNumber = ref(null)

    // function getUrlNumber(value) {
    //     urlNumber.value = value;
    // }
    async function createShortUrl(urlDetails: UrlDetails) {
        // return new Promise((resolve, reject) => {
        //     dialog.showLoading("Creating URL...");
        //     useApiFetch("/url", {
        //         method: "POST", body: urlDetails, lazy: true
        //     }).then((response) => {
        //         dialog.closeLoading();
        //         dialog.showNotification("URL created successfully...")
        //         resolve(response.data);
        //     });
        //  });
        //  dialog.showLoading("Creating URL...");
        const shortUrl = await useApiFetch("/url", { method: "POST", body: urlDetails })
        // dialog.closeLoading()
        // dialog.showNotification("URL created successfully...")
        return shortUrl;
    }

    async function createShortUrlNotUsers(urlDetails: UrlDetails) {
        const shortUrl = await useApiFetch("/url/unregister", { method: "POST", body: urlDetails })

        return shortUrl;
    }

    async function getUserUrls() {
        dialog.showLoading("Creating URL...");
        const { data } = await useApiFetch("/url/users")
        dialog.closeLoading()
        // dialog.showNotification("URL created successfully...")
        return data.value;
    }

    async function getUnregisterUserUrls() {
        dialog.showLoading("Creating URL...");
        const { data } = await useApiFetch("/url/users/unregister")
        dialog.closeLoading()
        let myUrl = data.value;
        urlNumber.value = myUrl.length;
        console.log("Number =>", urlNumber.value)

        // dialog.showNotification("URL created successfully...")
        return data.value;
    }

    async function getSingleUrl(id) {
        const { data } = await useApiFetch("/url/single/" + id)

        return data.value
    }


    async function getUrlClickInfo(id) {
        const { data } = await useApiFetch("/url/infos/" + id)

        return data.value
    }

    function getUrlNumber(value) {
        urlNumber.value = value;
    }

    async function updateUrl(payload) {
        const { data } = await useApiFetch("/url/update/" + payload.id,  { method: "PUT", body: payload.url } )

        return data.value
    }

    async function deleteUrl(id) {
        const urlDelete = await useApiFetch("/url/delete/" + id, {method: "DELETE"})

        return urlDelete;
    }


    return {
        createShortUrl, createShortUrlNotUsers,
        getUserUrls, getSingleUrl, getUrlClickInfo,
        getUnregisterUserUrls,
        getUrlNumber,
        urlNumber,
        updateUrl,
        deleteUrl
    }
})