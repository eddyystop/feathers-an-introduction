'use strict';

const restrictToSender = require('./restrict-to-sender');

const process = require('./process');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const { populate, dePopulate, serialize } = require('feathers-hooks-common');

const populateSchema = {
  include: [{
    service: 'users',
    nameAs: 'sentBy',
    parentField: 'userId',
    childField: '_id'
  }]
};

const serializeSchema = {
  only: [ '_id', 'text', 'createdAt' ],
  sentBy: {
    only: [ 'email', 'avatar' ]
  }
};

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [ process() ],
  update: [dePopulate(), restrictToSender()],
  patch: [dePopulate(), restrictToSender()],
  remove: [restrictToSender()]
};

exports.after = {
  all: [],
  find: [ populate({ schema: populateSchema }), serialize(serializeSchema) ],
  get: [ populate({ schema: populateSchema }), serialize(serializeSchema) ],
  create: [ populate({ schema: populateSchema }), serialize(serializeSchema) ],
  update: [],
  patch: [],
  remove: []
};
