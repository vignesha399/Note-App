import { ChangeEvent, FocusEventHandler, ReactNode } from "react";

export interface IPopup {
  openPop: boolean;
  setOpenPopTrue: () => void;
  setOpenPopFalse: () => void;
}
interface ICustomSelectProps {
  id: string;
  labelId: string;
  label: string;
  value: string;
  options: {title: string, value: string}[];
  handleChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child?: ReactNode) => void;
  errors: (err: string[]) => void; // err or it's assignee must be Observable else rerender must happen manually or else error will not appear
  onBlur?: (FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>);
  onBlurError?: boolean;
  name?: string;
  error?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  defaultValue?: string;
}
interface ICustomTextProps {
  id: string;
  labelId: string;
  label: string;
  value: string;
  handleChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child?: ReactNode) => void;
  errors: (err: string[]) => void; // err or it's assignee must be Observable else rerender must happen manually or else error will not appear
  onBlur?: (FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>);
  onBlurError?: boolean;
  name?: string;
  error?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
  required?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  defaultValue?: string;
}