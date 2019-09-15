import Axios from 'axios';
import EnvService from '../services/EnvService';
import LocalStoreService, {userTokenKey} from '../services/LocalStoreService';

const CURRENT_HOST = EnvService.getCurrentHost();

/** This file contains all project API urls. */
export const AUTH_URL = `${CURRENT_HOST}/auth/login`;
export const LOAD_MINI_QUIZZES_BY_USER_URL = `${CURRENT_HOST}/quiz/mini`;
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini/quizzes`;
export const LOAD_QUIZ_URL = `${CURRENT_HOST}/quiz/load`;

export async function get<T>(url: string): Promise<T> {
    const response = await Axios.get<T>(url);
    return response.data;
}

export async function post<T>(url: string, body: any): Promise<T> {
    const ut = LocalStoreService.read<any>(userTokenKey);
    const token = ut ? `Bearer ${ut.message}` : '';

    let headers: any = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = token;
    }

    const response = await Axios.post(url, headers, body);
    return response.data;

}

//
// export const approve = (adminToken, results) => dispatch => {
//     Request
//         .post(
//             'http://quiz.griddynamics.com/api/gridquiz/admin/dashboard/approve')
// .send(results) .set('X-User-Token', adminToken) .set('accept',
// 'application/json') .set('verbose', true) .end((err, res) => { if (err) {
// console.log('err', err); } else { dispatch({type: 'APPROVE_RESULTS',
// payload: res.body}); } }); };

// SUPER AGENT
// const req = Request.post(url).send(body)
//                    .set('Content-Type', 'application/json');
// if (token) {
//     req.set('Authorization', token);
// }
//
// const response = await req;
// return response.body;

// FETCH
// const response: Response = await fetch(url, {
//     method: 'post',
//     headers,
//     body: JSON.stringify(body),
// });
// return response.json();
