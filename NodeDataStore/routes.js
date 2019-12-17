const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

function getModel () {
  return require('./gcp/datastore');
}
router.get('/',function(req,rest){
    rest.send('Hello Express');
});

router.get('/gete', (req, res, next) => {
    const data = req.body;
  
    // Save the data to the database.
    getModel().create(data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  });

module.exports = router;