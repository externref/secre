
import * as Configs from "../../config.json"

class Endpoints{
    baseURL = Configs.apiBaseURL

    public grayscaleFilter(url: string){
        return `${this.baseURL}/grayscale?=${url}`
    }

}

export const endpoints = new Endpoints()