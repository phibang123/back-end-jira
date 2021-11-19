const { DataTypes } = require("sequelize")



const createStatusModel = (sequelize) =>
{
  return sequelize.define("status_table", {
    statusId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    statusName: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
    alias: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      unique: true
    },
  }, {
    tableName: "status",
    timestamps: false,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createStatusModel
}