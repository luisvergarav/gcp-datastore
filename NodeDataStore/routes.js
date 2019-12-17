const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

function getModel () {
  return require('./gcp/datastore');
}
router.get('/',function(req,res){
    getModel().list(5, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
          next(err);
          return;
        }
        res.json({
          items: entities,
          nextPageToken: cursor
        });
      });
    
});

router.post('/gete', (req, res, next) => {
    const data = req.body;
  
    // Save the data to the database.
    console.log('Data entrada' + data);
    getModel().create(data, (err, savedData) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`${req.baseUrl}/${savedData.id}`);
    });
  });

module.exports = router;