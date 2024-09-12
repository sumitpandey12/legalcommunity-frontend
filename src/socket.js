import { io } from "socket.io-client";
import APIURLs from "./APIs/APIUrls";

const URL = APIURLs.baseURL;

export const socket = io(URL);
