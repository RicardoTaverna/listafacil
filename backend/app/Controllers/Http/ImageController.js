const User = use('App/Models/User');
const Helpers = use('Helpers');


class ImageController {
  
  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

    /**
   * Create/save a new image.
   * POST images
   */
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
