"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    database: {
        host: 'localhost',
        user: process.env.HOSTUSER || 'root',
        password: process.env.HOSTPASS || '',
        database: process.env.HOSTPREFDB || '' + 'UTM'
    }
};
