import { Category } from './index.type';

export interface  CategoryResponse {
    err: number
    msg: string
    total?: number
    response:  [Category[]] | null
}

export interface  CategoryParentResponse {
    err: number
    msg: string
    total?: number
    response:  Category[] | null
}