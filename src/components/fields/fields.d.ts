import React, { ReactElement } from "react";


export type TClicked = {
  isClicked: boolean;
  section: TSection;
}
export type TSection=  {
  children: [];
  title: string;
  isClicked: boolean
}
export declare function DropdownFrame(props:TClicked) : ReactElement;