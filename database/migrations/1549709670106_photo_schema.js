'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PictureSchema extends Schema {
  up() {
    this.create('photos', (table) => {
      table.increments()
      table.string('url')
      table.boolean('isPortrait')
      table.integer('displayOrder')
      table.string('thumbnail')
      table.timestamps()
    })
  }

  down() {
    this.drop('photos')
  }
}

module.exports = PictureSchema
