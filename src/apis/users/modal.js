import sequelize from "../../db/index.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
  
);

export default User;