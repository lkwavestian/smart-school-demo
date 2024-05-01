/*
 * @作者: kerwin
 */
import axios from 'axios'
function kerwinupload(path,userForm) {
    const params = new FormData()
    for (let i in userForm) {
        if (i !== "avatar") {
            params.append(i, userForm[i])
        }
    }
    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export default kerwinupload