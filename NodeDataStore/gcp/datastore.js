


const config = require('./../config');
// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const ds = new Datastore({
    project: config.get('GCLOUD_PROJECT')
  });

const kind = 'Question';

function list (limit, token, cb) {
    const q = ds.createQuery([kind])
      .limit(limit)
      .order('idAlmacen')
      .start(token);
  
    ds.runQuery(q, (err, entities, nextQuery) => {
      if (err) {
        cb(err);
        return;
      }
      const hasMore = nextQuery.moreResults !== Datastore.NO_MORE_RESULTS ? nextQuery.endCursor : false;
      cb(null, entities.map(fromDatastore), hasMore);
    });
  }

  function fromDatastore (obj) {
    obj.id = obj[Datastore.KEY].id;
    return obj;
  }
  function update (id, data, cb) {
    let key;
    if (id) {
      key = ds.key([kind, parseInt(id, 10)]);
    } else {
      key = ds.key(kind);
    }
  
    const entity = {
      key: key,
      data: toDatastore(data, ['description'])
    };
  
    ds.save(
      entity,
      (err) => {
        data.id = entity.key.id;
        cb(err, err ? null : data);
      }
    );
  }


  function toDatastore (obj, nonIndexed) {
    nonIndexed = nonIndexed || [];
    const results = [];
    Object.keys(obj).forEach((k) => {
      if (obj[k] === undefined) {
        return;
      }
      results.push({
        name: k,
        value: obj[k],
        excludeFromIndexes: nonIndexed.indexOf(k) !== -1
      });
    });
    return results;
  }
  

    function create (data, cb) {
        update(null, data, cb);
      }
    
    
      module.exports = {
        create,
        update,
        list
      };