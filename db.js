function createKnexConnection() {
    const result = knex({
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        debug: true
    });

    return result;
}

function find(knexConnection, tableName, dataIdentifier = {}) {
    return knexConnection(tableName)
        .select()
        .where(dataIdentifier);
}

function save(knexConnection, tableName, data) {
    return knexConnection(tableName)
        .insert(data)
        .returning("*");
}

function update(knexConnection, tableName, dataIdentifier, newData) {
    return knexConnection(tableName)
        .update(newData)
        .where(dataIdentifier)
        .returning("*");
}

function remove(knexConnection, tableName, dataIdentifier) {
    return knexConnection(tableName)
        .delete()
        .where(dataIdentifier)
        .returning("*");
}

module.exports = {
    find,
    createKnexConnection,
    save,
    update,
    remove,
}