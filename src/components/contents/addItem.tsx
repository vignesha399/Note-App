import React from "react";
import { useDispatch } from "react-redux"
import { addRow } from "../../store/createSlice.ts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Button,
  IconButton,
  Dialog,
  styled,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { commonHook, updatedRows } from "./create.tsx";


// remove rows
export function removeElement(delt: string, cb?: any) {
  document.getElementById('tableGroceList')!.addEventListener('load', (ev: Event) => {
  })
  let reg = /\d+/g;
  let id = reg.exec(delt!)![0];
  if (
    document.getElementById("quantity" + id)!.parentElement?.previousElementSibling?.firstElementChild?.nextElementSibling?.nextElementSibling
  ) {
    // let orgID = document
    //   .getElementById("quantity" + id)!
    //   .parentElement?.previousElementSibling?.firstElementChild!.nextElementSibling!.nextElementSibling!.getAttribute(
    //     "id"
    //   );
    calculate(`quantity${id}`);
  } else if (
    document.getElementById("quantity" + id)!.parentElement?.nextElementSibling?.firstElementChild?.nextElementSibling?.nextElementSibling
  ) {
    let orgID = document
      .getElementById("quantity" + id)!
      .parentElement?.nextElementSibling?.firstElementChild?.nextElementSibling?.nextElementSibling?.getAttribute(
        "id"
      );
    calculate(`quantity${id}`);
  } else {
    document.getElementById("toAV")!.textContent = '0';
  }
  document.getElementById(delt)?.parentElement?.remove();
  let elementArray = document.getElementsByTagName('tr');
  // update removed rows in allrow
  for (let i = 1; i < elementArray.length; i++) {
    let element: HTMLTableRowElement[];
    element = [];
    element.push(elementArray[i]);

    // cb(element);
  }
  commonHook(addRow(updatedRows));
  addSerialNum();
}
// adding serial number
export function addSerialNum() {
  let arr = document.getElementsByTagName("tr");
  for (let index = 1; index < arr.length; index++) {
    arr[index].firstElementChild!.textContent = index.toString();
  }
}
// calculate price
export function calculate(eleId: string) {
  let regex = /\d+/g;
  let arr = document.getElementsByTagName("tr");
  let v = regex.exec(eleId)![0];
  let v2: any = 1;
  let eleId1 = "quantity" + v;
  let eleId2 = "price" + v;
  let total = "total" + v;
  let eleIdVal1: number;
  let eleIdVal2: number;
  let oValue = 0;
  setTimeout(() => {
    eleIdVal1 = parseInt((document.getElementById(eleId1) as HTMLTableCellElement)?.innerText);
    eleIdVal2 = parseInt((document.getElementById(eleId2) as HTMLTableCellElement)?.innerText);
    if ((document.getElementById(eleId1)! as HTMLTableCellElement) &&
      Number.isNaN(parseInt((document.getElementById(eleId1)! as HTMLTableCellElement).innerText))
    ) {
      eleIdVal1 = 0;
    }
    if (
      (document.getElementById(eleId2)! as HTMLTableCellElement) &&
      Number.isNaN(parseInt((document.getElementById(eleId2)! as HTMLTableCellElement).innerText))
    ) {
      eleIdVal2 = 0;
    }
    v2 = eleIdVal1 * eleIdVal2;
    if (
      document.getElementById(eleId) &&
      (document.getElementById(eleId)! as HTMLTableCellElement) &&
      Number.isNaN(parseInt((document.getElementById(eleId)! as HTMLTableCellElement).innerText))
    ) {
      (document.getElementById(total) as HTMLTableCellElement).textContent = '0';
    } else if (document.getElementById(eleId)) {
      (document.getElementById(total) as HTMLTableCellElement).textContent = v2.toString();
    }
  }, 0.4);
  setTimeout(() => {
    for (let index = 1; index < arr.length; index++) {
      let temp = parseFloat(
        arr[index].firstElementChild!.nextElementSibling!.nextElementSibling!
          .nextElementSibling!.nextElementSibling!.textContent!
      ),
        value: number;
      if (temp.toString().trim() === "NaN".toString()) {
        value = 0;
      } else {
        value = temp;
      }
      oValue = oValue + value;
      let text = document.getElementById("toAV")!.textContent;
      if (parseInt(text!) >= 0 || !isNaN(parseInt(text!))) {
        document.getElementById("toAV")!.textContent = oValue.toString();
      } else {
        document.getElementById("toAV")!.textContent = '0';
      }
    }
  }, 0.5);
  addSerialNum()
}

