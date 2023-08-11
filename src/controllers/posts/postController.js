const AppError = require('../../errors/AppError')
const postService = require('../../services/posts.service')

const getAll = async(req,res) =>  {
    const data = await postService.get()

    res.status(200).json(data)
}

const create = async (req,res) => {
    const {title,desc,user_id}  = req.body
    if(!title || !user_id) throw new AppError('title and description are required',400)
    await postService.create(title,desc,user_id)
    res.sendStatus(201)
}

module.exports = {getAll,create}