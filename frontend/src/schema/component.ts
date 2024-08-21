import { FormEvent, MouseEventHandler, ReactNode } from "react";

export interface InputProps {
  placeholder: string;
  width: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalPopsCustom {
  isOpen: boolean;
  onClose: () => void;
  refetch?:()=>void;
  data?:string;
  servicePlace?:string
  id?:string;
}

export interface MainLayoutProps {
    children: ReactNode;
}

export interface ModalProps {
  open?:boolean;
  width?: number;
  height?: number;
  buttonLabel?: string;
  title?: string;
  children: React.ReactNode;
  disableClose?:boolean
  onClose?: () => void | undefined | void;
  packages?:object[]
}

export interface PlaceCard {
  title: string;
  subtitle: string;
  imageSrc: string;
  features: string[];
  style?: string;
  isDisabled?:boolean;
  handleNext?: () => void
}

export interface ButtonProps {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    hoverColor?: string;
    bgColor?: string;
    onClick?: () => void;
}

export interface FormState {
  serviceName: string;
  description: string;
  logo: File | null;
  subServices: string[];
}
export interface serviceForm {
  terms: string;
  workImages: File | [];
  servicesPerDay?: string,
  subServices: string[];
}
export interface serviceForm {
  terms: string;
  workImages: File | [];
  servicesPerDay?: string,
  subServices: string[];
}

export interface IUserDetails {
  userId: string;
  username?: string;
  userImg?: string;
}

export interface ICompanyDetails {
  companyId: string;
  companyName?: string;
  companyImg?: string;
}

export interface IMessageData {
  _id?:string
  sender: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
}

export interface IChatData {
  _id?: string;
  user: IUserDetails;
  company: ICompanyDetails;
  messages: IMessageData[];
}


export interface LoadingButtonProps {
  isLoading: boolean;
  buttonText: string;
  color?:string;
  onClick?: (e: FormEvent<HTMLFormElement>) => Promise<void> | (()=>void) | MouseEventHandler<HTMLButtonElement>;
  width: string;
  height: string;
}

export const statusMessages: { [key: string]: string } = {
  "Booking Pending": "Your booking is in the queue and awaiting confirmation.",
  "Booking Confirmed": "Your booking has been confirmed. We will update you shortly.",
  "Driver Assigned": "A driver has been assigned to your booking.",
  "Driver En Route": "The driver is on their way to your location.",
  "Car Picked Up": "Your car has been picked up and is en route to the service center.",
  "Car Arrived at Service Center": "Your car has arrived at the service center.",
  "Service In Progress": "The service on your car is currently in progress.",
  "Service Completed": "The service on your car has been completed.",
  "Car En Route Back": "Your car is on its way back to you.",
  "Car Delivered": "Your car has been delivered back to you.",
  "Booking Completed": "Your booking process is complete. Thank you for choosing us!",
  "Ready for Pickup": "Your car is ready for pickup.",
  "Booking Cancelled": "You have cancelled your booking. If this was a mistake or if you need further assistance, please contact us."

};
