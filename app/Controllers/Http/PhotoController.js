'use strict'

const Photo = use('App/Models/Photo')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with pictures
 */
class PhotoController {

  async index({ request }) {
    const { order } = request.all()
    return Photo.query().orderBy('displayOrder').fetch()
  }

  async store({ request }) {

    const { isPortrait } = request.all()
    const upload = request.file('picture', {
      types: ['image'],
      size: '2mb'
    })

    const name = `${new Date().getTime()}.${upload.subtype}`

    await upload.move(Helpers.publicPath('uploads'), {
      name, overwrite: true
    })

    return Photo.create({
      isPortrait: isPortrait === 'true',
      url: `/uploads/${name}`
    })
  }

  async sort({ request }) {
    const { photos_ids } = request.all()

    const jobs = photos_ids.map(async (id, index) => {
      const photo = await Photo.find(id)
      photo.displayOrder = index
      return photo.save()
    })

    await Promise.all(jobs)

    return Photo.query().orderBy('displayOrder').fetch()
  }

  async show({ params }) {
    return Photo.find(params.id)
  }

  async destroy({ params }) {
    const { id } = params
    const picture = await Photo.find(id)

    await picture.delete()
  }
}

module.exports = PhotoController
