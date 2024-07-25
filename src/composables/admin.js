import {onMounted, ref} from "vue";
import axios from "axios";

import {auth} from "@/composables/auth.js";
const {authHeader,base_url} = auth()

const all_users = ref([])
const emergencies = ref([])
export function admin(){
    const   fetchUsers = async () => {
        const res= await axios.get(base_url.value+'users/all', authHeader);
        if(res.data.status === 'success'){
            all_users.value = res.data.users
        }
    }
    const   fetchEmergency = async () => {
        const res= await axios.get(base_url.value+'emergency', authHeader);
        if(res.data.status === 'success'){
            emergencies.value = res.data.emergencies
        }
    }
    return {
        fetchUsers, fetchEmergency,emergencies,all_users,
    }

}