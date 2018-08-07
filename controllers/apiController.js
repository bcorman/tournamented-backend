// controllers/apiController.js
let index = (req, res) => {
  res.json({
    message: 'Welcome to Tournamented!',
    documentation_url: 'https://https://github.com/bcorman/tournamented-backend',
    base_url: 'localhost:3000',
    endpoints: [
      {
        method: 'GET', path: '/api', description: 'Describes available endpoints'
      }
    ]
  })
}


// controllers/apiController.js
module.exports = {
  index: index,
}
