const {Background} = require('../models/models');

class BackgroundController {
    async create(req, res) {
        const {urlImage, by_userId} = req.body
        const background = await Background.create({urlImage, by_userId})

        return res.json(background)
    }
    async getAll(req, res) {
        const backgrounds = await Background.findAll();

        return res.json(backgrounds)
    }
    async getOne(req, res) {

    }
}

module.exports = new BackgroundController()