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
  subServices: string[];
}

export interface LoadingButtonProps {
  isLoading: boolean;
  buttonText: string;
  color?:string;
  onClick?: (e: FormEvent<HTMLFormElement>) => Promise<void> | (()=>void) | MouseEventHandler<HTMLButtonElement>;
  width: string;
  height: string;
}
