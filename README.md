#Prolific Cache

A dead simple, in-memory caching library for Node.js for use in development.

##Features

- Reading/writing by bucket and key
- Invalidation
- Expiration
- A reusable test suite to support new implementations

##API

###cache.write(bucket, key, value, callback)

Writes value to key within bucket, runs callback when operation is completed.

####Example:

	cache.write('testBucket', 'foo', 'bar', function (err) {
		
	});

###cache.read(bucket, key, callback)

Reads the value specified within the bucket by key, and returns value through asynchronous callback.

####Example:

	cache.read('testBucket', 'foo', function (err, value) {
		
	});

###cache.invalidate(bucket, key, callback)

Destroys the key within the specified bucket.

####Example:

	cache.invalidate('testBucket', 'foo', function (err) {
		
	});

###cache.setExpiration(bucket, key, milliseconds, callback)

Destroys the key within the specified bucket after the specified time. If any writes are made, the expiration is reset.

####Example:

	cache.setExpiration('testBucket', 'foo', 1000, function (err) {
		
	});
	
##Using the Test Suite

####Example:

	var Cache = require('prolific-cache'),
			RedisCache = require('../lib/RedisCache');
			
	Cache.TestSuite('Caching using Redis', new RedisCache());
	
This will automatically run Mocha tests against the cache implementation.