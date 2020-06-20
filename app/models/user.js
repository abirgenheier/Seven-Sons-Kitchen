module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        user: DataTypes.STRING,
        email: DataTypes.STRING,
    });

    return User;
}