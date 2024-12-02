import React from "react";
import { DropdownFrame } from "../fields/fields.tsx";
import { Button, capitalize, ClickAwayListener } from "@mui/material";
import { clicked } from "../../store/createSlice.ts";
import { useDispatch, useSelector } from "react-redux";

type THeader = {
	data: { children: any; title: string; isClicked: boolean },
	headerDispatch: Function,
	runtimeHeader: string
}

export function Headers(props: THeader) {
	const header = props.data;
	const runtimeHeader = useSelector((state: any) => state.runtimeHeaders);
	const dispatch = useDispatch();

	const dispatcher = () => {
		if(runtimeHeader[props.data.title]?.isClicked){
			dispatch(clicked(''));
		}
	}

	return (
		<ClickAwayListener onClickAway={dispatcher}>
			<div>
				<p className="cursor-pointer p-1 hover:bg-gray-100 rounded select-none" onClick={(e: any) => props.headerDispatch(e)}>
					{capitalize(header.title)}
				</p>
				<DropdownFrame isClicked={header.isClicked} section={props.data} />
			</div>
		</ClickAwayListener>
	);
}
