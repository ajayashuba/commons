import assert from 'assert';

const findAllData = [{
  id: 0,
  description: 'You have to do something'
}, {
  id: 1,
  description: 'You have to do laundry'
}];

export const Service = {
  events: [ 'log' ],

  find(params, callback) {
    callback(null, findAllData);
  },

  get(name, params, callback) {
    callback(null, {
      id: name,
      description: `You have to do ${name}!`
    });
  },

  create(data, params, callback) {
    let result = Object.assign({}, data, {
      id: 42,
      status: 'created'
    });

    if(Array.isArray(data)) {
      result.many = true;
    }

    callback(null, result);
  },

  update(id, data, params, callback) {
    var result = Object.assign({}, data, {
      id, status: 'updated'
    });

    if(id === null) {
      result.many = true;
    }

    callback(null, result);
  },

  patch(id, data, params, callback) {
    var result = Object.assign({}, data, {
      id, status: 'patched'
    });

    if(id === null) {
      result.many = true;
    }

    callback(null, result);
  },

  remove(id, params, callback) {
    callback(null, { id });
  }
};

export const verify = {
  find(data) {
    assert.deepEqual(findAllData, data, 'Data as expected');
  },

  get(id, data) {
    assert.equal(data.id, id, 'Got id in data');
    assert.equal(data.description, `You have to do ${id}!`, 'Got description');
  },

  create(original, current) {
    var expected = Object.assign({}, original, {
      id: 42,
      status: 'created'
    });
    assert.deepEqual(expected, current, 'Data ran through .create as expected');
  },

  update(id, original, current) {
    var expected = Object.assign({}, original, {
      id: id,
      status: 'updated'
    });
    assert.deepEqual(expected, current, 'Data ran through .update as expected');
  },

  patch(id, original, current) {
    var expected = Object.assign({}, original, {
      id: id,
      status: 'patched'
    });
    assert.deepEqual(expected, current, 'Data ran through .patch as expected');
  },

  remove(id, data) {
    assert.deepEqual({ id }, data, '.remove called');
  }
};