var should = require('should');

module.exports = function (description, cache) {
    describe(description, function () {
        it('reading and writing strings', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                VALUE = 'bar';
        
            cache.write(BUCKET, KEY, VALUE, function (err) {
                should.not.exist(err);
            
                cache.read(BUCKET, KEY, function (err, value) {
                    should.not.exist(err);
                    value.should.equal(VALUE);
                    cache.invalidate(BUCKET, KEY, done);
                });
            });
        });
    
        it('reading and writing objects', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                OBJECT = { foo: 'bar' };
        
            cache.write(BUCKET, KEY, OBJECT, function (err) {
                should.not.exist(err);
            
                cache.read(BUCKET, KEY, function (err, obj) {
                    should.not.exist(err);
                    obj.foo.should.equal(OBJECT.foo);
                    cache.invalidate(BUCKET, KEY, done);
                });
            });
        });
    
        it('reading and writing booleans', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                VALUE = true;
        
            cache.write(BUCKET, KEY, VALUE, function (err) {
                should.not.exist(err);
            
                cache.read(BUCKET, KEY, function (err, value) {
                    should.not.exist(err);
                    value.should.equal(VALUE);
                    cache.invalidate(BUCKET, KEY, done);
                });
            });
        });
    
        it('reading and writing numbers', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                VALUE = Math.random();
        
            cache.write(BUCKET, KEY, VALUE, function (err) {
                should.not.exist(err);
            
                cache.read(BUCKET, KEY, function (err, value) {
                    should.not.exist(err);
                    value.should.equal(VALUE);
                    (value + '').should.not.equal(VALUE);
                    cache.invalidate(BUCKET, KEY, done);
                });
            });
        });
        
        it('expiration', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                VALUE = 'foobar';
        
            cache.write(BUCKET, KEY, VALUE, function (err) {
                should.not.exist(err);
                
                cache.setExpiration(BUCKET, KEY, 5);
                
                setTimeout(function () {
                    cache.read(BUCKET, KEY, function (err, value) {
                        should.not.exist(value);
                        done();
                    });
                }, 50);
            });
        });
        
        it('invalidation', function (done) {
            var BUCKET = '__testBucket',
                KEY = Math.random(),
                VALUE = 'foobar';
        
            cache.write(BUCKET, KEY, VALUE, function (err) {
                should.not.exist(err);
                
                cache.invalidate(BUCKET, KEY, function (err) {
                    should.not.exist(err);
            
                    cache.read(BUCKET, KEY, function (err, value) {
                        should.not.exist(value);
                        done();
                    });
                });
            });
        });
    });
};