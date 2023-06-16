"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSortByParam = void 0;
const normalizeSortByParam = (sortBy) => {
    switch (sortBy) {
        case 'Name':
            return ['name', 'ASC'];
        case 'Newest':
            return ['year', 'DESC'];
        case 'Price-Up':
            return ['fullPrice', 'ASC'];
        case 'Price-Down':
            return ['fullPrice', 'DESC'];
        default:
            return ['name', 'ASC'];
    }
};
exports.normalizeSortByParam = normalizeSortByParam;
