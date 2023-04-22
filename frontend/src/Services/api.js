import axios from 'axios'

const apiUrl = 'http://localhost:4000/api/characters'

export const getAllCharacters = async () => {
    try {
        const res = await axios.get(apiUrl)
        return res
    }
    catch (error) {
        console.log(error)
    }
}

// const api = axios.create({
//     baseURL:'http://localhost:5000/',
//     headers:{
//         'Content-Type':'application/x-www-form-urlencoded'
//     }
// })

// export default api