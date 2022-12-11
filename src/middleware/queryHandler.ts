import {Request, NextFunction} from 'express'
import {Model} from 'mongoose'
import {IResponse} from '../types'


// Custom query handler middleware
const queryHandler = (model: Model<any>, populate: string) => async (req: Request, res: IResponse, next: NextFunction) => {
    // Query variable used to build a query
    let query
    // Copy req.query
    const reqQuery = {...req.query}
    // Fields to remove
    const removeFields = ['sort', 'order']
    // Remove fields from copied query
    removeFields.forEach(param => delete reqQuery[param])
    // Find resource with modified query
    query = model.find(reqQuery)

    // Sort resources
    if (req.query.sort) {
        const sortBy: {[key: string]: any} = {}
        const sort = <string>req.query.sort
        let order
        if (req.query.order) {
            order = <string>req.query.order
        } else order = 'desc'
        sortBy[sort] = order
        query = query.sort(sortBy)
    }

    // Executing the query
    const results = await query

    // Attach results to response ojbect
    res.results = {
        success: true,
        count: results.length,
        data: results
    }

    next()
}

export default queryHandler
