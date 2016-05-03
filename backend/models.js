/* global module, __dirname, process */
var Sequelize = require('sequelize');
module.exports = function () {
    var sequelize = new Sequelize(process.env.DATABASE_URL);
    var UserModel = sequelize.define('User', {
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING(125),
            allowNull: true
        },
        profile_image: Sequelize.TEXT,
        provider_name: Sequelize.STRING,
        provider_uid: Sequelize.STRING,
    }, {
        createdAt: 'created',
        updatedAt: 'modified',
        deletedAt: 'deleted',
        paranoid: true,
        underscored: true,
    });

    return {
        sequelize: sequelize,
        Sequelize: Sequelize,
        models: {
            UserModel: UserModel
        }
    };
}
