'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Picture = use('App/Models/Picture')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with pictures
 */
class PictureController {

  async index({ request }) {
    const { order } = request.all()
    return Picture.query()
      .orderBy('position', order)
      .fetch()
  }

  async create({ request, response, view }) {
  }

  async store({ request }) {
    const { position } = request.all()

    const upload = request.file('picture', {
      types: ['image'],
      size: '2mb'
    })

    const name = `${new Date().getTime()}.${upload.subtype}`

    await upload.move(Helpers.publicPath('uploads'), {
      name, overwrite: true
    })

    return Picture.create({
      url: `/uploads/${name}`,
      position
    })
  }

  async show({ params }) {
    return Picture.find(params.id)
  }

  async destroy({ params }) {
    const { id } = params
    const picture = await Picture.find(id)

    await picture.delete()
  }
}

module.exports = PictureController
