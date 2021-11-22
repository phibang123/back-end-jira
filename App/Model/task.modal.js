const { DataTypes } = require("sequelize")



const createTaskModel = (sequelize) =>
{
  return sequelize.define("task_table", {
    taskId: {
      type: DataTypes.INTEGER, //  
      primaryKey: true,
      autoIncrement: true,
      collate: 'utf8_unicode_ci', 
    },
    taskName: {
      type: DataTypes.STRING, 
      allowNull: false,
      collate: 'utf8_unicode_ci',   
    },
    originalEstimate: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      collate: 'utf8_unicode_ci',
      defaultValue: 0
    },
    timeTrackingSpent: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      defaultValue: 0
    },
    timeStrackingRemaining: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      collate: 'utf8_unicode_ci', 
      defaultValue: 0
    },
    createTaskDate: {
      type: DataTypes.DATE,
      allowNull: false,
      collate: "utf8_unicode_ci",
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: "task",
    timestamps: true,  //tắt chế độ tự động thêm craeteAt updateAt(failt)
  })
}

module.exports = {
  createTaskModel
}