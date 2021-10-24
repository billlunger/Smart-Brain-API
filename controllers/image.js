const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'e071062542b34f0aaf2a650381cea155',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Bad ImageURL Request'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to update'));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
