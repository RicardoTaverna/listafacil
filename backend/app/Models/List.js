'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class List extends Model {
    user () {
        return this.belongsTo('App/Models/User')
      }
    
    products(){
        return  this.belongsToMany('App/Models/Product')
    }

}

module.exports = List
