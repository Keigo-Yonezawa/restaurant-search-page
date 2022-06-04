import axios from "axios"
import qs from "qs"

// axiosのインスタンス作成
const myAPI = axios.create ({
    baseURL: 'https://fathomless-wave-02848.herokuapp.com/hotpepper/'
})

// herokuにデプロイした自作APIを叩く
const fetchSearchData = async(params: any) => {

    for(let key in params){
        if(params[key] === true){
            params[key] = 1;
        }
        if(params[key] === false){
            params[key] = 0;
        }
    }

    return await myAPI.get('', {
        params: params,
        paramsSerializer: (params) => {
            return qs.stringify(params, {arrayFormat: 'repeat'});
        }
    })
}

export default fetchSearchData