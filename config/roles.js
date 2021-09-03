// const {  
// } = require('./config').roles;

const roles = ['user', 'admin'];
const roleRights = new Map();

// e.g. managePublication -- a user can manage their own publication, post, topic, tag, etc.
const userRights = [ ];
roleRights.set(roles[0], userRights);   

roleRights.set(roles[1], [].concat(userRights));

module.exports = {
  roles,
  roleRights,
};
