import EnvService from '../services/EnvService';
import fetch from 'cross-fetch';

const CURRENT_HOST = EnvService.getCurrentHost();

/** This file contains all project API urls. */
export const AUTH_URL = `${CURRENT_HOST}/auth/login`;
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini/quizzes`;
export const LOAD_QUIZ_URL = `${CURRENT_HOST}/quiz/load`;

export async function get<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    return response.json();
}

export async function post<T>(url: string, body: any): Promise<T> {
    const response: Response = await fetch(url, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return response.json();
}
