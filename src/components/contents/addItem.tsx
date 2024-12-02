import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setNumberIncrement } from "../../store/createSlice.ts";
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


export let AddItem = function () {
  const store = useSelector((state: any) => state.authLogin);
  const dispatch = useDispatch();
  let items: any[]=[]
  addSerialNum();
  let number: number = store.number;
  // useEffect(() => {
  //   // number = store.number
  //   dispatch(setNumberIncrement());
    
  // },[])
  
  const item = () => {
    return (
      <>
        <tr style={{ "backgroundColor": "rgb(203, 247, 237)" }}>
          <td id={`sno${number}`} className="class" contentEditable>
          </td>
          <td
            id={`itemname${number}`}
            className={"class"}
            contentEditable={true}
          ></td>
          <td id={`quantity${number}`}>
            <input
              style={{
                outline: "none",
                border: "none",
                width: "100%",
                height: "100%",
                textAlign: "center",
              }}
              type="number"
              min={0}
              width={"fit-content"}
              onChange={(e) => calculate("quantity" + number)}
            />
          </td>
          <td id={`price${number}`}>
            <input
              style={{
                outline: "none",
                border: "none",
                width: "100%",
                height: "100%",
                textAlign: "center",
              }}
              type="number"
              min={0}
              width={"fit-content"}
              onChange={() => calculate("price" + number)}
            />
          </td>
          <td
            id={`total${number}`}
            className={"class"}
            // contentEditable={totalEditable}
          ></td>
          <td id={`delt${number}`} onClick={() => removeElement("delt" + number)}>
            <p
              style={{
                "backgroundColor": "red",
                "textAlign": "center",
                "borderRadius": "50px",
                height: "50%",
                padding: "5px",
                cursor: "default",
                maxHeight: "30px",
                maxWidth: "30px",
              }}
            >
              X
            </p>
          </td>
        </tr>
      </>
    );
  }

  // let number: number;
  // for (number = 0; number <= store.number; number++) {
  //   console.log(number, 'loop', store.number)
  //   items.push(item(number));
  // }

  // function addCol(){
  //   (function check(){
  //     let cname: string[] =[];
  //     let output: any = document.cookie;
  //     console.log(cname = output.split(';'));
  
  //   })();
  //     let td1 = document.createElement('td');
  //     td1.setAttribute('id',`sno${number}`)
  //     td1.setAttribute('class',`class sno`)
  //     let td2 = document.createElement('td');
  //     td2.setAttribute('id',`itemname${number}`)
  //     td2.setAttribute('class',`class`)
  //     td2.setAttribute('contenteditable','')
  //     let td3 = document.createElement('td');
  //     td3.setAttribute('id',`quantity${number}`)
  //     td3.setAttribute('class',`class`)
  //     td3.setAttribute('contenteditable','')
  //     td3.setAttribute('onkeydown',`calculate(quantity${number})`)
  //     let td4 = document.createElement('td');
  //     td4.setAttribute('id',`price${number}`)
  //     td4.setAttribute('class',`class`)
  //     td4.setAttribute('contenteditable','')
  //     // td4.setAttribute('onclick',`calculate(price${number})`)
  //     td4.setAttribute('onkeydown',`calculate(price${number})`)
  //     let td5 = document.createElement('td')
  //     td5.setAttribute('id',`total${number}`)
  //     td5.setAttribute('class',`class`)
  //     let td6 = document.createElement('td')
  //     td6.setAttribute('id',`delt${number}`)
  //     td6.setAttribute('class',`class`)
  //     td6.setAttribute('onclick',`removeElement(delt${number})`)
  //     td6.setAttribute('style',"background-color:red;text-align: center; border-radius:50px;hight:50%;")
  //     td6.innerText = 'x';
  //     let tr = document.createElement('tr')
  //     tr.setAttribute('id',`tr${number}`)
  //     tr.setAttribute('class',`class`)
  //     tableGroceList.append(tr);tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);tr.append(td5);tr.append(td6);
  //     addSerialNum();
  // }  
  items.push(item());
  console.log(item().type)
  // items.push(addCol());
  return items;
};

// remove rows
export function removeElement(delt: string) {
  let reg = /\d+/g;
  let id = reg.exec(delt!)![0];
  console.log(id, reg)
  if (
    document.getElementById("quantity" + id)!.parentElement?.previousElementSibling?.firstElementChild?.nextElementSibling?.nextElementSibling
  ) {
    let orgID = document
      .getElementById("quantity" + id)!
      .parentElement!.previousElementSibling!.firstElementChild!.nextElementSibling!.nextElementSibling!.getAttribute(
        "id"
      );
    calculate(`quantity${reg.exec(orgID!)![0]}`);
  } else if (
    document.getElementById("quantity" + id)!.parentElement!.nextElementSibling!.firstElementChild?.nextElementSibling?.nextElementSibling
  ) {
    let orgID = document
      .getElementById("quantity" + id)!
      .parentElement!.nextElementSibling!.firstElementChild!.nextElementSibling!.nextElementSibling!.getAttribute(
        "id"
      );
    calculate(`quantity${reg.exec(orgID!)![0]}`);
    console.log('else if condition', reg.exec(orgID!), orgID);
  } else {
    document.getElementById("toAV")!.textContent = '0';
  }
  console.log(delt);
  document.getElementById(delt)!.parentElement!.remove();
  addSerialNum();
}
// adding serial number
function addSerialNum() {
  let arr = document.getElementsByTagName("tr");
  for (let index = 1; index < arr.length; index++) {
    arr[index].firstElementChild!.textContent = index.toString();
  }
}
// calculate price
function calculate(eleId: string) {
  console.log(eleId)
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
    eleIdVal1 = parseInt((document.getElementById(eleId1)?.firstElementChild! as HTMLInputElement).value);
    eleIdVal2 = parseInt((document.getElementById(eleId2)?.firstElementChild! as HTMLInputElement).value);
    if (
      (document.getElementById(eleId1)?.firstElementChild as HTMLInputElement).value == null ||
      undefined ||
      NaN
    ) {
      eleIdVal1 = 1;
    }
    if (
      (document.getElementById(eleId2)?.firstElementChild! as HTMLInputElement).value == null ||
      undefined ||
      NaN
    ) {
      eleIdVal2 = 1;
    }
    v2 = eleIdVal1 * eleIdVal2;
    if (
      (document.getElementById(eleId)?.firstElementChild! as HTMLInputElement).value == null ||
      undefined ||
      NaN
    ) {
      document.getElementById(total)!.textContent = '0';
    } else {
      document.getElementById(total)!.textContent = v2.toString();
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
          htmlElement!.offsetWidth > 999 ? htmlElement!.offsetWidth + 10 : 999,
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
