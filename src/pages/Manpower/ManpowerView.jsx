import {
  Typography,
  Stack,
  Backdrop,
  CircularProgress,
  Box,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  CardHeader,
} from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineTeam } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";

("../Service");
import {
  API_ANDON_BOARD,
  API_GET_LAYOUT,
  API_GET_MASTER,
  API_GET_MQ,
  API_GET_OBJECT_INFO,
  API_GET_OBJECT_OF_LAYOUT,
  API_GET_SA,
} from "../../Service";
import DialogCheckin from "../../components/DialogCheckin";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../redux/store";
import moment from "moment";
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import DialogSelectLine from "../../components/DialogSelectLine";
import CircleIcon from '@mui/icons-material/Circle';
import ToolbarComponent from "../../components/ToolbarComponent";
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import ComponentButtonAction from "../../components/button.action";
import { ArrowUpOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import { Button } from "antd";
import { BoxStyle } from "../../constants";
function ManpowerView() {
  const redux = useSelector(state => state.reducer);
  const [yAxis, setYAxis] = useState([]);
  const [openSelectLine, setOpenSelectLine] = useState(false);
  const [numLoop, setNumLoop] = useState(0);
  let { layout } = useParams();
  const navigate = useNavigate();
  const VITE_PATH = import.meta.env.VITE_PATH;
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [masters, setMasters] = useState([]);
  const [objects, setObjects] = useState([]);
  const [objectCode, setObjectCode] = useState({});
  const [objSelected, setObjSelected] = useState({});
  const [layoutSelected, setLayoutSelected] = useState([]);
  const [backdrop, setBackdrop] = useState(true);
  const [once, setOnce] = useState(true);
  const dispatch = useDispatch();
  const widthNav = 15
  const [openTab, setOpenTab] = useState(widthNav);
  const [percentCheckIn, setPercentCheckIn] = useState(0);
  let shiftRedux = useSelector(state => state.reducer.shift);
  let login = useSelector(state => state.reducer.login);
  const [summaryMQ, setSummaryMQ] = useState({});
  const [summarySA, setSummarySA] = useState({});
  const [foreman, setForeman] = useState({});
  const [andon, setAndon] = useState([]);
  const [refreshContent, setRefreshContent] = useState(false);
  const [inpType, setInpType] = useState('');
  const [inpEmpCode, setInpEmpCode] = useState();
  const refInpEmpCode = useRef();
  const [Diff, setDiff] = useState(0);
  const ThemeTrue = {
    bg: ["yellow", "#bba17a", "#b88a45"],
    text: "#333333",
  };
  const ThemeFalse = {
    bg: ["#fff", "#6d1803", "#6d210f"],
    text: "white",
  };
  let svgContent = "";
  useEffect(() => {
    if (once) {
      if (layout == 'all' || layout.length == '') {
        setOpenSelectLine(true);
      } else {
        [...Array(7)].map((o, i) => {
          setYAxis([...yAxis, ...yAxis]);
        })
        initDT();
        init();
        setObjSelected({});
        setOnce(false);
        const interval = setInterval(() => {
          setNumLoop(numLoop + 1);
        }, 10000);
        return () => clearInterval(interval);
      }
    }
  }, [once]);

  useEffect(() => {
    if (refreshContent) {
      intialData();
    }
  }, [refreshContent])
  async function initDT() {
    let fmTime = 'HH:mm:ss'
    let hh_current = moment().format('HH');
    let mm_current = moment().format('mm');
    let ss_current = moment().format('ss');
    let ymd_current = `${hh_current}:${mm_current}:${ss_current}`;
    let adjShift = '';
    if (moment(ymd_current, fmTime) >= moment('08:00:00', fmTime) && moment(ymd_current, fmTime) <= moment('20:00:00', fmTime)) { // 07:50 - 19:50
      adjShift = 'D';
    } else {
      adjShift = 'N';
    }
    if ((shiftRedux == '' || shiftRedux == null) || (shiftRedux != '' && shiftRedux != null && (adjShift != shiftRedux))) {
      dispatch({ type: 'SET_SHIFT', payload: adjShift });
      await new Promise(r => setTimeout(() => location.reload(), 2000));
    }
  }
  useEffect(() => {
    if (typeof layoutSelected == 'object' && Object.keys(layoutSelected).length) {
      getAndonBoardData()
    }
  }, [layoutSelected]);

  useEffect(() => {
    initDT();
  }, [numLoop]);

  useEffect(() => {
    const intervalAndonBoard = setInterval(() => {
      getAndonBoardData();
    }, 180000);
    return () => clearInterval(intervalAndonBoard);
  }, [andon]);

  useEffect(() => {
    if (typeof objects == 'object' && Object.keys(objects).length) {
      // let fo = objects.filter(o => o.)
      try {
        setDiff(objects.filter((o => o.objType == 'MP')).length - objects.filter((o => o.objType == 'MP' && o.empCode != '')).length);
      } catch (e) {
        alert(e.message);
      }
      let fo = objects.filter(o => o.objType == 'MP' && o.objPosition == 'FO' && o.objStatus == 'ACTIVE' && o.empCode != '');
      if (fo.length) {
        setForeman(fo[0]);
      } else {
        setForeman({});
      }
    }
  }, [objects])

  async function getAndonBoardData() {
    let res = await API_ANDON_BOARD({ boardId: layoutSelected.boardId });
    if (typeof res == 'object') {
      setAndon([...res])
    }
  }

  const init = async () => {
    // let listLayout = await API_GET_LAYOUT();
    // setLayouts(listLayout.filter(o => o.layoutName != 'TEST'));
    const oLayout = await API_GET_LAYOUT('', layout);
    if (oLayout != null && oLayout.length) {
      let mq = await API_GET_MQ();
      mq = mq.filter((itemMQ) => {
        return itemMQ.factory == oLayout[0].factory && itemMQ.subLine == oLayout[0].subLine
      })
      let sa = await API_GET_SA();
      dispatch({
        type: 'SET_LAYOUT_SELECTED', payload: {
          layout: oLayout[0],
          mq: mq,
          sa: sa
        }
      });
      setLayoutSelected(oLayout[0]);
      await intialData();
    }
  };
  // const [layouts, setLayouts] = useState([]);
  const [listPosition] = useState([
    'FO', 'LE', 'QA', 'OP'
  ])
  async function getObjectOfLayout() {
    const object = await API_GET_OBJECT_OF_LAYOUT({
      layoutCode: layout,
    });
    if (typeof object == 'object' && object.length) {
      setObjects(object)
    }
  }
  const intialData = async () => {
    setBackdrop(true);
    const listMaster = await API_GET_MASTER();
    const object = await API_GET_OBJECT_OF_LAYOUT({
      layoutCode: layout,
    });
    setMasters(listMaster);
    await getObjectOfLayout();
    setObjects(object);
    setPercentCheckIn(((object.filter((o => o.objType == 'MP' && o.empCode != '')).length / object.filter((o => o.objType == 'MP')).length) * 100))
    svgContent = document.querySelector("#svgContent");
    if (svgContent != undefined) {
      svgContent.innerHTML = "";
      let svgMaster = "";
      let svg = "";
      await object.map((elObj) => {
        svgMaster = elObj.objSvg;
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let mSkill = elObj.manskill;
        if (elObj.objSvg.includes('bg-set')) {
          const itemSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          itemSvg.innerHTML = svgMaster;
          let BgParent = itemSvg.querySelector('#bgTitle');
          let BGChild = BgParent.querySelector('rect');
          let svgChild = itemSvg.querySelector('g>svg');
          BGChild.setAttribute('width', elObj.objWidth);
          BGChild.setAttribute('height', elObj.objHeight);
          BGChild.setAttribute('fill', elObj.objBackgroundColor != '' ? elObj.objBackgroundColor : 'blue');
          BGChild.setAttribute('stroke', elObj.objBorderColor != '' ? elObj.objBorderColor : 'black')
          // if (elObj.objBorderColor != '') {
          //   BGChild.setAttribute('stroke-width', elObj.objBorderColor != '' ? 3 : 0)
          // }
          svgChild.setAttribute('width', elObj.objWidth);
          svgChild.setAttribute('height', elObj.objHeight);
          svgChild.setAttribute('stroke-width', elObj.objBorderWidth);
          const blob = new Blob([itemSvg.innerHTML], { type: "image/svg+xml" });
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
            }
          });
          svg.appendChild(use);
        } else if (elObj.objSvg.includes("animateMotion")) {
          let itemSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          elObj.objSvg = elObj.objSvg.replace("<defs>", "");
          elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
          elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
          elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
          elObj.objSvg = elObj.objSvg.replace("{empcode}", elObj.empCode);
          elObj.objSvg = elObj.objSvg.replace("{obj_man_skill}", mSkill);
          (elObj.mq == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
            (theme) => {
              elObj.objSvg = elObj.objSvg.replace(`{bgmq}`, theme);
            }
          );
          (elObj.sa == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
            (theme) => {
              elObj.objSvg = elObj.objSvg.replace(`{bgsa}`, theme);
            }
          );
          (elObj.ot == "TRUE" ? ThemeTrue.bg : ThemeFalse.bg).map(
            (theme) => {
              elObj.objSvg = elObj.objSvg.replace(`{bgot}`, theme);
            }
          );
          elObj.objSvg = elObj.objSvg.replace("{empImage}", elObj.empImage);
          itemSvg.innerHTML = elObj.objSvg;
          itemSvg.setAttribute("id", elObj.objCode);
          itemSvg.setAttribute("x", elObj.objX);
          itemSvg.setAttribute("y", elObj.objY);
          itemSvg.addEventListener("click", function () {
            setObjSelected(elObj);
            setOpenCheckIn(true);
          });
          itemSvg = createViewMQSA(elObj, itemSvg);
          svg.appendChild(itemSvg);
        } else if (elObj.objSvg.includes("svgTxtTitle") && elObj.objSvg.includes("WidthFollowText")) {
          const itemSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
          itemSvg.innerHTML = elObj.objSvg;

          let areaFree = document.getElementById('bg');
          let iSpan = document.createElement('span');
          iSpan.innerHTML = elObj.objTitle;
          iSpan.setAttribute('refId', elObj.objCode);
          iSpan.style.fontSize = `${elObj.objFontSize}px`
          areaFree.appendChild(iSpan);
          let oSpanAgain = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
          let spanWidth = oSpanAgain.offsetWidth;
          oSpanAgain.remove();

          let text = itemSvg.querySelectorAll('text');
          let widthBg = 0;
          if (text.length > 0) {
            widthBg = Math.ceil(parseInt(spanWidth)) + 50;
          }
          let bg = itemSvg.querySelectorAll('svg#bgTitle');
          if (bg.length > 0) {
            bg[0].setAttribute('width', widthBg);
          }
          let rect = itemSvg.querySelectorAll('rect.svgTxtTitleBg');
          if (rect.length > 0) {
            rect[0].setAttribute('width', widthBg);
          }
          if (itemSvg.querySelector("svg#bgTitle") != null) {
            let textTitle = itemSvg.querySelectorAll('text');
            if (textTitle.length > 0) {
              textTitle[0].setAttribute('fill', elObj.objFontColor);
            }
            // itemSvg.querySelector("svg#bgTitle").setAttribute("width", Math.ceil(parseInt(spanWidth)) + 50);
          }
          itemSvg.setAttribute("id", elObj.objCode);
          itemSvg.setAttribute("x", elObj.objX);
          itemSvg.setAttribute("y", elObj.objY);
          svg.appendChild(itemSvg);
        } else if (elObj.objSvg.includes("svgTxtBigTitle")) {
          const itemSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          elObj.objSvg = elObj.objSvg.replace("{objName}", elObj.objTitle);
          itemSvg.innerHTML = elObj.objSvg;
          var areaFree = document.getElementById('bg')
          var iSpan = document.createElement('span');
          iSpan.innerHTML = elObj.objTitle;
          iSpan.setAttribute('refId', elObj.objCode)
          areaFree.appendChild(iSpan)
          var oSpanAgain = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
          var spanWidth = oSpanAgain.offsetWidth;
          oSpanAgain.remove();
          let len = elObj.objTitle.length;
          itemSvg
            .querySelector("rect.svgTxtBigTitleBg")
            .setAttribute("width", Math.ceil(parseInt(spanWidth)) + (len < 20 ? 100 : 115));
          if (itemSvg.querySelector("svg#bgTitle") != null) {
            itemSvg.querySelector("svg#bgTitle").setAttribute("width", Math.ceil(parseInt(spanWidth)) + (len < 20 ? 100 : 115));
          }
          itemSvg.setAttribute("id", elObj.objCode);
          itemSvg.setAttribute("x", elObj.objX);
          itemSvg.setAttribute("y", elObj.objY);
          svg.appendChild(itemSvg);
        } else if (elObj.objSvg.includes("animate")) {
          const itemSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          itemSvg.innerHTML = elObj.objSvg;
          itemSvg.setAttribute("id", elObj.objCode);
          itemSvg.setAttribute("x", elObj.objX);
          itemSvg.setAttribute("y", elObj.objY);
          if (itemSvg.querySelector('svg').getAttribute('viewBox') != null) {
            itemSvg.querySelector('svg').removeAttribute('viewBox')
          }
          svg.appendChild(itemSvg);
        } else {
          svgMaster = svgMaster.replace("{objName}", elObj.objTitle);
          svgMaster = svgMaster.replace("{empcode}", elObj.empcode);
          svgMaster = svgMaster.replace("{title_color_bg}", elObj.empcode != "" ? "green" : "red");
          svgMaster = svgMaster.replace("{obj_man_skill}", mSkill);
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
            }
          });
          svg.appendChild(use);
        }
        svgContent.appendChild(svg);
      });
      setBackdrop(false)
      return true;
    } else {
      setBackdrop(false);
    }
  };

  useEffect(() => {
    if (backdrop == false) {
      genSummaryMQ();
      genSummarySA();
    }
  }, [backdrop])
  function createViewMQSA(elObj, elSVG) {
    elSVG.innerHTML = elObj.objSvg;

    let bgSA = elSVG.querySelector('.bg_sa');
    let txtSA = elSVG.querySelector('.txt_sa');

    if (txtSA != null) {
      let txtOT = elSVG.querySelector('.txt_ot');
      txtSA.style.fontWeight = 'bold';
      txtOT.style.fontWeight = 'bold';
      if (typeof elObj.objSA != 'undefined' && elObj.objSA.length) {
        bgSA.style.fill = 'yello';
        txtSA.style.fill = 'black';
      } else {
        bgSA.style.fill = 'white';
        txtSA.style.fill = 'white';
      }
      let bgImage = elSVG.querySelector('.bg_img');
      if (typeof elObj.empCode != 'undefined' && elObj.empCode == '') {
        bgImage.style.fill = '#ff4234';
      }
    }
    let bgMQ = elSVG.querySelector('.bg_mq');
    let txtMQ = elSVG.querySelector('.txt_mq');

    if (txtMQ != null) {
      if (typeof elObj.objMQ != 'undefined' && elObj.objMQ.length) {
        bgMQ.style.fill = 'yello';
        txtMQ.style.fill = 'black';
      } else {
        bgMQ.style.fill = 'white';
        txtMQ.style.fill = 'white';
      }
    }
    return elSVG;
  }

  useEffect(() => {
    if (typeof objSelected != 'undefined' && objSelected != undefined && objSelected != '' && Object.keys(objSelected).length > 0) {
      setOpenCheckIn(true);
    }
  }, [objSelected])

  async function refreshObject(objCode) {
    let res = await API_GET_OBJECT_INFO({ objCode: objCode });
    res = res[0];
    if (res.empCode != "") {
      document
        .querySelector(`svg#${objCode} .img_profile`)
        .setAttribute("href", res.empImage);
      document.querySelector(`svg#${objCode} .bg_img`).style.fill = 'white';
      document.querySelector(`svg#${objCode} .txt_empcode`).textContent = res.empCode;
      if (typeof res.objMQ != 'undefined' && typeof res.objMQ == 'object' && Object.keys(res.objMQ).length) { // CHECK-IN AND HAVE "MQ"
        // SET STYLE MQ
        document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "yellow";
        document.querySelector(`svg#${objCode} .txt_mq`).style.fill = "black";
        // END  
      } else {
        // SET STYLE MQ
        document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_mq`).style.fill = "white";
        // END  
      }

      if (typeof res.objSA != 'undefined' && typeof res.objSA == 'object' && Object.keys(res.objSA).length) { // CHECK-IN AND HAVE "MQ"
        // SET STYLE SA
        document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "yellow";
        document.querySelector(`svg#${objCode} .txt_sa`).style.fill = "black";
        // END  
      } else {
        // SET STYLE SA
        document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_sa`).style.fill = "white";
        // END  
      }

      if (typeof res.ot != 'undefined' && res.ot == 'TRUE') {
        // SET STYLE OT
        document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "yellow";
        document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
        // END  
      } else {
        // SET STYLE OT
        document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
        // END  
      }
    } else {
      document
        .querySelector(`svg#${objCode} .img_profile`)
        .setAttribute("href", "");

      document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "#fff";
      document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
      document.querySelector(`svg#${objCode} .bg_img`).style.fill = 'red';
      document.querySelector(`svg#${objCode} .txt_empcode`).textContent = "";

      if (typeof res.objMQ != 'undefined' && typeof res.objMQ == 'object' && Object.keys(res.objMQ).length) { // CHECK-IN AND HAVE "MQ"
        // SET STYLE MQ
        console.log(res.objMQ)
        document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_mq`).style.fill = "black";
        // END  
      } else {
        // SET STYLE MQ
        console.log(res.objMQ)
        document.querySelector(`svg#${objCode} .bg_mq`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_mq`).style.fill = "white";
        // END  
      }

      if (typeof res.objSA != 'undefined' && typeof res.objSA == 'object' && Object.keys(res.objSA).length) { // CHECK-IN AND HAVE "MQ"
        // SET STYLE SA
        document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_sa`).style.fill = "black";
        // END  
      } else {
        // SET STYLE SA
        document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_sa`).style.fill = "white";
        // END  
      }

      if (typeof res.ot != 'undefined' && res.ot == 'TRUE') {
        // SET STYLE OT
        document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
        // END  
      } else {
        // SET STYLE OT
        document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "white";
        document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
        // END  
      }
    }
  }

  async function handleBacktohome() {
    navigate(`../${VITE_PATH}/management`);
  }

  async function handleLogout() {
    if (confirm('คุณต้องการออกจากระบบ ใช่หรือไม่ ? ')) {
      persistor.purge();
      navigate(`${VITE_PATH}`);
    }
  }
  function InitNavMenu({ text, icon, active }) {
    return <Box>
      <Stack className={`py-1 pl-3 ${openTab == widthNav && 'pr-3'} bg-white rounded-xl  shadow-nav-menu cursor-pointer text-black font-mono  ${active && 'bg-[#efefef]'}`} justifyContent={'start'} direction={'row'} alignItems={'center'} justifyItems={'center'}>
        {icon}
        {
          openTab != widthNav && <Typography className={`pl-1 pr-2 text-[14px]  py-1 rounded-lg  text-[#171a1e] font-semibold capitalize  `}>{text}</Typography>
        }
      </Stack>
    </Box>
  }
  async function genSummaryMQ() {
    let MQSACount = 0;
    let MQSAchieve = 0;
    let MQSAAcievePercent = 0;
    try {
      objects.filter(o => o.objType == 'MP').map((o, i) => {
        if (typeof o.objMQ == 'object') {
          MQSACount += o.objMQ.length;
          if (o.empCode != '') {
            MQSAchieve += o.objMQ.length;
          }
        }
      });

      MQSAAcievePercent = (MQSAchieve > 0 && MQSACount > 0) ? ((MQSAchieve / MQSACount) * 100).toFixed(0) : 0;
      setSummaryMQ({
        ...{
          count: MQSACount,
          achieve: MQSAchieve,
          percent: MQSAAcievePercent
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  async function genSummarySA() {
    let SACount = 0;
    let SAchieve = 0;
    let SAAcievePercent = 0;
    try {
      objects.filter(o => o.objType == 'MP').map((o, i) => {
        if (typeof o.objSA == 'object') {
          SACount += o.objSA.length;
          if (o.empCode != '') {
            SAchieve += o.objSA.length;
          }
        }
      });
      SAAcievePercent = (SACount > 0 && SAchieve > 0) ? ((SAchieve / SACount) * 100).toFixed(0) : 0;
      setSummarySA({
        ...{
          count: SACount,
          achieve: SAchieve,
          percent: SAAcievePercent
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
  function newTab(link = '') {
    window.open(link, '_blank');
  }
  // const [openDialogCheckCert, setOpenDialogCheckCert] = useState(false);
  // const CalDiffCheckIn = (total, checkin) => {
  //   return total - checkin
  // }
  return (
    <div className='bg-[#f3f3f3] h-[100%] ' style={{ fontFamily: 'apple' }}>
      <input type="hidden" id="inpObjCode" value={objSelected?.objCode}></input>
      <input type="hidden" id="inpLayoutCode" value={layout}></input>
      <input type="hidden" readOnly id="inpEmpCode" value={inpEmpCode} ref={refInpEmpCode}></input>
      <input type="hidden" id="disEmpCode" value={objSelected?.empCode}></input>
      <input type="hidden" id="inpYMD" value={""}></input>
      <input type="hidden" id="inpShift" value={""}></input>
      <input type="hidden" id="inpType" value={inpType}></input>
      <div className="flex flex-col h-[100%]">
        <ToolbarComponent />
        <div className="h-[92.5%] bg-[#f3f3f3] select-none flex  p-3 gap-3 ">
          <div className="flex flex-col gap-3 w-[15%]">
            {
              andon.length == 0 ? <div className="h-full bg-white shadow-md rounded-md p-6 text-red-500">
                No information found for 'Andno board'
              </div> :
                <div className="flex flex-col gap-[12px]">
                  {
                    andon.map((oAndon, iAndon) => (
                      <div className="p-[16px] bg-white rounded-md flex  flex-col gap-[8px]" key={iAndon} onClick={() => newTab(`http://dciweb.dci.daikin.co.jp/lineeff/RealtimeEff.aspx?Board=${oAndon?.boardId}`)} style={BoxStyle}>
                        <div className="text-black flex gap-[4px]">
                          <span>BOARD ID :</span>
                          <strong>{oAndon?.boardId}</strong>
                        </div>
                        <div className="grid lg:grid-cols-1 xl:grid-cols-2">
                          <div >
                            <Typography variant="caption">Plan</Typography>
                            <div className="flex justify-end">
                              <Typography variant="h4" className="font-semibold " style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.dailyPlan.toLocaleString('en')}</Typography>
                            </div>
                          </div>
                          <div >
                            <Typography variant="caption">Plan</Typography>
                            <div className="flex justify-end">
                              <Typography variant="h4" className="font-semibold text-blue-500 drop-shadow-lg" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.plan.toLocaleString('en')}</Typography>
                            </div>
                          </div>

                          <div >
                            <Typography variant="caption">Actual</Typography>
                            <div className="flex justify-end">
                              <Typography variant="h4" className="font-semibold text-[#3dac62] drop-shadow-lg" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.actual.toLocaleString('en')}</Typography>
                            </div>
                          </div>
                          <div >
                            <Typography variant="caption">Diff</Typography>
                            <div className="flex justify-end">
                              <Typography variant="h4" className="font-semibold text-red-500 drop-shadow-lg" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.diff.toLocaleString('en')}</Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
            }
            <Grid item xs={12} md={6} lg={12} className="hidden">
              <Card>
                <CardHeader
                  className=" card-header "
                  title={<Stack direction={'col'} alignItems={'center'} gap={1}>
                    <Avatar sx={{ bgcolor: '#556ee5' }}>MQ</Avatar>
                    <Stack>
                      <span>Manual quality</span>
                      <span className="text-[12px] text-gray-500">ทักษะการทำงาน</span>
                    </Stack>
                  </Stack>}
                  action={
                    <IconButton aria-label="settings">
                      <EngineeringOutlinedIcon sx={{ fontSize: '1.25em' }} />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} className="pb-2">
                      <Stack direction={'row'} alignItems={'center '} gap={2}>
                        <Typography variant="caption" className="text-[#484f57] leading-0 " >ใบอนุญาติการทำงาน</Typography>
                        {
                          summaryMQ.percent != 100 && <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        }
                      </Stack>
                    </Grid>
                    <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                      <Stack alignItems={'center'}>
                        <Typography variant="caption">รายการ</Typography>

                        <Typography variant="h4" className="font-semibold" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                          {
                            typeof summaryMQ.count != 'undefined' ? summaryMQ.count : 0
                          }
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                      <Stack alignItems={'center'} className="bg-gray-100-500">
                        <Typography variant="caption">ผ่านอบรม</Typography>

                        <Typography variant="h4" className={`font-semibold ${summaryMQ.achieve > summaryMQ.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                          {
                            typeof summaryMQ.achieve != 'undefined' ? summaryMQ.achieve : 0
                          }
                        </Typography>
                        <Stack direction={'row'} gap={'2px'}>
                          <Typography variant="caption" className={`${(summaryMQ.achieve > summaryMQ.count) ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px' }}>
                            {
                              summaryMQ.achieve == summaryMQ.count ? `` : `-(${summaryMQ.count - summaryMQ.achieve}) รายการ`
                            }
                          </Typography>
                          <Typography variant="caption"></Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack alignItems={'center'}>
                        <Typography variant="caption">เปอร์เซ็น</Typography>

                        <Stack alignItems={'center'}>
                          <Typography variant="h4" className={`font-semibold ${summaryMQ.achieve > summaryMQ.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                            {
                              typeof summaryMQ.percent != 'undefined' ? summaryMQ.percent : 0
                            }
                            <span className={'text-[14px] text-black'}> %</span>
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} gap={'2px'}>
                          <Typography variant="caption" className={`${summaryMQ.achieve > summaryMQ.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px' }}>
                            {
                              summaryMQ.percent == 100 ? `` : `-(${100 - (summaryMQ.percent != undefined ? summaryMQ.percent : 100)}%)`
                            }
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={12} className="hidden">
              <Card>
                <CardHeader
                  className=" card-header "
                  title={<Stack direction={'col'} alignItems={'center'} gap={1}>
                    <Avatar sx={{ bgcolor: '#556ee5' }}>SA</Avatar>
                    <Stack>
                      <span>System assurance</span>
                      <span className="text-[12px] text-gray-500">ทักษะเฉพาะด้าน</span>
                    </Stack>
                  </Stack>}
                  action={
                    <IconButton aria-label="settings">
                      <HandymanOutlinedIcon sx={{ fontSize: '1.25em' }} />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} className="pb-2">
                      <Stack direction={'row'} alignItems={'center '} gap={2}>
                        <Typography variant="caption" className="text-[#484f57] leading-0 " >ใบอนุญาติทักษะเฉพาะด้าน</Typography>
                        {
                          summarySA.percent != 100 && <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                          </span>
                        }
                      </Stack>
                    </Grid>
                    <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                      <Stack alignItems={'center'}>
                        <Typography variant="caption">ใบอนุญาติ</Typography>
                        <Typography variant="h4" className="font-semibold" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                          {
                            typeof summarySA.count != 'undefined' ? summarySA.count : 0
                          }
                        </Typography>
                        <Typography variant="caption">รายการ</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                      <Stack alignItems={'center'} className="bg-gray-100-500">
                        <Typography variant="caption">ผ่านอบรม</Typography>
                        <Typography variant="h4" className={`font-semibold ${summarySA.achieve > summarySA.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                          {
                            typeof summarySA.achieve != 'undefined' ? summarySA.achieve : 0
                          }
                        </Typography>
                        <Stack direction={'row'} gap={'2px'}>
                          <Typography variant="caption" className={`${summarySA.achieve > summarySA.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px' }}>
                            {
                              summarySA.achieve == summarySA.count ? `  ` : `-(${summarySA.count - summarySA.achieve}) รายการ`
                            }
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    <Grid item xs={4}>
                      <Stack alignItems={'center'}>
                        <Stack alignItems={'center'}>
                          <Typography variant="caption">เปอร์เซ็น</Typography>
                          <Typography variant="h4" className={`font-semibold ${summarySA.achieve > summarySA.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                            {
                              typeof summarySA.percent != 'undefined' ? summarySA.percent : 0
                            }
                            <span className={'text-[14px] text-black'}> %</span>
                          </Typography>
                        </Stack>
                        <Stack direction={'row'} gap={'2px'}>
                          <Typography variant="caption" className={`${summarySA.achieve > summarySA.count ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px' }}>
                            {
                              summarySA.percent == 100 ? `` : `-(${100 - (summarySA.percent != undefined ? summarySA.percent : 100)}%)`
                            }
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </div>
          <div className="flex flex-col w-[70%] h-[100%]  gap-3">
            <div className="grid grid-cols-5 gap-[8px]">
              {/* <div className="col-span-2 flex flex-col items-center pl-6 border rounded-md bg-white py-2 pr-6" id="layoutName" style={BoxStyle}>
                <Button type="primary" size="small" className="relative top-0" onClick={() => setOpenSelectLine(true)}>เลือก</Button>
                <span className="text-[2.5em] font-[apple] font-semibold">{redux.layout.layoutName}</span>
              </div> */}
              <div className="col-span-2 text-lg flex bg-blue-600  justify-center gap-[4px]  flex-col  rounded-md px-[12px] pt-[4px] pb-[6px]" style={BoxStyle}>
                <div className="text-white/80  tracking-wide">พื้นที่</div>
                <div className="text-center text-[2.5em] text-white">{redux.layout.layoutName}</div>
                <div className="text-xs cursor-pointer tracking-wide text-white/75 float-right flex justify-end mt-[12px]" onClick={() => setOpenSelectLine(true)}>
                  พื้นที่ที่เลือก (คลิกเพื่อเลือก)
                </div>
              </div>
              <div className='col-span-3 grid grid-cols-3 gap-[8px]'>
                <div className="text-lg flex bg-gradient-to-r from-blue-500/5 via-blue-500/0 to-white  justify-center gap-[4px]  flex-col bg-white rounded-md px-[12px] pt-[4px] pb-[6px]" style={BoxStyle}>
                  <div className="text-gray-500  tracking-wide">TOTAL</div>
                  <div className="text-center text-[2.5em] text-blue-600 font-semibold">{objects.filter((o => o.objType == 'MP')).length}</div>
                  <div className="text-xs  tracking-wide text-gray-500/75 float-right flex justify-end mt-[12px]">
                    จุดเช็คอินทั้งหมด
                  </div>
                </div>
                <div className="text-lg flex  justify-center bg-gradient-to-r from-green-500/5 via-green-500/0 to-white gap-[4px]  flex-col bg-white rounded-md px-[12px] pt-[4px] pb-[6px]" style={BoxStyle}>
                  <div className="text-gray-500 tracking-wide">CHECK-IN</div>
                  <div className="text-center text-[2.5em] text-emerald-600 font-semibold">{objects.filter((o => o.objType == 'MP' && o.empCode != '')).length}</div>
                  <div className="text-xs  tracking-wide text-gray-500/75 float-right flex justify-end mt-[12px]">
                    เช็คอิน
                  </div>
                </div>
                <div className="text-lg flex bg-gradient-to-r from-red-500/5 via-red-500/0 to-white  justify-center gap-[4px]  flex-col   rounded-md px-[12px] pt-[4px] pb-[6px]" style={BoxStyle}>
                  <div className="text-gray-500 tracking-wide">DIFF</div>
                  <div className="text-center text-[2.5em] text-red-500 drop-shadow-lg font-semibold"> {Diff}</div>
                  <div className="text-xs  tracking-wide text-gray-500/75 float-right flex justify-end mt-[12px]">
                    ไม่เช็คอิน
                  </div>
                </div>
              </div>
              {/* <div className="flex items-center rounded-md bg-[#556ee5] text-white shadow-md pl-3 py-2 gap-3 ">
                <AiOutlineTeam size={50} />
                <div className="flex flex-col ">
                  <small className="text-white/75">จุดเช็คอินทั้งหมด</small>
                  <span className="text-[3em] font-bold font-[apple] ">{objects.filter((o => o.objType == 'MP')).length}</span>
                </div>
              </div>
              <div className={`flex flex-col items-center rounded-md bg-white shadow-md py-2  ${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>
                <span className="text-[3em] font-bold font-[apple]">{objects.filter((o => o.objType == 'MP' && o.empCode != '')).length}</span>
                <small className="text-[#212121]">Check-In (Point)</small>
              </div>
              <div className=" flex-col items-center  sm:hidden md:flex rounded-md bg-white shadow-md py-2">
                <span className={`drop-shadow-md text-[3em] font-bold font-[apple] ${((objects.filter((o => o.objType == 'MP' && o.empCode != '')).length / objects.filter((o => o.objType == 'MP')).length) * 100) >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>{
                  `${(isNaN((objects.filter((o => o.objType == 'MP' && o.empCode != '')).length / objects.filter((o => o.objType == 'MP')).length) * 100) ? 0 : (objects.filter((o => o.objType == 'MP' && o.empCode != '')).length / objects.filter((o => o.objType == 'MP')).length) * 100).toFixed(2)}`
                }</span>
                <small className={`${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>Percent</small>
              </div> */}
            </div>

            <div className="h-[85%] bg-white rounded-md relative  py-3 overflow-hidden " id="content" style={{ ...BoxStyle, ...{ border: '5px solid rgb(37 99 235)' } }}>
              <div id="bg" style={{ color: '#e9fbff', marginLeft: -5000, position: 'absolute' }}>
              </div>
              <div className={`shadow-lg absolute top-2 left-2 flex justify-center items-center gap-2 ${Diff > 0 ? 'animate-pulse' : ''}  text-white px-4 py-2 rounded ${Diff > 0 ? 'bg-red-500' : 'bg-green-600'}`} >
                {
                  Diff > 0 ? <AiFillCloseCircle /> : <AiFillCheckCircle />
                }
                <span>{Diff > 0 ? 'เช็คอินไม่ครบตามกำหนด' : 'เช็คอินครบตามกำหนด'}</span>
              </div>
              {
                (typeof layoutSelected == 'object' && Object.keys(layoutSelected).length) ?
                  <svg
                    id="svgContent"
                    viewBox={`0 0 ${layoutSelected?.width} ${layoutSelected?.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid meet"
                  ></svg>
                  : <div className="flex ">
                    <CircularProgress />
                    <span>กำลังโหลดข้อมูล</span>
                  </div>
              }
            </div>
          </div>
          <div id="emp" className="w-[15%] flex flex-col rounded-md shadow-md bg-white py-[8px] px-[12px] gap-[8px]" style={BoxStyle}>
            <span  >รายการจุดเช็คอิน</span>
            <div id="emp-body" className="grow overflow-auto ">
              <table className="w-full" id="tb-list-check-in"  >
                <thead>
                  <tr className="text-sx text-black/50">
                    <td className="border text-center  pb-[8px]">#</td>
                    <td className="border pb-[8px]">จุดเช็คอิน</td>
                    <td className="border pb-[8px]">รหัส</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    objects.filter(o => o.objType == 'MP').length == 0 ? <tr><td colSpan="3">Check-in point not found.</td></tr> : listPosition.map((oPst, iPst) => (
                      objects.filter(o => o.objPosition == oPst && o.objType == 'MP').map((o, i) => {
                        return <tr key={iPst + '-' + i}>
                          <td className="text-center"><CircleIcon className={`${o.empCode != '' ? 'text-green-500' : 'text-red-500'}`} sx={{ fontSize: '14px' }} /></td>
                          <td className={`border text-left pl-3 border-red-500 text-[12px] ${o.empCode != '' ? 'font-bold text-black ' : 'text-gray-600'}`}>{o.objTitle}</td>
                          <td className="text-center">
                            <div className="flex items-center flex-col ">
                              <span className="text-[12px] font-bold">{o.empCode}&nbsp;</span>
                            </div>
                          </td>
                        </tr>
                      })
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DialogSelectLine
        open={openSelectLine}
        close={setOpenSelectLine}
        layoutSelected={layoutSelected}
      />
      <DialogCheckin
        open={openCheckIn}
        close={setOpenCheckIn}
        objectCode={objectCode}
        data={objSelected}
        setData={setObjSelected}
        refObj={refreshObject}
        refHeaderManpower={getObjectOfLayout}
        backdrop={setBackdrop}
        inpType={setInpType}
        refInpEmpCode={refInpEmpCode}
        inpEmpCode={inpEmpCode}
      />
      <Backdrop
        sx={{ color: '#fff', background: '#3f51b5', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <Stack alignItems={'center'} spacing={2}>
          <CircularProgress color="inherit" />
          <Typography>กำลังโหลดข้อมูล</Typography>
        </Stack>
      </Backdrop>

      <div id="bg" style={{ color: '#e9fbff', marginLeft: -5000, position: 'absolute' }}>
      </div>
    </div >
  );
}
export default ManpowerView;
