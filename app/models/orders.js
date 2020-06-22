var moment = require('moment')
module.exports = (sequelize, DataTypes) => {
    var Orders = sequelize.define("Orders", {
        name: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        order: {
            type: DataTypes.STRING
        },
        total: DataTypes.STRING,
        complete: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            //note here this is the guy that you are looking for                   
            get() {
                return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
            }
        }
    })

    return Orders
}