var _ = require('lodash');

exports = module.exports = getMergeConfig;

function getMergeConfig(global, local) {
    return _.mergeWith(global, local, function (object, source) {
        if (object && (object.data || object.code)) {
            console.error('Clashes presets: ', object, source);
            return object;
        }
    })
}
