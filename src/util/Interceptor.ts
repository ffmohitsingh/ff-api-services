import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type InterceptorMethod<V = any> = (value: V) => V | Promise<V>;
export type InterceptorRequestEntry = {
    type: 'request';
    method: InterceptorMethod<AxiosRequestConfig>;
};
export type InterceptorResponseEntry = {
    type: 'response';
    method: InterceptorMethod<AxiosResponse>;
};
export type InterceptorEntry = InterceptorRequestEntry | InterceptorResponseEntry;

export class Interceptor {
    private readonly _interceptors: InterceptorEntry[];

    public get interceptors(): InterceptorEntry[] {
        return this._interceptors;
    }

    constructor() {
        this._interceptors = [];
    }

    public addRequestInterceptor(interceptorMethod: InterceptorMethod<AxiosRequestConfig>) {
        this._interceptors.push({
            type: 'request',
            method: interceptorMethod,
        });
    }

    public addResponseInterceptor(interceptorMethod: InterceptorMethod<AxiosResponse>) {
        this._interceptors.push({
            type: 'response',
            method: interceptorMethod,
        });
    }
}

export default new Interceptor();
