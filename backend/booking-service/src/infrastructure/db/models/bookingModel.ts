import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../postgreConfig/connectDb";

interface BookingAttributes {
  id: number;
  userId: string;
  date: string;
  serviceType: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  serviceId: string;
  typeOfPackage: string;
  generalServiceId: string;
  servicePlace: string;
  totalPrice: number;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, "id"> {}

class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  public id!: number;
  public userId!: string;
  public date!: string;
  public serviceType!: string;
  public status!: "pending" | "confirmed" | "completed" | "cancelled";
  public serviceId!: string;
  public typeOfPackage!: string;
  public generalServiceId!: string;
  public servicePlace!: string;
  public totalPrice!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    generalServiceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "completed", "cancelled"),
      defaultValue: "pending",
    },
    typeOfPackage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servicePlace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "bookings",
    timestamps: true,
  }
);

export default Booking;
