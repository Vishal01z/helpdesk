module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: { type: DataTypes.TEXT, allowNull: false },
    ticketId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
  };

  return Comment;
};
