const MongoClient = require('mongodb').MongoClient;

// const DEV_URI = "mongodb://localhost:27017/opendata";

let state = {
    db: null,
};

function connect(url, done) {
    if (state.db) return done();

    MongoClient.connect(url, (err, db) => {
        if (err) return done(err);
        state.db = db;
        // console.log('>>>>>>> ' + db);
        done();
    });
}

async function get() {
    return state.db;
}

function close(done) {
    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
}

module.exports = {
    connect,
    get,
    close
}

/*function connect(url) {
    return MongoClient.connect(url).then(client => client.db);
}

async function getDatabases() {
    let databases = await Promise.all([connect(DEV_URI)]);

    return {
        development: databases[0]
    };
}

module.exports = getDatabases;*/
