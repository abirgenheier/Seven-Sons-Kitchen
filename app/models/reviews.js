module.exports = (sequelize, DataTypes) => {
    var Reviews = sequelize.define("Reviews", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    })

    Reviews.associate = models => {
        Reviews.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Reviews
}