module.exports = (sequelize, DataTypes) => {
    var Orders = sequelize.define("Orders", {
        name: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        order: {
            type: DataTypes.STRING
        }
    })

    return Orders
}