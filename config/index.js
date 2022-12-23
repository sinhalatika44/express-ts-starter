import development  from "./development";
import production from "./production";

module.exports = function() {
    switch(process.env.NODE_ENV) {
        case 'development':
            return development;
        case 'production':
            return production;
        default:
            return development;
    }
}

module.exports = {
    development,
    production,
}