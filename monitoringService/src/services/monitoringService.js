const Action = require('../database/models/actionModel');
const ErrorModel = require('../database/models/errorModel');

module.exports = {
  ListActions: async (_, callback) => {
    try {
      const actions = await Action.find({});
      callback(null, { actions });
    } catch (error) {
      callback(error);
    }
  },

  ListErrors: async (_, callback) => {
    try {
      const errors = await ErrorModel.find({});
      callback(null, { errors });
    } catch (error) {
      callback(error);
    }
  }
};
