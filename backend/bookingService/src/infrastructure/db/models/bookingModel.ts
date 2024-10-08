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
    | "Booking Completed"
    | "Booking Cancelled";
  serviceId: string;
  typeOfPackage: string;
  generalServiceId: string;
  servicePlace: string;
  serviceInfo: object;
  totalPrice: number;
  cancelReason?: string;
  refundStatus?: "pending" | "completed";
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
    | "Booking Completed"
    | "Booking Cancelled";
  public serviceId!: string;
  public typeOfPackage!: string;
  public generalServiceId!: string;
  public servicePlace!: string;
  public serviceInfo!: object;
  public totalPrice!: number;
  public cancelReason?: string;
  public refundStatus?: "pending" | "completed";
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
        "Ready for Pickup",
        "Booking Cancelled"
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
    serviceInfo: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cancelReason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refundStatus: {
      type: DataTypes.ENUM("pending", "completed"),
      defaultValue: "pending",
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "bookings",
    timestamps: true,
  }
);

export default Booking;