export function PrintPage(props: { open: { openPop: any; setOpenPop: any; typoGText: any; buttonName: any; }; }) {
  const { openPop, setOpenPop, typoGText, buttonName } = props.open;

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(1),
      "margin-right": theme.spacing(5),
      "margin-top": theme.spacing(3),
      "margin-left": theme.spacing(2),
      "margin-bottom": theme.spacing(0),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const handleClose = () => {
    setOpenPop(false);
  };
  const handleSave = () => {
    downloadFile();
    handleClose();
  };

  const downloadFile = () => {
    const htmlElement =
      document.getElementById("downloaddiv")!.offsetWidth <
        document.getElementById("tableGroceListTable")!.offsetWidth
        ? document.getElementById("tableGroceListTable")
        : document.getElementById("downloaddiv");

    html2canvas(htmlElement!).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [
          htmlElement!.scrollHeight + 10,
          htmlElement!.offsetWidth,
        ],
      });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 50, 50, 50, 50);
      pdf.save("Grocery list");
    });
  };
  return (
    <React.Fragment>
      {openPop ? (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openPop}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>{typoGText}</Typography>
          </DialogContent>
          <hr />
          <DialogActions>
            <Button autoFocus onClick={handleSave}>
              {buttonName}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

// function alertBox(alertMessage) {
//   let container = document.createElement("div");
//   container.setAttribute("id", "alertBoxContainer");
//   container.setAttribute(
//     "style",
//     "position: absolute;max-width: 10%;min-width: 200px; border:1px solid white;padding: 2%;border-radius: 7px; top:50%;left:50%;transform: translate(-50%, -50%);background-color:#fff;box-shadow: 10px 5px 5px black; font-family: Lucida Sans;cursor:pointer"
//   );
//   let p = document.createElement("p");
//   p.setAttribute("id", "alertp");
//   p.setAttribute("style", "margin:0px; padding: 3px;font-size:20px;");
//   p.innerText = alertMessage;
//   let textArea = document.createElement("textarea");
//   textArea.setAttribute(
//     "style",
//     "border: none;width: 80%; height: 20px;border-bottom:1px solid black;resize: none"
//   );
//   textArea.setAttribute("id", "textarea");
//   let okButton = document.createElement("button");
//   okButton.setAttribute("value", "ok");
//   okButton.setAttribute("id", "okButton");
//   okButton.setAttribute("onClick", "alertbox.reqd()");
//   okButton.innerText = "ok";
//   okButton.setAttribute(
//     "style",
//     "border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans"
//   );
//   let canButton = document.createElement("button");
//   canButton.setAttribute("value", "cancel");
//   canButton.setAttribute("id", "canButton");
//   canButton.setAttribute("id", "canButton");
//   canButton.innerText = "cancel";
//   canButton.setAttribute(
//     "style",
//     "border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans"
//   );
//   document.body.appendChild(container);
//   container.append(p);
//   container.append(textArea);
//   container.append(okButton);
//   container.append(canButton);
//   let textValue;
//   let bool = (document.getElementById("okButton").onClick = function () {
//     (textValue = document.getElementById("textarea").value);
//     // localStorage.setItem("textValue",textValue)
//     document.getElementById("alertBoxContainer").remove();
//     textValue = bool();
//     return textValue;
//   });
//   //  iframe.contentDocument
//   return textValue;
// }
