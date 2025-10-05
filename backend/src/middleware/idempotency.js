module.exports = (sequelize, DataTypes) => {
  const Idempotency = sequelize.define('Idempotency', {
    key: { type: DataTypes.STRING, primaryKey: true },
    responseBody: DataTypes.TEXT
  });
  return Idempotency;
};
