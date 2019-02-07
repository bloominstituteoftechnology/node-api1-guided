module.exports = {
  hubs: {
    find: findHubs,
    findById: findHubById,
    add: addHub,
    remove: removeHub,
    update: updateHub,
    clear: clearHubs,
  },
};

let _hubs = [
  {
    id: 1,
    name: 'api-1',
  },
  {
    id: 2,
    name: 'api-2',
  },
  {
    id: 3,
    name: 'api-3',
  },
  {
    id: 4,
    name: 'api-4',
  },
  {
    id: 5,
    name: 'api-5',
  },
];
let nextId = 6;

function findHubs(filter) {
  const seconds = new Date().getSeconds();

  // make it fail when seconds are odd
  if (seconds % 2 === 1) {
    return Promise.reject({
      code: 500,
      message: 'Too late, try again!',
    });
  }

  // if you pass a filter callback it will filter the results
  // try calling db.hubs.find(h => h.name === 'api-2') from a route handler
  if (filter) {
    const hubs = _hubs.filter(filter);
    return Promise.resolve(hubs);
  } else {
    // when called without a filter it resolves to all the hubs
    return Promise.resolve(_hubs);
  }
}

function findHubById(id) {
  const hubId = Number(id);
  if (hubId) {
    const hub = _hubs.find(h => h.id === hubId);

    return Promise.resolve(hub);
  } else {
    return Promise.reject({
      code: 400,
      message: 'Is that a trick? Please provide a number for the id',
    });
  }
}

function addHub(hub) {
  if (hub && hub.name) {
    const newHub = {
      id: nextId++,
      ...hub,
      createdAt: new Date().toISOString(),
    };

    _hubs.push(newHub);

    return Promise.resolve(newHub);
  } else {
    return Promise.reject({
      code: 400,
      message: 'Please provide a name for the hub',
    });
  }
}

function removeHub(id) {
  const hubId = Number(id);
  if (hubId) {
    const hub = _hubs.find(h => h.id === hubId);
    _hubs = _hubs.filter(h => h.id !== hubId);

    return Promise.resolve(hub);
  } else {
    return Promise.reject({
      code: 500,
      message: 'That hub is here to stay! cannot be removed',
    });
  }
}

function updateHub(id, changes) {
  const hubId = Number(id);
  if (hubId && changes && typeof changes === 'object' && changes.name) {
    if (changes.id) {
      return Promise.reject({
        code: 400,
        message: "Can't touch this! The id cannot be changed",
      });
    }

    let index = _hubs.findIndex(h => h.id === hubId);
    if (index > -1) {
      _hubs[index] = { ..._hubs[index], ...changes };
      return Promise.resolve(_hubs[index]);
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.reject({
      code: 400,
      message:
        'Did you change your mind? Please provide a valid id and a set of changes that includes the name',
    });
  }
}

function clearHubs() {
  _hubs = [];
  nextId = 1;
}
