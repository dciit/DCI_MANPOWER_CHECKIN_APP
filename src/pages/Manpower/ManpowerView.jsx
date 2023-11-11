import {
  Avatar,
  Divider,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
("../Service");
import {
  API_CHECK_INOUT,
  API_GET_LAYOUT,
  API_GET_MASTER,
  API_GET_MQ,
  API_GET_OBJECT_BY_CODE,
  API_GET_OBJECT_INFO,
  API_GET_OBJECT_OF_LAYOUT,
  API_GET_SA,
} from "../../Service";
import DialogCheckin from "../../components/DialogCheckin";
import { useParams } from "react-router";
import { DoubleArrow } from "@mui/icons-material";
import { useDispatch } from "react-redux";
function ManpowerView() {
  let { layout } = useParams();

  const [openCheckIn, setOpenCheckIn] = useState(false);
  // const [layouts, setLayouts] = useState([]);
  // const [layoutSelected, setLayoutSelected] = useState('');
  const [masters, setMasters] = useState([]);
  const [objects, setObjects] = useState([]);
  const [objectCode, setObjectCode] = useState({});
  const [objSelected, setObjSelected] = useState({});
  const [layoutSelected, setLayoutSelected] = useState({});
  const dispatch = useDispatch();
  // const [inpEmpCode,setInpEmpCode] = useState()
  const ThemeTrue = {
    bg: ["yellow", "#bba17a", "#b88a45"],
    text: "#333333",
  };
  const ThemeFalse = {
    bg: ["#fff", "#6d1803", "#6d210f"],
    text: "white",
  };
  // const dispatch = useDispatch();
  let svgContent = "";
  useEffect(() => {
    init();
    if (!openCheckIn) {
      setObjSelected({});
    }
  }, [openCheckIn]);

  const init = async () => {
    const getLayout = await API_GET_LAYOUT(layout);
    if (getLayout != null && getLayout.length) {

      let mq = await API_GET_MQ();
      mq = mq.filter((itemMQ) => {
        return itemMQ.factory == getLayout[0].factory && itemMQ.subLine == getLayout[0].subLine
      })

      let sa = await API_GET_SA();
      sa = sa.filter((itemSA) => {
        return itemSA.factory == getLayout[0].factory && itemSA.subLine == getLayout[0].subLine
      })

      dispatch({
        type: 'SET_LAYOUT_SELECTED', payload: {
          layout: getLayout[0],
          mq: mq,
          sa: sa
        }
      });
      setLayoutSelected(getLayout[0]);
      await intialData();
    }
  };

  const intialData = async () => {
    // const listLayout = await API_GET_LAYOUT();
    // if (layoutSelected == '') {
    //     setLayoutSelected(listLayout[0])
    //     dispatch({ type: 'UPDATE_LAYOUT', payload: listLayout[0] })
    // }
    const listMaster = await API_GET_MASTER();
    const object = await API_GET_OBJECT_OF_LAYOUT({
      layoutCode: layout,
    });
    setMasters(listMaster);
    setObjects(object);
    svgContent = document.querySelector("#svgContent");
    svgContent.innerHTML = "";
    let svgMaster = "";
    let svg = "";
    object.map((elObj) => {
      svgMaster = elObj.objSvg;
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      let i = 0;
      let x = i * 100;
      if (elObj.objSvg.includes("animateMotion")) {
        const itemSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        elObj.objSvg = elObj.objSvg.replace("<defs>", "");
        elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
        elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);

        elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
        elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);

        // elObj.objSvg = elObj.objSvg.replace("{txtMQ}", elObj.empCode);
        (elObj.mq == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
          (theme, indexTheme) => {
            elObj.objSvg = elObj.objSvg.replace(`{bgmq}`, theme);
          }
        );

        // elObj.objSvg = elObj.objSvg.replace("{txtSA}", elObj.empCode);
        (elObj.sa == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
          (theme, indexTheme) => {
            elObj.objSvg = elObj.objSvg.replace(`{bgsa}`, theme);
          }
        );

        // elObj.objSvg = elObj.objSvg.replace("{txtOT}", elObj.empCode);
        (elObj.ot == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
          (theme, indexTheme) => {
            elObj.objSvg = elObj.objSvg.replace(`{bgot}`, theme);
          }
        );

        elObj.objSvg = elObj.objSvg.replace("{empImage}", elObj.empImage);

        // elObj.objSvg = elObj.objSvg.replace("{title_color_bg}", elObj.empcode != '' ? 'green' : 'red');
        itemSvg.innerHTML = elObj.objSvg;
        itemSvg.setAttribute("id", elObj.objCode);
        itemSvg.setAttribute("x", elObj.objX);
        itemSvg.setAttribute("y", elObj.objY);
        itemSvg.addEventListener("click", function () {
          setObjSelected(elObj);
          setOpenCheckIn(true);
        });
        svg.appendChild(itemSvg);
      } else if (elObj.objSvg.includes("svgTxtTitleMsg")) {
        let titleLen = elObj.objTitle.length;
        let titleWidth = titleLen * 8 + 20;
        const itemSvg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);

        itemSvg.innerHTML = elObj.objSvg;
        itemSvg.innerHTML = elObj.objSvg;
        itemSvg
          .querySelector("rect.svgTxtTitleBg")
          .setAttribute("width", titleWidth);

        itemSvg.setAttribute("id", elObj.objCode);
        itemSvg.setAttribute("x", elObj.objX);
        itemSvg.setAttribute("y", elObj.objY);
        svg.appendChild(itemSvg);
      } else {
        svgMaster = svgMaster.replace("{objName}", elObj.objTitle);
        svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
        svgMaster = svgMaster.replace(
          "{title_color_bg}",
          elObj.empcode != "" ? "green" : "red"
        );
        const blob = new Blob([svgMaster], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const use = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "use"
        );
        use.setAttribute("href", url + "#" + elObj.objMasterId);
        use.setAttribute("id", elObj.objCode);
        use.setAttribute("x", elObj.objX);
        use.setAttribute("y", elObj.objY);
        use.addEventListener("click", function () {
          if (elObj.objType == "MP") {
            setObjSelected(elObj);
            setOpenCheckIn(true);
          }
        });
        svg.appendChild(use);
      }
      svgContent.appendChild(svg);
    });
    return true;
  };

  async function refreshObject(objCode) {
    const res = await API_GET_OBJECT_BY_CODE({ objCode: objCode });

    if (res[0].empCode != "") {
      document
        .querySelector(`svg#${objCode} .img_profile`)
        .setAttribute("href", res[0].empImage);
      document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "yellow";
      document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "yellow";
      document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "yellow";
      document.querySelector(`svg#${objCode} .txt_empcode`).textContent =
        res[0].empCode;
    } else {
      document
        .querySelector(`svg#${objCode} .img_profile`)
        .setAttribute("href", "");
      document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "#fff";
      document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "#fff";
      document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "#fff";
      document.querySelector(`svg#${objCode} .txt_empcode`).textContent = "";
    }
  }
  return (
    <div className="h-[100%] w-[100%] bg-white flex  ">
      <input type="hidden" id="inpObjCode" value={objSelected.objCode}></input>
      <input type="hidden" id="inpLayoutCode" value={layout}></input>
      <input type="hidden" id="inpEmpCode" value={""}></input>
      <input type="hidden" id="disEmpCode" value={objSelected.empCode}></input>
      <input type="hidden" id="inpYMD" value={""}></input>
      <input type="hidden" id="inpShift" value={""}></input>
      <input type="hidden" id="inpType" value={""}></input>

      <Stack sx={{ width: "100%" }}>
        <div className="h-[5%] flex items-center justify-center shadow-sm text-xl">
          {layoutSelected.layoutName} ({layoutSelected.layoutCode})
        </div>
        <div className="h-[95%] flex items-center bg-[#e9fbff]" >
          <svg
            id="svgContent"
            viewBox={`0 0 1200 500`}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          ></svg>
        </div>
      </Stack>
      <DialogCheckin
        open={openCheckIn}
        close={setOpenCheckIn}
        objectCode={objectCode}
        data={objSelected}
        setData={setObjSelected}
        refObj={refreshObject}
      />
    </div>
  );
}
export default ManpowerView;
