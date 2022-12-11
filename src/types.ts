import {Request, Response} from 'express'
import { IUser } from './models/User'

export interface IResponse extends Response {
    results?: object
}

export interface IRequest extends Request {
    user?: IUser | null
}
