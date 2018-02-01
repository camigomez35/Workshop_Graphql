'use strict'
// Es un esquema de consulta! No accede directamente a la base de datos.

const resolver = {
    Query: {
        // Root viene Indenfinido
        shows(root, args, { showConnector }) {
            let results = [];

            try {
                results = showConnector.getShows();
            } catch (err) {
                throw new Error('Error: find all shows')
            }

            return results;
        },
        showById(root, args, { showConnector }) {
            let results = {};

            try {
                results = showConnector.getShowById(args.id);
            } catch (err) {
                throw new Error('Error: find show by id')
            }

            return results;
        }
    },
    Show: {
        // Como viene de Show, el root pasa a ser toda la info del padre
        akas({ id }, args, { showConnector }) {
            let results = [];
            try {
                results = showConnector.getShowsAkas(id);
            } catch (err) {
                throw new Error('Error: find all akas')
            }

            return results;
        }
    }
};


module.exports = resolver;