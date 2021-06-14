const User = use('App/Models/User');
const Helpers = use('Helpers');
const Image = use('App/Models/Image');


class ImageController {
  
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

  async index({params, response}){
    const image = await Image.findByOrFail('user_id', params.id);
    return image;
  }
    /**
   * Create/save a new image.
   * POST images
   */
  
  async create ({ params, request }) {

    const user = await User.findOrFail(params.id)


    const profilePics = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await profilePics.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`,
      overwrite: true
    }))

    if (!profilePics.movedAll()) {
      return profilePic.errors()
    }

    await Promise.all(
      profilePics
        .movedList()
        .map(profilePics => user.images().create({ path: profilePics.fileName }))
    )
  }


  async update ({ params, request }) {

    const user = await User.findOrFail(params.id)


    const profilePics = request.file('image', {
        types: ['image'],
        size: '2mb'
      })

      await profilePics.moveAll(Helpers.tmpPath('uploads'), file => ({
        name: `${Date.now()}-${file.clientName}`,
        overwrite: true
      }))

      if (!profilePics.movedAll()) {
        return profilePic.errors()
      }

      await Promise.all(
        profilePics
          .movedList()
          .map(profilePics => user.images().update({ path: profilePics.fileName }))
      )

    }
}

module.exports = ImageController
