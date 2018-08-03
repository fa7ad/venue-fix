import PouchDB from 'pouchdb'

function connectDB (dbname = Math.floor(Math.random() * 100)) {
  const {
    RAZZLE_DB_USER: username,
    RAZZLE_DB_PASS: password,
    RAZZLE_DB_PREFIX: prefix,
    RAZZLE_DB_HOST: dbhost,
    RAZZLE_DB_PORT: dbport
  } = process.env

  return new PouchDB(`http://${dbhost}:${dbport}/${prefix}${dbname}`, {
    auth: {
      username,
      password
    }
  })
}

export default connectDB
