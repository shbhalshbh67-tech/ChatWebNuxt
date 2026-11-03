import { defineStore, type Store } from "pinia";
import type { Socket } from "socket.io-client";
import {io} from "socket.io-client"

interface sendDataType {
    email?:string,
    name?:string,
    username?:string,
    password?:string,
    isAdmin?:boolean,
    img?:string
}

interface state{
sendData:sendDataType | null,
socket:Socket
}

export const GlobalVaribal  = defineStore('ch',{
    state: () : state  => ({
       sendData:null,
       socket:io("http://localhost:9000")
    })
})