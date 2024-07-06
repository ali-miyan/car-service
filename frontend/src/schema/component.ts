import { ReactNode } from "react";

export interface InputProps {
  placeholder: string;
  width: string;
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
}

export interface ButtonProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
    hoverColor?: string;
    bgColor?: string;
    onClick?: () => void;
}