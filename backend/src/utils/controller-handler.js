const controllerHandler = (controller) => async (request, response, next) => {
  try {
    await controller(request,response)
  } catch (error) {
    next(error)
  }
}

module.exports = controllerHandler