module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define("User", {
        user: {
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            }
        },
        email: {
            type: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1],
                    isEmail: true
                }

            }
        }
    });

    User.assoicate = models => {
        User.hasMany(models.Reviews, models.Orders, {
            onDelete: "CASCADE"
        })
    }

    return User
}