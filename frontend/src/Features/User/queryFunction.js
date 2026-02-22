import axios from "axios";

export async function GetCity(){
    const res = fetch("https://ipapi.co/json/");
    if(!res.ok){
        throw new Error("IP lookup failed");
    }
    const data = await res.json();
    return data.city?.toLowerCase();
}