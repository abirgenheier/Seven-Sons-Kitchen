module.exports = (sequelize, DataTypes) => {
    var Reviews = sequelize.define("Reviews", {
        user: DataTypes.STRING,
        rating: DataTypes.INTEGER,
        review: DataTypes.STRING,
    })
    return Reviews
}