import EnvService from '../services/EnvService';

const CURRENT_HOST = EnvService.getCurrentHost();

/** This file contains all project API urls. */
export const LOAD_MINI_QUIZZES_URL = `${CURRENT_HOST}/open/mini/quizzes`;
export const LOAD_USER_URL = `${CURRENT_HOST}/open/user/load`; //TODO: Temp.
export const LOAD_QUIZ_URL = `${CURRENT_HOST}/quiz/load`;
