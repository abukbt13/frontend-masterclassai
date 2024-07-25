import {onMounted, ref} from "vue";
import axios from "axios";

import {auth} from "@/composables/auth.js";
const {authHeader,base_url} = auth()

const client_data = ref([])
export function client(){
    const   fetchClientData = async () => {
        const res= await axios.get(base_url.value+'me/subtotal', authHeader);
            if(res.data.status === 'success'){
                client_data.value = res.data
                // console.log(res)
            }

    }
    return {
        fetchClientData,client_data
    }

}