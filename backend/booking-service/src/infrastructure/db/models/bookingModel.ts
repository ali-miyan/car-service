import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../postgreConfig/connectDb";

interface BookingAttributes {
  id: string;
  userId: string;
  carId: string;
  companyId: string;
  date: string;
  payment: string;
  address: object;
  status:
    | "Booking Pending"
    | "Booking Confirmed"
    | "Driver Assigned"
    | "Driver En Route"
    | "Car Picked Up"
    | "Car Arrived at Service Center"
    | "Service In Progress"
    | "Service Completed"
    | "Car En Route Back"
    | "Car Delivered"
    | "Ready for Pickup"
    | "Booking Completed";
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
  public id!: string;
  public userId!: string;
  public carId!: string;
  public companyId!: string;
  public date!: string;
  public payment!: string;
  public address!: object;
  public status!:
    | "Booking Pending"
    | "Booking Confirmed"
    | "Driver Assigned"
    | "Driver En Route"
    | "Car Picked Up"
    | "Car Arrived at Service Center"
    | "Service In Progress"
    | "Service Completed"
    | "Car En Route Back"
    | "Car Delivered"
    | "Ready for Pickup"
    | "Booking Completed";
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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
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
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Booking Pending",
        "Booking Confirmed",
        "Driver Assigned",
        "Driver En Route",
        "Car Picked Up",
        "Car Arrived at Service Center",
        "Service In Progress",
        "Service Completed",
        "Car En Route Back",
        "Car Delivered",
        "Booking Completed",
        "Ready for Pickup"
      ),
      defaultValue: "Booking Pending",
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
