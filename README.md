RestEmulator
===========

# Installation

    npm install --save-dev git+ssh://git@github.com/Eagle94T/rest-emulator

# Links

* [Gulp plugin](https://github.com/Eagle94T/gulp-rest-emulator)
* [Original Rest Emulator](https://github.com/temrdm/rest-emulator)

# Usage

## Express

    var express = require('express');
    var restEmulator = require('rest-emulator');

    var config = {
        '/api/users': {
            data: [
                {name: 'Name1'},
                {name: 'Name2'}
            ]
        }
    };

    var app = express();
    var restInstance = restEmulator(config);

    app.use(restInstance.middleware);

    app.listen(3000);

# Mock

## Example structure

  	mocks/
  	    default.js
  	    users/
  	        default.js
  	        custom.js
	    cities/
	       default.js
           custom.js
        country.js

## Mock syntax

### Basic

```
module.exports = {
    '/api/users': {
        data: [
            { name: 'John' },
            { name: 'Adam' }
        ],
        headers: {
            ETag: '12345'
        }
    },
    '/api/cities': {
        data: [
            { name: 'New York' },
            { name: 'Miami' }
        ],
        query: {
            'name=Miami': {
                data: [
                    { name: 'Miami' }
                ]
            },
            'name=New York': {
                data: [
                    { name: 'New York' }
                ]
            }
        },
        code: 200,
        timeout: 5000
    }
};
```

### Default

```
module.exports = {
    '/api/users': {
        GET: {
            data: [
                { name: 'John' },
                { name: 'Adam' }
            ],
            headers: {
                ETag: '12345'
            }
            query: {
                'name=John': {
                    data: [
                        { name: 'John' }
                    ]
                }
            }
        },
        POST: {
            data: {
                success: true
            },
            code: 201,
            timeout: 1000
        }
    }
};
```

### Full (with presets)

```
module.exports = {
    '/api/users': {
        GET: {
            default: {
                data: [
                    { name: 'John' },
                    { name: 'Adam' }
                ],
                code: 200,
                timeout: 0
            },
            blank: {
                data: [],
                code: 200,
                timeout: 0,
                headers: {
                    ETag: '12345'
                }
            },
            increase: {
                data: [
                    { name: 'John' },
                    { name: 'Adam' },
                    { name: 'Clark' },
                    { name: 'Earl' }
                ],
                code: 200,
                timeout: 0
            }
        },
        POST: {
            default: {
                data: {
                    success: true
                },
                code: 201
            },
            error: {
                code: 405
            }
        }
    },
    '/api/cities': {
        'GET': {
            data: [
                { name: 'New York' },
                { name: 'Miami' }
            ],
             query: {
                 'name=Miami': {
                     data: [
                         { name: 'Miami' }
                     ]
                 },
                 'name=New York': {
                     data: [
                         { name: 'New York' }
                     ]
                 }
             }
        }
    }
};
```

### With dynamic data

```
module.exports = {
    '/api/users': {
        GET: {
            data: function(req) {
	    	return {
		    name: "John",
		    timestamp: new Date(),
		}
	    }
        }
    }
};
```

### With dynamic code

```
module.exports = {
    '/api/users/code': {
        GET: {
            default: {
                data: {
                    success: true
                },
                code: function(req) {
                    if (req.body.sample_parameter) {
                        return 200;
                    } else {
                        return 404;
                    }
                }
            }
        }
    }
};
```

### With raw data (e.g. HTML data)

```
module.exports = {
    '/api/users/raw': {
        GET: {
            default: {
                data: "<h1>Hello World!</h1>",
                raw: true,
                headers: {
                    "content-type": "text/html; charset=UTF-8"
                }

            }
	}
    },
    '/api/users/raw/file': {
    GET: {
      default: {
        data: function () {
          let fs = require('fs');
          let filename = require.resolve('./sample.html');
          return fs.readFileSync(filename, 'utf-8');
        },
        headers: {
          "content-type": "text/html; charset=UTF-8"
        },
        raw: true
      }
    }
  }
};
```

### RegExp path

```
module.exports = {
    '\/api\/user\/(\d*)': {
        GET: {
            data: function(req) {
                return {
                    name: "John"
                }
            }
        }
    }
};
```
