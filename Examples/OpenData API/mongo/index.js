const MongoClient = require('mongodb').MongoClient;

let state = {
    db: null,
};

function connect(url, done) {
    if (state.db) return done();

    MongoClient.connect(url, (err, db) => {
        if (err) return done(err);
        state.db = db;
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
