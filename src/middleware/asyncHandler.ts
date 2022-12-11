import {Request, Response, NextFunction} from 'express'
import {IResponse} from '../types'

type TFn = (req: Request, res: IResponse, next: NextFunction) => void

const asyncHandler = (fn: TFn) => (req: Request, res: IResponse, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler
