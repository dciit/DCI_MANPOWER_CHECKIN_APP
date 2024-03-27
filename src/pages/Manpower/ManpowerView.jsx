import {
  Button,
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
import LoopIcon from '@mui/icons-material/Loop';
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
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ComponentButtonAction from "../../components/button.action";
function ManpowerView() {
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
  // useEffect(() => {
  //   console.log(yAxis)
  // }, [yAxis])
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
    let listLayout = await API_GET_LAYOUT();
    setLayouts(listLayout.filter(o => o.layoutName != 'TEST'));
    const getLayout = await API_GET_LAYOUT(layout);
    if (getLayout != null && getLayout.length) {
      let mq = await API_GET_MQ();
      mq = mq.filter((itemMQ) => {
        return itemMQ.factory == getLayout[0].factory && itemMQ.subLine == getLayout[0].subLine
      })
      let sa = await API_GET_SA();
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
  const [layouts, setLayouts] = useState([]);
  const [listPosition, setListPosition] = useState([
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
          if (elObj.objBorderColor != '') {
            BGChild.setAttribute('stroke-width', elObj.objBorderColor != '' ? 3 : 0)
          }
          svgChild.setAttribute('width', elObj.objWidth);
          svgChild.setAttribute('height', elObj.objHeight);
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
        } else if (elObj.objSvg.includes("svgTxtTitleMsg") || elObj.objSvg.includes("WidthFollowText")) {
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
          iSpan.style.fontSize = '10px'
          areaFree.appendChild(iSpan)
          var oSpanAgain = areaFree.querySelector(`span[refid=${elObj.objCode}]`);
          var spanWidth = oSpanAgain.offsetWidth;
          oSpanAgain.remove();
          itemSvg
            .querySelector("rect.svgTxtTitleBg")
            .setAttribute("width", Math.ceil(parseInt(spanWidth)) + 50);
          if (itemSvg.querySelector("svg#bgTitle") != null) {
            itemSvg.querySelector("svg#bgTitle").setAttribute("width", Math.ceil(parseInt(spanWidth)) + 50);
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
      // if (elObj.objCode == 'MP2401110050') {
      //   console.log(elObj)
      // }
      if (typeof elObj.objMQ != 'undefined' && elObj.objMQ.length) {
        // if (elObj.objCode == 'OTH2311100105') {
        //   console.log(txtMQ)
        // }
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

      // document.querySelector(`svg#${objCode} .bg_sa`).style.fill = "yellow";
      // document.querySelector(`svg#${objCode} .bg_ot`).style.fill = "yellow";

      // document.querySelector(`svg#${objCode} .txt_sa`).style.fill = "black";
      // document.querySelector(`svg#${objCode} .txt_ot`).style.fill = "black";
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
  const [openDialogCheckCert, setOpenDialogCheckCert] = useState(false);
  return (
    <div className='bg-[#f3f3f3] h-[100%]' style={{ fontFamily: 'apple' }}>
      <input type="hidden" id="inpObjCode" value={objSelected?.objCode}></input>
      <input type="hidden" id="inpLayoutCode" value={layout}></input>
      <input type="hidden" readOnly id="inpEmpCode" value={inpEmpCode} ref={refInpEmpCode}></input>
      <input type="hidden" id="disEmpCode" value={objSelected?.empCode}></input>
      <input type="hidden" id="inpYMD" value={""}></input>
      <input type="hidden" id="inpShift" value={""}></input>
      <input type="hidden" id="inpType" value={inpType}></input>

      <Grid container height={'100%'} alignContent={'start'}>
        <ToolbarComponent />
        <ComponentButtonAction />
        <Grid item container xs={12} px={3} spacing={2} className="bg-[#f3f3f3] select-none">
          <Grid container item xs={12} md={3} lg={2} spacing={2} alignContent={'start'}>
            {
              andon.map((oAndon, iAndon) => (
                <Grid key={iAndon} item xs={12} md={6} lg={12}>
                  <Card onClick={() => newTab(`http://dciweb.dci.daikin.co.jp/lineeff/RealtimeEff.aspx?Board=${oAndon?.boardId}`)}>
                    <CardHeader
                      className="card-header bg-[#d4def9]"
                      action={
                        <IconButton aria-label="settings">
                          <LoopIcon className="  " />
                        </IconButton>
                      }
                      title="ANDON BOARD"
                      subheader={<Stack direction={'row'} alignItems={'center'}>
                        <Typography variant="caption" className={`font-semibold ${foreman?.empName != undefined ? `text-[#556ee5]` : `text-red-500 `}`}>{`${foreman?.empName != undefined ? `${foreman?.empName} (Foreman)` : ` (Foreman) Absend`}`}</Typography>
                      </Stack>}
                    />
                    <CardContent className="pt-2">
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant="caption" className="text-[#484f57]">Result {oAndon?.boardId != undefined ? `(BoardId : ${oAndon?.boardId})` : ''}</Typography>
                        </Grid>
                        <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                          <Stack alignItems={'center'}>
                            <Typography variant="caption">Plan</Typography>
                            <Typography variant="h4" className="font-semibold" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.plan}</Typography>
                            <Typography variant="caption" className="bg-blue-500 px-2 text-white rounded-full">TRG : {oAndon.dailyPlan.toLocaleString('en')}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={4} style={{ borderRight: '1px solid #ddd' }}>
                          <Stack alignItems={'center'} className="bg-gray-100-500">
                            <Typography variant="caption" className="mr-1" >Actual</Typography>
                            <Typography variant="h4" className="font-semibold text-[#3dac62]" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.actual}</Typography>
                            <Stack direction={'row'}  >
                              <Typography variant="caption" >({(oAndon.plan != 0 && oAndon.actual != 0) ? ((oAndon.actual / oAndon.plan) * 100).toFixed(2) : 0}%)</Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack alignItems={'center'} className="bg-gray-100-500">
                            <Typography variant="caption">Diff</Typography>
                            <Typography variant="h4" className="font-semibold text-red-500" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>{oAndon.diff}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))
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
                {/* EngineeringOutlinedIcon */}
                {/* and System assurance */}
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
          </Grid>
          <Grid container item md={9} lg={10} alignContent={'start'} spacing={2}>
            <Grid item xs={10}>
              <Card className="w-full h-[100%]">
                <CardHeader
                  className="bg-[#d4def9] card-header p-2"
                  title={
                    <Stack direction={'row'}>
                      <Stack direction={'col'} alignItems={'center'} gap={2} flex={1} pl={3}>
                        <span class="relative flex h-3 w-3">
                          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                        <Stack>
                          <Stack direction={'row'} gap={2} alignItems={'center'}>
                            <span className="text-[1.5em]">{layoutSelected.layoutName}</span>
                            <Button variant="contained" size="small" onClick={() => setOpenSelectLine(true)}>เลือก</Button>
                          </Stack>
                          <span className="text-[12px] text-gray-500">Layout</span>
                        </Stack>
                      </Stack>
                      <Grid container flex={2} className='bg-[#f9f9f9s]' >
                        <Grid item xs={4}>
                          <Stack alignItems={'center'} >
                            <Typography variant="h3" className="font-semibold text-[#212121]" style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                              {
                                objects.filter((o => o.objType == 'MP')).length
                              }
                            </Typography>
                            <Typography variant="caption" className="text-[#212121]">Total Point</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack alignItems={'center'} className="bg-gray-100-500">
                            <Stack direction={'col'} alignItems={'center'}>
                              <Typography variant="h3" className={`font-semibold ${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                                {
                                  objects.filter((o => o.objType == 'MP' && o.empCode != '')).length
                                }
                              </Typography>
                              <KeyboardDoubleArrowDownIcon className={`animate-bounce ${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`} />
                            </Stack>
                            <Typography variant="caption" className={` ${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>Check-In (Point)</Typography>
                            {/* 3dac62 */}
                          </Stack>
                        </Grid>
                        <Grid item xs={4}>
                          <Stack alignItems={'center'}>
                            <Typography variant="h3" className={`font-semibold `} style={{ letterSpacing: '1px', fontFamily: 'inter' }}>
                              <span className={`${((objects.filter((o => o.objType == 'MP' && o.empCode != '')).length / objects.filter((o => o.objType == 'MP')).length) * 100) >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>{
                                `${((objects.filter((o => o.objType == 'MP' && o.empCode != '')).length / objects.filter((o => o.objType == 'MP')).length) * 100).toFixed(2)}`
                              }</span>
                              <span className={'text-[14px] text-black'}> %</span>
                            </Typography>
                            <Typography variant="caption" className={`${percentCheckIn >= 100 ? 'text-[#3dac62]' : 'text-red-500'}`}>Percent</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                      {/* <Stack>
                        asdasd
                      </Stack> */}
                    </Stack>}
                />
                <CardContent className="pb-0" style={{ borderTop: '1px solid rgb(241 241 241)' }} >
                  <div >
                    <div id="bg" style={{ color: '#e9fbff', marginLeft: -5000, position: 'absolute' }}>
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
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Card className="w-full h-[100%]">
                <CardHeader
                  className="bg-[#d4def9] card-header"
                  action={
                    <IconButton aria-label="settings">
                      <ElectricBoltIcon />
                    </IconButton>
                  }
                  title="MAN"
                  subheader="Employee list"
                />
                <CardContent className="pb-0 pr-0" >
                  <div style={{ height: '800px', overflow: 'auto' }}>
                    <table className="w-[100%]" cellspacing="0" cellpadding="1" border="0" >
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          listPosition.map((oPst, iPst) => (
                            objects.filter(o => o.objPosition == oPst && o.objType == 'MP').map((o, i) => {
                              return <tr key={i}>
                                <td><CircleIcon className={`${o.empCode != '' ? 'text-green-500' : 'text-[#ddd]'}`} sx={{ fontSize: '14px' }} /></td>
                                <td className={`text-[12px] ${o.empCode != '' ? 'font-semibold text-black ' : 'text-gray-600'}`}>{o.objTitle}</td>
                                <td className="text-center">
                                  <span className="text-[12px]">{o.empCode}&nbsp;</span>
                                </td>
                              </tr>
                            })
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div className='flex justify-between px-[13.5%] h-[5%] card-mtr' >
        <div className='w-[25%] flex gap-2  items-center '>
          <ApiSharpIcon className='text-[18px]' />
          <span className='text-[#303030] font-semibold' style={{ fontFamily: 'apple', letterSpacing: '1px' }}>DCI IoT</span>
        </div>
        <div className='w-[50%] flex gap-3 justify-around items-center cursor-pointer'>
          {
            menu.map((oMenu, iMenu) => {
              return <div key={iMenu} className={`flex items-center gap-2 text-[#575757] hover:text-[#0071e3] transition-all duration-300 ${oMenu.active && 'menu-active'}`} style={{ letterSpacing: '1px' }}>
                {
                  oMenu.active && <span class="relative flex h-2 w-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                }
                {oMenu.text}</div>
            })
          }
        </div>
        <div className='w-[25%] flex items-center justify-end'>
          <div className='flex justify-end   gap-2  rounded-full items-center'>
            <Avatar sx={{ width: 24, height: 24, bgcolor: deepOrange[500] }}>P</Avatar>
            <div className='flex flex-col text-[12px]'>
              <span className='text-[#303030]' style={{ letterSpacing: '1px' }}>Username</span>
              <span className='text-[#acacac]'>Description</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[85%] w-[100%] flex hidden" >
        <div className="w-[15%] bg-red-50">
        </div>
        <div className="w-[85%] bg-gray-400">
          <div>
            MAIN L6
          </div>
        </div>
      </div> */}
      {/* <div className='flex h-[10%] bg-[#1b1b1d] justify-center items-center  card-mtr' style={{ borderBottom: '1px solid #d6d6d6' }}>
        <div style={{ overflow: 'auto' }} className='w-[50%] bg-red flex'>
          <div className="bg-white"></div>
          <Tabs
            onChange={handleSelectMenu}
            value={Object.keys(layouts.filter(o => o.layoutCode == layoutSelected.layoutCode)).length ? layouts.findIndex(o => o.layoutCode == layoutSelected.layoutCode) : 0}
            className='text-white'
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {
              layouts.filter(o => o.layoutName != 'TEST' && o.layoutStatus == 'ACTIVE').map((oMap, iMap) => {
                return <Tab key={iMap} icon={<ApiSharpIcon />} iconPosition='top' label={oMap.layoutName} className={`${oMap.layoutCode == layoutSelected.layoutCode ? 'text-[#63caff] bg-[#9ae0ff1f]' : 'text-[#afafaf]'}`}>
                </Tab>
              })
            }
          </Tabs>
        </div>
      </div> */}
      {/* <div className='h-[85%] justify-center'>
        <div id="bg" style={{ color: '#e9fbff', marginLeft: -5000, position: 'absolute' }}>
        </div>
        {
          (typeof layoutSelected == 'object' && Object.keys(layoutSelected).length) ?
            <div className="h-[95%] px-[10%]" >
              <div className="card-mtr bg-white h-[100%]" >
                <svg
                  id="svgContent"
                  viewBox={`0 0 ${layoutSelected?.width} ${layoutSelected?.height}`}
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  className="w-[100%] h-[100%]"
                ></svg>
              </div>
            </div>
            : <div className="flex ">
              <CircularProgress />
              <span>กำลังโหลดข้อมูล</span>
            </div>
        }
        <div className="h-[5%] bg-[#1b1b1d] card-mtr">

        </div>
      </div> */}
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
    </div>
  );
}
export default ManpowerView;
