module.exports = (sequelize, DataTypes) => {
    var Orders = sequelize.define("Orders", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        order: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })
    Orders.assoicate = models => {
        Orders.belongsTo(models.User, {
            foreignKey: {
                allowNull: flalse
            }
        })
    }
    return Orders
}