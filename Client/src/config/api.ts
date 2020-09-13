import {environment} from '../environments/environment';

export const baseUrl = environment.production ? 'https://blabla.co.il' : 'http://127.0.0.1:3000/api';
export const productsUrl = baseUrl + '/products';
export const cartUrl = baseUrl + '/cart';
export const purchasesUrl = baseUrl + '/purchases';
