import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../postgreConfig/connectDb";

interface UserId {
  _id: string;
  username: string;
  email: string;
  phone: string | null;
}

interface UserAttributes {
  id: string;
  carId: string;
  userId: UserId;
  name: string;
  color: string;
  src: string;
  vin: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public carId!: string;
  public userId!: UserId;
  public name!: string;
  public color!: string;
  public src!: string;
  public vin!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    carId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default Users;
