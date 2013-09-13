var _ = require('underscore');

var Cache = function () {
    this._store = {};
};

Cache.TestSuite = require('./TestSuite');

Cache.prototype.write = function (bucketName, key, value, callback) {
    var bucket = this._store[bucketName] = this._store[bucketName] || { __expirations: {} };
    
    bucket[key] = value;
    bucket.__expirations[key] && bucket.__expirations[key](); //Debounces expiration
    
    process.nextTick(function () {
        callback(null);
    });
    
    return this;
};

Cache.prototype.read = function (bucketName, key, callback) {
    var value = this._store[bucketName] && this._store[bucketName][key];
    
    if (typeof value === 'undefined') {
        value = null;
    }
    
    process.nextTick(function () {
        callback(null, value);
    });
    
    return this;
};

Cache.prototype.invalidate = function (bucketName, key, callback) {
    if (this._store[bucketName]) {
        delete this._store[bucketName][key];
    }
    
    callback && process.nextTick(function () {
        callback(null);
    });
    
    return this;
};

Cache.prototype.setExpiration = function (bucketName, key, ms, callback) {
    var cache = this,
        bucket = this._store[bucketName] = this._store[bucketName] || { __expirations: {} };
    
    var expire = bucket.__expirations[key] = _.debounce(function () {
        cache.invalidate(bucketName, key);
        delete bucket.__expirations[key];
    }, ms);
    
    callback && process.nextTick(function () {
        callback(null);
    });
    
    expire();
    
    return this;
};


module.exports = Cache;