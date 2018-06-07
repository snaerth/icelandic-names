const uuidv3 = require('uuid/v3');

// Note: Custom namespaces should be a UUID string specific to your application!
// E.g. the one here was generated using this modules `uuid` CLI.
const MY_NAMESPACE_UUID = '1b671a64-40d5-491e-99b0-da01ff1f3341';

/**
 * Creates unique ID from string
 * @param {String} str
 * @returns {String} UUID
 * @example createUUID('Name') => 'aca84bc6-021c-3169-a634-52a2761f2ad6'
 */
function createUUID(str) {
  return uuidv3(str, MY_NAMESPACE_UUID);
}

module.exports = createUUID;
