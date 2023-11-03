import React from 'react'
import { useEffect } from 'react'
import { ServiceGetListQrCode } from '../Service'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { Grid } from '@mui/material'
function QrCode() {
    var i = 1;
    const [qrcode, setQrcode] = useState([
        {
            "No":1,
            "Location": "Factory 1",
            "Code": "FA1-DC-001",
            "SubLocation": "FHC 11. Office ชั้น 2 หน้าประตูทางเข้า",
            "FIELD5": "FET-FA1-DC-001"
        },
        {
            "No":2,
            "Location": "Factory 1",
            "Code": "FA1-CO-002",
            "SubLocation": "เสาด้านหน้า Line Swing Bush",
            "FIELD5": "FET-FA1-CO-002"
        },
        {
            "No":3,
            "Location": "Factory 1",
            "Code": "FA1-CO-003",
            "SubLocation": "เสาทางเดิน Line Swing  Bush",
            "FIELD5": "FET-FA1-CO-003"
        },
        {
            "No":4,
            "Location": "Factory 1",
            "Code": "FA1-DC-004",
            "SubLocation": "เสาใกล้บ่อสี Final  Assy 1 YC",
            "FIELD5": "FET-FA1-DC-004"
        },
        {
            "No":5,
            "Location": "Factory 1",
            "Code": "FA1-DC-005",
            "SubLocation": "Office Fac.1 ชั้น 2 ข้างห้องครัว",
            "FIELD5": "FET-FA1-DC-005"
        },
        {
            "No":6,
            "Location": "Factory 1",
            "Code": "FA1-DC-006",
            "SubLocation": "ห้อง StocK GA ",
            "FIELD5": "FET-FA1-DC-006"
        },
        {
            "No":7,
            "Location": "Factory 1",
            "Code": "FA1-CO-007",
            "SubLocation": "หน้าห้อง Conf.3",
            "FIELD5": "FET-FA1-CO-007"
        },
        {
            "No":8,
            "Location": "Factory 1",
            "Code": "FA1-DC-008",
            "SubLocation": "หน้าห้องน้ำ Fac.1 ชั้น 2",
            "FIELD5": "FET-FA1-DC-008"
        },
        {
            "No":9,
            "Location": "Factory 1",
            "Code": "FA1-DC-009",
            "SubLocation": "ประตูทางเข้า Office GA",
            "FIELD5": "FET-FA1-DC-009"
        },
        {
            "No":10,
            "Location": "Factory 1",
            "Code": "FA1-DC-010",
            "SubLocation": "หน้าห้อง Conf. 1",
            "FIELD5": "FET-FA1-DC-010"
        },
        {
            "No":11,
            "Location": "Factory 1",
            "Code": "FA1-CO-011",
            "SubLocation": "Washing M/C (เครื่องล้าง)",
            "FIELD5": "FET-FA1-CO-011"
        },
        {
            "No":12,
            "Location": "Factory 1",
            "Code": "FA1-CO-012",
            "SubLocation": "Oven ชั้น 2",
            "FIELD5": "FET-FA1-CO-012"
        },
        {
            "No":13,
            "Location": "Factory 1",
            "Code": "FA1-CO-013",
            "SubLocation": "main Assy Line1 ",
            "FIELD5": "FET-FA1-CO-013"
        },
        {
            "No":14,
            "Location": "Factory 1",
            "Code": "FA1-CO-014",
            "SubLocation": "main Assy Line1 ",
            "FIELD5": "FET-FA1-CO-014"
        },
        {
            "No":15,
            "Location": "Factory 1",
            "Code": "FA1-CO-015",
            "SubLocation": "main Assy Line2",
            "FIELD5": "FET-FA1-CO-015"
        },
        {
            "No":16,
            "Location": "Factory 1",
            "Code": "FA1-CO-016",
            "SubLocation": "ทางเดินหน้าห้อง Mecha",
            "FIELD5": "FET-FA1-CO-016"
        },
        {
            "No":17,
            "Location": "Factory 1",
            "Code": "FA1-CO-017",
            "SubLocation": "หน้า Machine group 4 Fac.1",
            "FIELD5": "FET-FA1-CO-017"
        },
        {
            "No":18,
            "Location": "Factory 1",
            "Code": "FA1-CO-018",
            "SubLocation": "ท้ายไลน์ Final Assy 1 YC",
            "FIELD5": "FET-FA1-CO-018"
        },
        {
            "No":19,
            "Location": "Factory 1",
            "Code": "FA1-DC-019",
            "SubLocation": "ท้าย Line Final Assy 1 YC",
            "FIELD5": "FET-FA1-DC-019"
        },
        {
            "No":20,
            "Location": "Factory 1",
            "Code": "FA1-CO-020",
            "SubLocation": "Oven ชั้น 2",
            "FIELD5": "FET-FA1-CO-020"
        },
        {
            "No":21,
            "Location": "Factory 1",
            "Code": "FA1-CO-021",
            "SubLocation": "ข้างบ่อ Leak Final 1 YC",
            "FIELD5": "FET-FA1-CO-021"
        },
        {
            "No":22,
            "Location": "Factory 1",
            "Code": "FA1-CO-022",
            "SubLocation": "ท้าย Line TOP",
            "FIELD5": "FET-FA1-CO-022"
        },
        {
            "No":23,
            "Location": "Factory 1",
            "Code": "FA1-CO-023",
            "SubLocation": "Line PIPE 1 YC",
            "FIELD5": "FET-FA1-CO-023"
        },
        {
            "No":24,
            "Location": "Factory 1",
            "Code": "FA1-CO-024",
            "SubLocation": "Line PIPE 1 YC",
            "FIELD5": "FET-FA1-CO-024"
        },
        {
            "No":25,
            "Location": "Factory 1",
            "Code": "FA1-CO-025",
            "SubLocation": "Line PIPE 1 YC",
            "FIELD5": "FET-FA1-CO-025"
        },
        {
            "No":26,
            "Location": "Factory 1",
            "Code": "FA1-CO-026",
            "SubLocation": "Cylinder 1 YC",
            "FIELD5": "FET-FA1-CO-026"
        },
        {
            "No":27,
            "Location": "Factory 1",
            "Code": "FA1-CO-027",
            "SubLocation": "Cylinder 1 YC",
            "FIELD5": "FET-FA1-CO-027"
        },
        {
            "No":28,
            "Location": "Factory 1",
            "Code": "FA1-CO-028",
            "SubLocation": "Crank Shaft Finish 1 YC",
            "FIELD5": "FET-FA1-CO-028"
        },
        {
            "No":29,
            "Location": "Factory 1",
            "Code": "FA1-CO-029",
            "SubLocation": "Piston 1 YC",
            "FIELD5": "FET-FA1-CO-029"
        },
        {
            "No":30,
            "Location": "Factory 1",
            "Code": "FA1-CO-030",
            "SubLocation": "ข้างประตูทางเข้าห้องไฟโรงงาน 1",
            "FIELD5": "FET-FA1-CO-030"
        },
        {
            "No":31,
            "Location": "Factory 1",
            "Code": "FA1-CO-031",
            "SubLocation": "ในห้องไฟฟ้า  UT Fac.1",
            "FIELD5": "FET-FA1-CO-031"
        },
        {
            "No":32,
            "Location": "Factory 1",
            "Code": "FA1-DC-032",
            "SubLocation": "ด้านข้าง Incoming",
            "FIELD5": "FET-FA1-DC-032"
        },
        {
            "No":33,
            "Location": "Factory 1",
            "Code": "FA1-DC-033",
            "SubLocation": "ข้าง Crank Shaft Rough 1 YC",
            "FIELD5": "FET-FA1-DC-033"
        },
        {
            "No":34,
            "Location": "Factory 1",
            "Code": "FA1-DC-034",
            "SubLocation": "เสาข้าง Conf.7",
            "FIELD5": "FET-FA1-DC-034"
        },
        {
            "No":35,
            "Location": "Factory 1",
            "Code": "FA1-DC-035",
            "SubLocation": "ข้างจุดวางบิล",
            "FIELD5": "FET-FA1-DC-035"
        },
        {
            "No":36,
            "Location": "Factory 1",
            "Code": "FA1-CO-036",
            "SubLocation": "Main Assy line 2",
            "FIELD5": "FET-FA1-CO-036"
        },
        {
            "No":37,
            "Location": "Factory 1",
            "Code": "FA1-DC-037",
            "SubLocation": "ข้างตู้ Locker พื้นที่คนท้อง",
            "FIELD5": "FET-FA1-DC-037"
        },
        {
            "No":38,
            "Location": "Factory 1",
            "Code": "FA1-CO-038",
            "SubLocation": "ในห้อง Saver IT office 1 ชั้น 2",
            "FIELD5": "FET-FA1-CO-038"
        },
        {
            "No":39,
            "Location": "Factory 1",
            "Code": "FA1-CO-039",
            "SubLocation": "ข้าง Hanger Main 1 YC ( 50 Lbs.)",
            "FIELD5": "FET-FA1-CO-039"
        },
        {
            "No":40,
            "Location": "Factory 2",
            "Code": "FA2-DC-001",
            "SubLocation": "หน้าห้องน้ำข้าง Line Final SCR",
            "FIELD5": "FET-FA2-DC-001"
        },
        {
            "No":41,
            "Location": "Factory 2",
            "Code": "FA2-CO-002",
            "SubLocation": "ทางเดินข้าง Line Main 2YC",
            "FIELD5": "FET-FA2-CO-002"
        },
        {
            "No":42,
            "Location": "Factory 2",
            "Code": "FA2-DC-003",
            "SubLocation": "หน้าประตูทางเข้า Main Line 7",
            "FIELD5": "FET-FA2-DC-003"
        },
        {
            "No":43,
            "Location": "Factory 2",
            "Code": "FA2-DC-004",
            "SubLocation": "ข้างประตูทางเข้า Office ชั้น 2 โรงงาน 2",
            "FIELD5": "FET-FA2-DC-004"
        },
        {
            "No":44,
            "Location": "Factory 2",
            "Code": "FA2-CO-005",
            "SubLocation": "ในห้อง meeting Officeชั้น 2 โรงงาน2",
            "FIELD5": "FET-FA2-CO-005"
        },
        {
            "No":45,
            "Location": "Factory 2",
            "Code": "FA2-DC-006",
            "SubLocation": "หน้าประตูเข้า Line Main 2YC",
            "FIELD5": "FET-FA2-DC-006"
        },
        {
            "No":46,
            "Location": "Factory 2",
            "Code": "FA2-DC-007",
            "SubLocation": "ทางเดินหน้า Final 2 YC & Final Scroll",
            "FIELD5": "FET-FA2-DC-007"
        },
        {
            "No":47,
            "Location": "Factory 2",
            "Code": "FA2-CO-008",
            "SubLocation": "เสาด้านใน Line Final 2 YC",
            "FIELD5": "FET-FA2-CO-008"
        },
        {
            "No":48,
            "Location": "Factory 2",
            "Code": "FA2-CO-009",
            "SubLocation": "เสาใต้บันได Sky walk",
            "FIELD5": "FET-FA2-CO-009"
        },
        {
            "No":49,
            "Location": "Factory 2",
            "Code": "FA2-CO-010",
            "SubLocation": "ประตูห้องกลาง Line Main 2CY ",
            "FIELD5": "FET-FA2-CO-010"
        },
        {
            "No":50,
            "Location": "Factory 2",
            "Code": "FA2-CO-011",
            "SubLocation": "เสาหน้าหัว Line SCR group 1",
            "FIELD5": "FET-FA2-CO-011"
        },
        {
            "No":51,
            "Location": "Factory 2",
            "Code": "FA2-CO-012",
            "SubLocation": "เสากลาง Line SCR group 1",
            "FIELD5": "FET-FA2-CO-012"
        },
        {
            "No":52,
            "Location": "Factory 2",
            "Code": "FA2-DC-013",
            "SubLocation": "ทางเดินหน้า Machine SCR",
            "FIELD5": "FET-FA2-DC-013"
        },
        {
            "No":53,
            "Location": "Factory 2",
            "Code": "FA2-CO-014",
            "SubLocation": "เสา Crank Shaft Hardening",
            "FIELD5": "FET-FA2-CO-014"
        },
        {
            "No":54,
            "Location": "Factory 2",
            "Code": "FA2-CO-015",
            "SubLocation": "เสาทางเดิน Crank Shaft 2YC",
            "FIELD5": "FET-FA2-CO-015"
        },
        {
            "No":55,
            "Location": "Factory 2",
            "Code": "FA2-CO-016",
            "SubLocation": "Line Pipe Scroll",
            "FIELD5": "FET-FA2-CO-016"
        },
        {
            "No":56,
            "Location": "Factory 2",
            "Code": "FA2-CO-017",
            "SubLocation": "เสาหัว Line Lubrite SCR",
            "FIELD5": "FET-FA2-CO-017"
        },
        {
            "No":57,
            "Location": "Factory 2",
            "Code": "FA2-DC-018",
            "SubLocation": "FHC 15. ข้างอ่างล้างตาเครื่องล้าง Assembly 2YC",
            "FIELD5": "FET-FA2-DC-018"
        },
        {
            "No":58,
            "Location": "Factory 2",
            "Code": "FA2-DC-019",
            "SubLocation": "ทางเดินหน้าห้องไฟโรงงาน 2",
            "FIELD5": "FET-FA2-DC-019"
        },
        {
            "No":59,
            "Location": "Factory 2",
            "Code": "FA2-DC-020",
            "SubLocation": "เสาประตูใหญ่ข้างห้องไฟโรงงาน 2",
            "FIELD5": "FET-FA2-DC-020"
        },
        {
            "No":60,
            "Location": "Factory 2",
            "Code": "FA2-CO-021",
            "SubLocation": "ในห้องไฟฟ้าโรงงาน 2",
            "FIELD5": "FET-FA2-CO-021"
        },
        {
            "No":61,
            "Location": "Factory 2",
            "Code": "FA2-DC-022",
            "SubLocation": "ทางเดินท้าย Line Final Line 5",
            "FIELD5": "FET-FA2-DC-022"
        },
        {
            "No":62,
            "Location": "Factory 2",
            "Code": "FA2-DC-023",
            "SubLocation": "เสาด้านข้างตู้ FHC 19. Final Line 5",
            "FIELD5": "FET-FA2-DC-023"
        },
        {
            "No":63,
            "Location": "Factory 2",
            "Code": "FA2-CO-024",
            "SubLocation": "เสา Line Piston 63",
            "FIELD5": "FET-FA2-CO-024"
        },
        {
            "No":64,
            "Location": "Factory 2",
            "Code": "FA2-CO-025",
            "SubLocation": "เสา Line Piston 36",
            "FIELD5": "FET-FA2-CO-025"
        },
        {
            "No":65,
            "Location": "Factory 2",
            "Code": "FA2-CO-026",
            "SubLocation": "ท้าย Line  Pipe  2YC",
            "FIELD5": "FET-FA2-CO-026"
        },
        {
            "No":66,
            "Location": "Factory 2",
            "Code": "FA2-CO-027",
            "SubLocation": "หัว Line Pipe 2YC",
            "FIELD5": "FET-FA2-CO-027"
        },
        {
            "No":67,
            "Location": "Factory 2",
            "Code": "FA2-CO-028",
            "SubLocation": "ข้าง Line Cylinder Finish No.1",
            "FIELD5": "FET-FA2-CO-028"
        },
        {
            "No":68,
            "Location": "Factory 2",
            "Code": "FA2-CO-029",
            "SubLocation": "ข้าง Line Cylinder Finish No.2",
            "FIELD5": "FET-FA2-CO-029"
        },
        {
            "No":69,
            "Location": "Factory 2",
            "Code": "FA2-CO-030",
            "SubLocation": "ข้าง Lubrite M/C 2YC",
            "FIELD5": "FET-FA2-CO-030"
        },
        {
            "No":70,
            "Location": "Factory 2",
            "Code": "FA2-DC-031",
            "SubLocation": "ข้าง Line Crank shaft 2YC (ใกล้อ่างล้างตา)",
            "FIELD5": "FET-FA2-DC-031"
        },
        {
            "No":71,
            "Location": "Factory 2",
            "Code": "FA2-CO-032",
            "SubLocation": "ข้าง Line Fron head 2YC",
            "FIELD5": "FET-FA2-CO-032"
        },
        {
            "No":72,
            "Location": "Factory 2",
            "Code": "FA2-DC-033",
            "SubLocation": "ทางเดินด้านหลัง Crank shaft 2YC",
            "FIELD5": "FET-FA2-DC-033"
        },
        {
            "No":73,
            "Location": "Factory 2",
            "Code": "FA2-DC-034",
            "SubLocation": "ใกล้ Dry  Oven",
            "FIELD5": "FET-FA2-DC-034"
        },
        {
            "No":74,
            "Location": "Factory 2",
            "Code": "FA2-CO-035",
            "SubLocation": "เสา จุดเก็บถังลวด Motor",
            "FIELD5": "FET-FA2-CO-035"
        },
        {
            "No":75,
            "Location": "Factory 2",
            "Code": "FA2-CO-036",
            "SubLocation": "ในห้องวานิช",
            "FIELD5": "FET-FA2-CO-036"
        },
        {
            "No":76,
            "Location": "Factory 2",
            "Code": "FA2-DC-037",
            "SubLocation": "ประตูทางออกด้านห้องเก็บสารเคมี Vanish",
            "FIELD5": "FET-FA2-DC-037"
        },
        {
            "No":77,
            "Location": "Factory 2",
            "Code": "FA2-DC-038",
            "SubLocation": "ในห้องเก็บสารเคมี Vanish",
            "FIELD5": "FET-FA2-DC-038"
        },
        {
            "No":78,
            "Location": "Factory 2",
            "Code": "FA2-CO-039",
            "SubLocation": "ข้างตู้ FHC 20 ในห้อง Motor",
            "FIELD5": "FET-FA2-CO-039"
        },
        {
            "No":79,
            "Location": "Factory 2",
            "Code": "FA2-CO-040",
            "SubLocation": "ห้อง Motor Stator Line",
            "FIELD5": "FET-FA2-CO-040"
        },
        {
            "No":80,
            "Location": "Factory 2",
            "Code": "FA2-CO-041",
            "SubLocation": "ทางเดินด้านหลังห้อง macha  Line 5",
            "FIELD5": "FET-FA2-CO-041"
        },
        {
            "No":81,
            "Location": "Factory 2",
            "Code": "FA2-CO-042",
            "SubLocation": "ทางเดินด้านหลัง Line main assy Line 5",
            "FIELD5": "FET-FA2-CO-042"
        },
        {
            "No":82,
            "Location": "Factory 2",
            "Code": "FA2-CO-043",
            "SubLocation": "เสาด้านใน Final  Line 5 Floor 1",
            "FIELD5": "FET-FA2-CO-043"
        },
        {
            "No":83,
            "Location": "Factory 2",
            "Code": "FA2-CO-044",
            "SubLocation": " Final  Line 5 Floor 2",
            "FIELD5": "FET-FA2-CO-044"
        },
        {
            "No":84,
            "Location": "Factory 2",
            "Code": "FA2-CO-045",
            "SubLocation": " Final  Line 5 Floor 2",
            "FIELD5": "FET-FA2-CO-045"
        },
        {
            "No":85,
            "Location": "Factory 2",
            "Code": "FA2-CO-046",
            "SubLocation": "Final Line 2YC/SCR  Floor 2",
            "FIELD5": "FET-FA2-CO-046"
        },
        {
            "No":86,
            "Location": "Factory 2",
            "Code": "FA2-CO-047",
            "SubLocation": "ห้อง Stator Large Capacity",
            "FIELD5": "FET-FA2-CO-047"
        },
        {
            "No":87,
            "Location": "Factory 2",
            "Code": "FA2-DC-048",
            "SubLocation": "เสาใกล้ห้องอบสี Line Final Scroll",
            "FIELD5": "FET-FA2-DC-048"
        },
        {
            "No":88,
            "Location": "Factory 2",
            "Code": "FA2-CO-049",
            "SubLocation": "หลังเครื่อง Winding Stator",
            "FIELD5": "FET-FA2-CO-049"
        },
        {
            "No":89,
            "Location": "Factory 2",
            "Code": "FA2-CO-050",
            "SubLocation": "ข้างตู้ Control ใกล้ประตูทางออก motor line",
            "FIELD5": "FET-FA2-CO-050"
        },
        {
            "No":90,
            "Location": "Factory 2",
            "Code": "FA2-CO-051",
            "SubLocation": "เสาทางออก Main Line 4",
            "FIELD5": "FET-FA2-CO-051"
        },
        {
            "No":91,
            "Location": "Factory 2",
            "Code": "FA2-CO-052",
            "SubLocation": "ข้างประตูทางเข้า Mecha Line 7",
            "FIELD5": "FET-FA2-CO-052"
        },
        {
            "No":92,
            "Location": "Factory 2",
            "Code": "FA2-CO-053",
            "SubLocation": "ประตูทางออก Line Main SCR",
            "FIELD5": "FET-FA2-CO-053"
        },
        {
            "No":93,
            "Location": "Factory 2",
            "Code": "FA2-CO-054",
            "SubLocation": "ห้อง Insulator  Injector 2",
            "FIELD5": "FET-FA2-CO-054"
        },
        {
            "No":94,
            "Location": "Factory 2",
            "Code": "FA2-CO-055",
            "SubLocation": "Rework 2YC/SCR ( 50 lbs.)",
            "FIELD5": "FET-FA2-CO-055"
        },
        {
            "No":95,
            "Location": "Factory 2",
            "Code": "FA2-CO-056",
            "SubLocation": "ทางเดินตรงข้าม Top/Bottom Welding ( 50 lbs.)",
            "FIELD5": "FET-FA2-CO-056"
        },
        {
            "No":96,
            "Location": "Factory 2",
            "Code": "FA2-CO-057",
            "SubLocation": "ห้อง Large P SCR No.1",
            "FIELD5": "FET-FA2-CO-057"
        },
        {
            "No":97,
            "Location": "Factory 2",
            "Code": "FA2-CO-058",
            "SubLocation": "ห้อง Large P SCR No.2",
            "FIELD5": "FET-FA2-CO-058"
        },
        {
            "No":98,
            "Location": "Factory 2",
            "Code": "FA2-CO-059",
            "SubLocation": "ห้อง Large P SCR No.3",
            "FIELD5": "FET-FA2-CO-059"
        },
        {
            "No":99,
            "Location": "Factory 2",
            "Code": "FA2-CO-060",
            "SubLocation": "ห้อง Large P SCR No.4",
            "FIELD5": "FET-FA2-CO-060"
        },
        {
            "No":100,
            "Location": "Factory 2",
            "Code": "FA2-CO-061",
            "SubLocation": "ห้อง Large P SCR No.5",
            "FIELD5": "FET-FA2-CO-061"
        },
        {
            "No":101,
            "Location": "Factory 2",
            "Code": "FA2-CO-062",
            "SubLocation": "ห้อง Large P SCR No.6",
            "FIELD5": "FET-FA2-CO-062"
        },
        {
            "No":102,
            "Location": "Factory 2",
            "Code": "FA2-DC-063",
            "SubLocation": "ห้องผสมน้ำยาวานิช No.1",
            "FIELD5": "FET-FA2-DC-063"
        },
        {
            "No":103,
            "Location": "Factory 2",
            "Code": "FA2-DC-064",
            "SubLocation": "ห้องผสมน้ำยาวานิช No.2",
            "FIELD5": "FET-FA2-DC-064"
        },
        {
            "No":104,
            "Location": "Factory 3",
            "Code": "FA3-DC-001",
            "SubLocation": "ประตูทางเข้าห้องน้ำ ติดบอร์ดประชาสัมพันธ์",
            "FIELD5": "FET-FA3-DC-001"
        },
        {
            "No":105,
            "Location": "Factory 3",
            "Code": "FA3-DC-002",
            "SubLocation": "ประตูทางออกใกล้ Rear head finish line",
            "FIELD5": "FET-FA3-DC-002"
        },
        {
            "No":106,
            "Location": "Factory 3",
            "Code": "FA3-DC-003",
            "SubLocation": "เสาข้างตู้กดน้ำ ใกล้ตู้ Locker",
            "FIELD5": "FET-FA3-DC-003"
        },
        {
            "No":107,
            "Location": "Factory 3",
            "Code": "FA3-DC-004",
            "SubLocation": "ในตู้สายน้ำ FHC-36",
            "FIELD5": "FET-FA3-DC-004"
        },
        {
            "No":108,
            "Location": "Factory 3",
            "Code": "FA3-DC-005",
            "SubLocation": "ข้างตู้ไฟ หลังโต๊ะ SU & FO ฝั่งบ่อ leak line5",
            "FIELD5": "FET-FA3-DC-005"
        },
        {
            "No":109,
            "Location": "Factory 3",
            "Code": "FA3-DC-006",
            "SubLocation": "ในตู้สายน้ำ FHC-37",
            "FIELD5": "FET-FA3-DC-006"
        },
        {
            "No":110,
            "Location": "Factory 3",
            "Code": "FA3-DC-007",
            "SubLocation": "เสาติดหน้าต่าง Front front head",
            "FIELD5": "FET-FA3-DC-007"
        },
        {
            "No":111,
            "Location": "Factory 3",
            "Code": "FA3-DC-008",
            "SubLocation": "ประตูทางออกฝั่งจุดรวมพลที่2",
            "FIELD5": "FET-FA3-DC-008"
        },
        {
            "No":112,
            "Location": "Factory 3",
            "Code": "FA3-DC-009",
            "SubLocation": "เสาแรกติดผนังฝั่งลานจอดรถ",
            "FIELD5": "FET-FA3-DC-009"
        },
        {
            "No":113,
            "Location": "Factory 3",
            "Code": "FA3-CO-010",
            "SubLocation": "เสาข้าง line crank shaft rought",
            "FIELD5": "FET-FA3-CO-010"
        },
        {
            "No":114,
            "Location": "Factory 3",
            "Code": "FA3-CO-011",
            "SubLocation": "เสาข้าง line crank shaft rought",
            "FIELD5": "FET-FA3-CO-011"
        },
        {
            "No":115,
            "Location": "Factory 3",
            "Code": "FA3-CO-012",
            "SubLocation": "เสามุม line middle plare finish",
            "FIELD5": "FET-FA3-CO-012"
        },
        {
            "No":116,
            "Location": "Factory 3",
            "Code": "FA3-CO-013",
            "SubLocation": "ข้างไลน์  Rear head finish",
            "FIELD5": "FET-FA3-CO-013"
        },
        {
            "No":117,
            "Location": "Factory 3",
            "Code": "FA3-CO-014",
            "SubLocation": "ข้างไลน์  Rear head finish",
            "FIELD5": "FET-FA3-CO-014"
        },
        {
            "No":118,
            "Location": "Factory 3",
            "Code": "FA3-DC-015",
            "SubLocation": "Crane Motor Room",
            "FIELD5": "FET-FA3-DC-015"
        },
        {
            "No":119,
            "Location": "Factory 3",
            "Code": "FA3-DC-016",
            "SubLocation": "เสาข้างตู้ locker ฝั่ง Motor ODM",
            "FIELD5": "FET-FA3-DC-016"
        },
        {
            "No":120,
            "Location": "Factory 3",
            "Code": "FA3-DC-017",
            "SubLocation": "ในตู้ FHC-39",
            "FIELD5": "FET-FA3-DC-017"
        },
        {
            "No":121,
            "Location": "Factory 3",
            "Code": "FA3-CO-018",
            "SubLocation": "Motor Room เสา Stator line",
            "FIELD5": "FET-FA3-CO-018"
        },
        {
            "No":122,
            "Location": "Factory 3",
            "Code": "FA3-CO-019",
            "SubLocation": "เสาท้ายไลน์ Front Head Finish",
            "FIELD5": "FET-FA3-CO-019"
        },
        {
            "No":123,
            "Location": "Factory 3",
            "Code": "FA3-CO-020",
            "SubLocation": "เสากลางไลน์ Front Head Finish",
            "FIELD5": "FET-FA3-CO-020"
        },
        {
            "No":124,
            "Location": "Factory 3",
            "Code": "FA3-CO-021",
            "SubLocation": "เสาต้นไลน์ Front Head",
            "FIELD5": "FET-FA3-CO-021"
        },
        {
            "No":125,
            "Location": "Factory 3",
            "Code": "FA3-CO-022",
            "SubLocation": "เสากลางไลน์  Piston Finish",
            "FIELD5": "FET-FA3-CO-022"
        },
        {
            "No":126,
            "Location": "Factory 3",
            "Code": "FA3-CO-023",
            "SubLocation": "เสาไลน์  Piston Finish",
            "FIELD5": "FET-FA3-CO-023"
        },
        {
            "No":127,
            "Location": "Factory 3",
            "Code": "FA3-DC-024",
            "SubLocation": "ในตู้สายน้ำ FHC-38",
            "FIELD5": "FET-FA3-DC-024"
        },
        {
            "No":128,
            "Location": "Factory 3",
            "Code": "FA3-DC-025",
            "SubLocation": "เสาประตูทางออกตรงบอร์ด final line 8",
            "FIELD5": "FET-FA3-DC-025"
        },
        {
            "No":129,
            "Location": "Factory 3",
            "Code": "FA3-DC-026",
            "SubLocation": "ในตู้สายน้ำ FHC-42",
            "FIELD5": "FET-FA3-DC-026"
        },
        {
            "No":130,
            "Location": "Factory 3",
            "Code": "FA3-CO-027",
            "SubLocation": "เสาตรงบ่อLeak Fac.3",
            "FIELD5": "FET-FA3-CO-027"
        },
        {
            "No":131,
            "Location": "Factory 3",
            "Code": "FA3-DC-028",
            "SubLocation": "ในตู้สายน้ำ FHC-41",
            "FIELD5": "FET-FA3-DC-028"
        },
        {
            "No":132,
            "Location": "Factory 3",
            "Code": "FA3-DC-029",
            "SubLocation": "ในตู้สายน้ำ FHC-40",
            "FIELD5": "FET-FA3-DC-029"
        },
        {
            "No":133,
            "Location": "Factory 3",
            "Code": "FA3-CO-030",
            "SubLocation": "เสาหน้าประตูทางเข้า Motor fac.3",
            "FIELD5": "FET-FA3-CO-030"
        },
        {
            "No":134,
            "Location": "Factory 3",
            "Code": "FA3-CO-031",
            "SubLocation": "เสาติดผนังฝั่ง ODM Pipe line 8",
            "FIELD5": "FET-FA3-CO-031"
        },
        {
            "No":135,
            "Location": "Factory 3",
            "Code": "FA3-CO-032",
            "SubLocation": "เสาติดผนังฝั่งประตูทางออกไป ODM Pipe line 8",
            "FIELD5": "FET-FA3-CO-032"
        },
        {
            "No":136,
            "Location": "Factory 3",
            "Code": "FA3-CO-033",
            "SubLocation": "ตรงเครื่อง Washing หน้าห้อง Mecha",
            "FIELD5": "FET-FA3-CO-033"
        },
        {
            "No":137,
            "Location": "Factory 3",
            "Code": "FA3-DC-034",
            "SubLocation": "ในตู้สายน้ำ FHC-45",
            "FIELD5": "FET-FA3-DC-034"
        },
        {
            "No":138,
            "Location": "Factory 3",
            "Code": "FA3-CO-035",
            "SubLocation": "เสาประตูทางขึ้น office fac.3 ฝั่ง Pipe line 8",
            "FIELD5": "FET-FA3-CO-035"
        },
        {
            "No":139,
            "Location": "Factory 3",
            "Code": "FA3-CO-036",
            "SubLocation": "ประตูทางออกไปห้อง Fire Pump/Top line",
            "FIELD5": "FET-FA3-CO-036"
        },
        {
            "No":140,
            "Location": "Factory 3",
            "Code": "FA3-DC-037",
            "SubLocation": "เสาติดผนังหน้าห้องไฟฟ้า Fac.3",
            "FIELD5": "FET-FA3-DC-037"
        },
        {
            "No":141,
            "Location": "Factory 3",
            "Code": "FA3-DC-038",
            "SubLocation": "ในตู้สายน้ำ FHC-44",
            "FIELD5": "FET-FA3-DC-038"
        },
        {
            "No":142,
            "Location": "Factory 3",
            "Code": "FA3-DC-039",
            "SubLocation": "ข้างตู้สายน้ำ FHC-44",
            "FIELD5": "FET-FA3-DC-039"
        },
        {
            "No":143,
            "Location": "Factory 3",
            "Code": "FA3-DC-040",
            "SubLocation": "เสาติดผนังจุด Brazing rework line 6,8",
            "FIELD5": "FET-FA3-DC-040"
        },
        {
            "No":144,
            "Location": "Factory 3",
            "Code": "FA3-DC-041",
            "SubLocation": "ประตูทางออกไปห้อง Fire Pump",
            "FIELD5": "FET-FA3-DC-041"
        },
        {
            "No":145,
            "Location": "Factory 3",
            "Code": "FA3-DC-042",
            "SubLocation": "ในตู้สายน้ำ FHC-43",
            "FIELD5": "FET-FA3-DC-042"
        },
        {
            "No":146,
            "Location": "Factory 3",
            "Code": "FA3-DC-043",
            "SubLocation": "เสาติดผนัง Final line ตรง Rework fac.3",
            "FIELD5": "FET-FA3-DC-043"
        },
        {
            "No":147,
            "Location": "Factory 3",
            "Code": "FA3-DC-044",
            "SubLocation": "ประตูทางออกไป Packing center",
            "FIELD5": "FET-FA3-DC-044"
        },
        {
            "No":148,
            "Location": "Factory 3",
            "Code": "FA3-CO-045",
            "SubLocation": "เสาผนังฝั่ง Final line 8",
            "FIELD5": "FET-FA3-CO-045"
        },
        {
            "No":149,
            "Location": "Factory 3",
            "Code": "FA3-CO-046",
            "SubLocation": "Brazing ข้างตู้ Control Water Check Leak",
            "FIELD5": "FET-FA3-CO-046"
        },
        {
            "No":150,
            "Location": "Factory 3",
            "Code": "FA3-CO-047",
            "SubLocation": "ในห้อง Mecha line 8 ฝั่งห้องไฟ",
            "FIELD5": "FET-FA3-CO-047"
        },
        {
            "No":151,
            "Location": "Factory 3",
            "Code": "FA3-CO-048",
            "SubLocation": "ในห้อง Main line 6&8 เสากลางไลน์",
            "FIELD5": "FET-FA3-CO-048"
        },
        {
            "No":152,
            "Location": "Factory 3",
            "Code": "FA3-CO-049",
            "SubLocation": "ในห้อง Main assy line 6 ฝั่ง Machine",
            "FIELD5": "FET-FA3-CO-049"
        },
        {
            "No":153,
            "Location": "Factory 3",
            "Code": "FA3-CO-050",
            "SubLocation": "ในห้อง Main  assy line 6 ฝั่ง Machine",
            "FIELD5": "FET-FA3-CO-050"
        },
        {
            "No":154,
            "Location": "Factory 3",
            "Code": "FA3-CO-051",
            "SubLocation": "ในห้อง Mecha เสากลางไลน์",
            "FIELD5": "FET-FA3-CO-051"
        },
        {
            "No":155,
            "Location": "Factory 3",
            "Code": "FA3-CO-052",
            "SubLocation": "ในห้อง Mecha ฝั่ง Machine",
            "FIELD5": "FET-FA3-CO-052"
        },
        {
            "No":156,
            "Location": "Factory 3",
            "Code": "FA3-DC-053",
            "SubLocation": "ในตู้สายน้ำ FHC-35",
            "FIELD5": "FET-FA3-DC-053"
        },
        {
            "No":157,
            "Location": "Factory 3",
            "Code": "FA3-CO-054",
            "SubLocation": "ห้องไฟ Fac.3",
            "FIELD5": "FET-FA3-CO-054"
        },
        {
            "No":158,
            "Location": "Factory 3",
            "Code": "FA3-CO-055",
            "SubLocation": "ห้องไฟ Fac.3",
            "FIELD5": "FET-FA3-CO-055"
        },
        {
            "No":159,
            "Location": "Factory 3",
            "Code": "FA3-CO-056",
            "SubLocation": "ห้องไฟ Fac.3",
            "FIELD5": "FET-FA3-CO-056"
        },
        {
            "No":160,
            "Location": "Factory 3",
            "Code": "FA3-CO-057",
            "SubLocation": "ห้องไฟ Fac.3",
            "FIELD5": "FET-FA3-CO-057"
        },
        {
            "No":161,
            "Location": "Factory 3",
            "Code": "FA3-DC-058",
            "SubLocation": "ห้องตรง Line Rotor line 6 ฝั่งประตูไปห้องน้ำ",
            "FIELD5": "FET-FA3-DC-058"
        },
        {
            "No":162,
            "Location": "Factory 3",
            "Code": "FA3-CO-059",
            "SubLocation": "ห้อง QC Sampling Fac.3",
            "FIELD5": "FET-FA3-CO-059"
        },
        {
            "No":163,
            "Location": "Factory 3",
            "Code": "FA3-CO-060",
            "SubLocation": "ในห้อง Main assy  เสากลางไลน์",
            "FIELD5": "FET-FA3-CO-060"
        },
        {
            "No":164,
            "Location": "Factory 3",
            "Code": "FA3-CO-061",
            "SubLocation": "ในห้อง Main assy/Botom process fitting",
            "FIELD5": "FET-FA3-CO-061"
        },
        {
            "No":165,
            "Location": "Factory 3",
            "Code": "FA3-CO-062",
            "SubLocation": "ในห้อง Main assy line 8 ฝั่งห้องไฟ",
            "FIELD5": "FET-FA3-CO-062"
        },
        {
            "No":166,
            "Location": "Factory 3",
            "Code": "FA3-CO-063",
            "SubLocation": "ในห้อง Main assy line 8 ฝั่งห้องไฟ",
            "FIELD5": "FET-FA3-CO-063"
        },
        {
            "No":167,
            "Location": "Factory 3",
            "Code": "FA3-DC-064",
            "SubLocation": "Office Fl.2 ในตู้ FHC-59",
            "FIELD5": "FET-FA3-DC-064"
        },
        {
            "No":168,
            "Location": "Factory 3",
            "Code": "FA3-DC-065",
            "SubLocation": "Office Fl.2 ฝั่ง EN",
            "FIELD5": "FET-FA3-DC-065"
        },
        {
            "No":169,
            "Location": "Factory 3",
            "Code": "FA3-DC-066",
            "SubLocation": "Office Fl.2 ฝั่ง PD",
            "FIELD5": "FET-FA3-DC-066"
        },
        {
            "No":170,
            "Location": "Factory 3",
            "Code": "FA3-DC-067",
            "SubLocation": "Office Fl.2 หลังโต๊ะผู้บริหาร",
            "FIELD5": "FET-FA3-DC-067"
        },
        {
            "No":171,
            "Location": "Factory 3",
            "Code": "FA3-DC-068",
            "SubLocation": "Office Fl.2 หลังโต๊ะผู้บริหาร",
            "FIELD5": "FET-FA3-DC-068"
        },
        {
            "No":172,
            "Location": "Factory 3",
            "Code": "FA3-DC-069",
            "SubLocation": "Stock Room Fl.2 ในตู้ FHC-60",
            "FIELD5": "FET-FA3-DC-069"
        },
        {
            "No":173,
            "Location": "Factory 3",
            "Code": "FA3-DC-070",
            "SubLocation": "Stock Room Fl.2",
            "FIELD5": "FET-FA3-DC-070"
        },
        {
            "No":174,
            "Location": "Factory 3",
            "Code": "FA3-DC-071",
            "SubLocation": "Stock Room Fl.2",
            "FIELD5": "FET-FA3-DC-071"
        },
        {
            "No":175,
            "Location": "Factory 3",
            "Code": "FA3-CO-072",
            "SubLocation": "ข้าง Lift Mecha Room",
            "FIELD5": "FET-FA3-CO-072"
        },
        {
            "No":176,
            "Location": "Factory 3",
            "Code": "FA3-CO-073",
            "SubLocation": "ในห้อง IOT ",
            "FIELD5": "FET-FA3-CO-073"
        },
        {
            "No":177,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-001",
            "SubLocation": "เสาฝั่งผนัง Stamping Area",
            "FIELD5": "FET-ODM-DC-001"
        },
        {
            "No":178,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-002",
            "SubLocation": "ประตูทางเข้าฝั่งโรงงาน3/ตู้หยอดน้ำ",
            "FIELD5": "FET-ODM-DC-002"
        },
        {
            "No":179,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-003",
            "SubLocation": "เสาฝั่งทางเข้าห้อง ODM  (ข้างห้องน้ำ)",
            "FIELD5": "FET-ODM-DC-003"
        },
        {
            "No":180,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-004",
            "SubLocation": "เสาระหว่าง Line Insulator กับ Core Pfress",
            "FIELD5": "FET-ODM-CO-004"
        },
        {
            "No":181,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-005",
            "SubLocation": "เสาระหว่าง Stator และ Rotor Line ฝั่ง Stamping",
            "FIELD5": "FET-ODM-CO-005"
        },
        {
            "No":182,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-006",
            "SubLocation": "เสา Stamping Area  (BMC M/C)",
            "FIELD5": "FET-ODM-DC-006"
        },
        {
            "No":183,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-007",
            "SubLocation": "ผนังหน้าห้อง Vanish (ODM)",
            "FIELD5": "FET-ODM-DC-007"
        },
        {
            "No":184,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-008",
            "SubLocation": "เสาระหว่าง Stator line small และ Rotor Line",
            "FIELD5": "FET-ODM-CO-008"
        },
        {
            "No":185,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-009",
            "SubLocation": "เสากลาง BMC",
            "FIELD5": "FET-ODM-CO-009"
        },
        {
            "No":186,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-010",
            "SubLocation": "ผนัง Stator Area ฝั่ง DOJO",
            "FIELD5": "FET-ODM-DC-010"
        },
        {
            "No":187,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-011",
            "SubLocation": "ด้านหลัง Stator Area (BMC)",
            "FIELD5": "FET-ODM-DC-011"
        },
        {
            "No":188,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-012",
            "SubLocation": "เสาด้านลัง Line Rotor small outdoor",
            "FIELD5": "FET-ODM-DC-012"
        },
        {
            "No":189,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-013",
            "SubLocation": "FHC-29 Stamping ฝั่งโรงงาน3",
            "FIELD5": "FET-ODM-DC-013"
        },
        {
            "No":190,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-014",
            "SubLocation": "FHC-30 ฝั่งโรงงาน 3",
            "FIELD5": "FET-ODM-DC-014"
        },
        {
            "No":191,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-015",
            "SubLocation": "FHC-31 Stator ฝั่ง DOJO",
            "FIELD5": "FET-ODM-DC-015"
        },
        {
            "No":192,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-016",
            "SubLocation": "FHC-32 ด้านหลัง Stator Area",
            "FIELD5": "FET-ODM-DC-016"
        },
        {
            "No":193,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-017",
            "SubLocation": "FHC-33 ด้านหลัง Injection Line Rotor Small",
            "FIELD5": "FET-ODM-DC-017"
        },
        {
            "No":194,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-018",
            "SubLocation": "FHC-34 ด้านหน้าห้อง Vanish (ODM)",
            "FIELD5": "FET-ODM-DC-018"
        },
        {
            "No":195,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-019",
            "SubLocation": "เสาประตูทางเข้าในห้อง Vanish",
            "FIELD5": "FET-ODM-CO-019"
        },
        {
            "No":196,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-020",
            "SubLocation": "เสากลางห้อง Vanish",
            "FIELD5": "FET-ODM-CO-020"
        },
        {
            "No":197,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-021",
            "SubLocation": "เสาใกล้ประตูหนีไฟห้อง Vanish",
            "FIELD5": "FET-ODM-CO-021"
        },
        {
            "No":198,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-022",
            "SubLocation": "ห้องเก็บสารเคมี BMC",
            "FIELD5": "FET-ODM-CO-022"
        },
        {
            "No":199,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-023",
            "SubLocation": "ห้องไฟฟ้า ODM",
            "FIELD5": "FET-ODM-CO-023"
        },
        {
            "No":200,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-024",
            "SubLocation": "ในห้อง Vanish ODM",
            "FIELD5": "FET-ODM-CO-024"
        },
        {
            "No":201,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-025",
            "SubLocation": "ODM Out Door ประตูทางเข้า-ออก ฝั่ง Dojo",
            "FIELD5": "FET-ODM-CO-025"
        },
        {
            "No":202,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-026",
            "SubLocation": "ODM Out Door ในตู้สายน้ำ FHC-50 ฝั่งกำแพง",
            "FIELD5": "FET-ODM-DC-026"
        },
        {
            "No":203,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-027",
            "SubLocation": "ODM Out Door หลัง Crane No.3",
            "FIELD5": "FET-ODM-CO-027"
        },
        {
            "No":204,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-028",
            "SubLocation": "ODM Out Door ในตู้สายน้ำ FHC-51 Crane No.2",
            "FIELD5": "FET-ODM-DC-028"
        },
        {
            "No":205,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-029",
            "SubLocation": "ODM Out Door หลัง Crane No.2",
            "FIELD5": "FET-ODM-CO-029"
        },
        {
            "No":206,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-030",
            "SubLocation": "ODM Out Door เสากลาง ข้าง BMC M/C",
            "FIELD5": "FET-ODM-CO-030"
        },
        {
            "No":207,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-031",
            "SubLocation": "ODM Out Door ประตูทางเข้าห้องน้ำฝั่ง MT",
            "FIELD5": "FET-ODM-CO-031"
        },
        {
            "No":208,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-032",
            "SubLocation": "ODM Out Door ในตู้ FHC-52",
            "FIELD5": "FET-ODM-DC-032"
        },
        {
            "No":209,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-033",
            "SubLocation": "ODM Out Door IT Room",
            "FIELD5": "FET-ODM-CO-033"
        },
        {
            "No":210,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-034",
            "SubLocation": "ODM Out Door IT Room",
            "FIELD5": "FET-ODM-CO-034"
        },
        {
            "No":211,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-035",
            "SubLocation": "ODM Out Door หน้าห้อง BMC",
            "FIELD5": "FET-ODM-CO-035"
        },
        {
            "No":212,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-036",
            "SubLocation": "ODM Out Door Fl.2 ในห้องตรง Line ODM stator",
            "FIELD5": "FET-ODM-CO-036"
        },
        {
            "No":213,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-037",
            "SubLocation": "ODM Out Door Fl.2 หน้า Main Assy Room",
            "FIELD5": "FET-ODM-CO-037"
        },
        {
            "No":214,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-038",
            "SubLocation": "ODM Out Door Fl.2 ในตู้สายน้ำ FHC-53",
            "FIELD5": "FET-ODM-DC-038"
        },
        {
            "No":215,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-039",
            "SubLocation": "ODM Out Door Fl.2 เสาตรงมุมฝั่ง Office 3",
            "FIELD5": "FET-ODM-CO-039"
        },
        {
            "No":216,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-040",
            "SubLocation": "ODM Out Door Fl.2 พื้นที่วางงาน Part supply",
            "FIELD5": "FET-ODM-CO-040"
        },
        {
            "No":217,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-041",
            "SubLocation": "ODM Out Door Fl.2  เสาตรงมุมฝั่ง Dojo",
            "FIELD5": "FET-ODM-CO-041"
        },
        {
            "No":218,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-042",
            "SubLocation": "ODM Out Door Fl.2 ในตู้สายน้ำ FHC-54",
            "FIELD5": "FET-ODM-DC-042"
        },
        {
            "No":219,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-043",
            "SubLocation": "ODM Out Door Fl.2 พื้นที่วางงาน Part supply",
            "FIELD5": "FET-ODM-CO-043"
        },
        {
            "No":220,
            "Location": "ODM  Factory",
            "Code": "ODM-DC-044",
            "SubLocation": "ODM Out Door Fl.2 ในตู้สายน้ำ FHC-55",
            "FIELD5": "FET-ODM-DC-044"
        },
        {
            "No":221,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-045",
            "SubLocation": "ODM Out Door Fl.2 พื้นที่วางงาน Part supply",
            "FIELD5": "FET-ODM-CO-045"
        },
        {
            "No":222,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-046",
            "SubLocation": "ODM Out Door Fl.2  ฝั่ง Lift No.2",
            "FIELD5": "FET-ODM-CO-046"
        },
        {
            "No":223,
            "Location": "ODM  Factory",
            "Code": "ODM-CO-047",
            "SubLocation": "ODM Out Door Fl.2 ในห้อง",
            "FIELD5": "FET-ODM-CO-047"
        },
        {
            "No":224,
            "Location": "Canteen",
            "Code": "CT1-DC-001",
            "SubLocation": "ประตูทางออกหน้าเวที",
            "FIELD5": "FET-CT1-DC-001"
        },
        {
            "No":225,
            "Location": "Canteen",
            "Code": "CT1-DC-002",
            "SubLocation": "ประตูหน้าห้อง Storage 1",
            "FIELD5": "FET-CT1-DC-002"
        },
        {
            "No":226,
            "Location": "Canteen",
            "Code": "CT1-DC-003",
            "SubLocation": "ประตูหน้าห้องแช่อาหารสด",
            "FIELD5": "FET-CT1-DC-003"
        },
        {
            "No":227,
            "Location": "Canteen",
            "Code": "CT1-DC-004",
            "SubLocation": "หน้าห้องแก๊ส Canteen",
            "FIELD5": "FET-CT1-DC-004"
        },
        {
            "No":228,
            "Location": "Canteen",
            "Code": "CT1-DC-005",
            "SubLocation": "ประตูหลังร้านก๋วยเตี๋ยว",
            "FIELD5": "FET-CT1-DC-005"
        },
        {
            "No":229,
            "Location": "Canteen",
            "Code": "CT1-DC-006",
            "SubLocation": "ประตูทางเข้า Canteen ฝั่งห้องสมุด",
            "FIELD5": "FET-CT1-DC-006"
        },
        {
            "No":230,
            "Location": "Canteen",
            "Code": "CT1-DC-007",
            "SubLocation": "หลัง Canteen ข้างจุดทิ้งขยะ",
            "FIELD5": "FET-CT1-DC-007"
        },
        {
            "No":231,
            "Location": "Dome House1",
            "Code": "DH1-DC-001",
            "SubLocation": "Dome House ชั้น 2 ",
            "FIELD5": "FET-DH1-DC-001"
        },
        {
            "No":232,
            "Location": "Dome House1",
            "Code": "DH1-DC-002",
            "SubLocation": "Dome House ชั้น 1 (โซนติดกับ Spare part)",
            "FIELD5": "FET-DH1-DC-002"
        },
        {
            "No":233,
            "Location": "Dome House1",
            "Code": "DH1-DC-003",
            "SubLocation": "Dome House ชั้น 1 (โซนติดกับ Spare part)",
            "FIELD5": "FET-DH1-DC-003"
        },
        {
            "No":234,
            "Location": "Dome House1",
            "Code": "DH1-DC-004",
            "SubLocation": "Dome House ชั้น 1 (โซนติดกับ Spare part)",
            "FIELD5": "FET-DH1-DC-004"
        },
        {
            "No":235,
            "Location": "Dome House1",
            "Code": "DH1-CO-005",
            "SubLocation": "Dome House ชั้น 1 (Spare Part)",
            "FIELD5": "FET-DH1-CO-005"
        },
        {
            "No":236,
            "Location": "Dome House1",
            "Code": "DH1-DC-006",
            "SubLocation": "Dome House ชั้น 1 (Spare Part)",
            "FIELD5": "FET-DH1-DC-006"
        },
        {
            "No":237,
            "Location": "Dome House1",
            "Code": "DH1-DC-007",
            "SubLocation": "Dome House ชั้น 1 (Spare Part)",
            "FIELD5": "FET-DH1-DC-007"
        },
        {
            "No":238,
            "Location": "Dome House1",
            "Code": "DH1-DC-008",
            "SubLocation": "Dome House 2 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-DC-008"
        },
        {
            "No":239,
            "Location": "Dome House1",
            "Code": "DH1-DC-009",
            "SubLocation": "Dome House 2 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-DC-009"
        },
        {
            "No":240,
            "Location": "Dome House1",
            "Code": "DH1-DC-010",
            "SubLocation": "Dome House 2 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-DC-010"
        },
        {
            "No":241,
            "Location": "Dome House1",
            "Code": "DH1-CO-011",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-011"
        },
        {
            "No":242,
            "Location": "Dome House1",
            "Code": "DH1-CO-012",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-012"
        },
        {
            "No":243,
            "Location": "Dome House1",
            "Code": "DH1-CO-013",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-013"
        },
        {
            "No":244,
            "Location": "Dome House1",
            "Code": "DH1-CO-014",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-014"
        },
        {
            "No":245,
            "Location": "Dome House1",
            "Code": "DH1-CO-015",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-015"
        },
        {
            "No":246,
            "Location": "Dome House1",
            "Code": "DH1-CO-016",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-016"
        },
        {
            "No":247,
            "Location": "Dome House1",
            "Code": "DH1-CO-017",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-017"
        },
        {
            "No":248,
            "Location": "Dome House1",
            "Code": "DH1-CO-018",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-018"
        },
        {
            "No":249,
            "Location": "Dome House1",
            "Code": "DH1-CO-019",
            "SubLocation": "Dome House 3 (ฝั่งสนามฟุตบอล)",
            "FIELD5": "FET-DH1-CO-019"
        },
        {
            "No":250,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-001",
            "SubLocation": "Dome House Fac.3 ทางเข้าฝั่ง Fire Pump Rm.",
            "FIELD5": "FET-DH3-CO-001"
        },
        {
            "No":251,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-002",
            "SubLocation": "Dome House Fac.3 ฝั่งกำแพงด้านใน",
            "FIELD5": "FET-DH3-CO-002"
        },
        {
            "No":252,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-003",
            "SubLocation": "Dome House Fac.3 ฝั่งกำแพงด้านใน",
            "FIELD5": "FET-DH3-CO-003"
        },
        {
            "No":253,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-004",
            "SubLocation": "Dome House Fac.3 ฝั่งกำแพงด้านใน",
            "FIELD5": "FET-DH3-CO-004"
        },
        {
            "No":254,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-005",
            "SubLocation": "Dome House Fac.3 ฝั่งกำแพงด้านใน",
            "FIELD5": "FET-DH3-CO-005"
        },
        {
            "No":255,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-006",
            "SubLocation": "Dome House Fac.3 ข้าง FHC-03",
            "FIELD5": "FET-DH3-DC-006"
        },
        {
            "No":256,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-007",
            "SubLocation": "Dome House Fac.3 ข้าง เปลปฐมพยาบาล",
            "FIELD5": "FET-DH3-CO-007"
        },
        {
            "No":257,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-008",
            "SubLocation": "Dome House Fac.3 ข้างประตูกลาง",
            "FIELD5": "FET-DH3-DC-008"
        },
        {
            "No":258,
            "Location": "Dome House Fac.3",
            "Code": "DH3-CO-009",
            "SubLocation": "Dome House ตรงข้ามจุด Rework Fac.3",
            "FIELD5": "FET-DH3-CO-009"
        },
        {
            "No":259,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-010",
            "SubLocation": "Dome House ตรงข้ามจุด Rework Fac.3",
            "FIELD5": "FET-DH3-DC-010"
        },
        {
            "No":260,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-011",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-011"
        },
        {
            "No":261,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-012",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-012"
        },
        {
            "No":262,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-013",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-013"
        },
        {
            "No":263,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-014",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-014"
        },
        {
            "No":264,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-015",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-015"
        },
        {
            "No":265,
            "Location": "Dome House Fac.3",
            "Code": "DH3-DC-016",
            "SubLocation": "Storage part supply",
            "FIELD5": "FET-DH3-DC-016"
        },
        {
            "No":266,
            "Location": "Rework Fac.",
            "Code": "RW1-CO-001",
            "SubLocation": "เสาประตูทางเข้าฝั่งห้องไฟโรงงาน 3",
            "FIELD5": "FET-RW1-CO-001"
        },
        {
            "No":267,
            "Location": "Rework Fac.",
            "Code": "RW1-CO-002",
            "SubLocation": "เสาด้านในฝั่งกำแพงโรงงาน",
            "FIELD5": "FET-RW1-CO-002"
        },
        {
            "No":268,
            "Location": "Rework Fac.",
            "Code": "RW1-CO-003",
            "SubLocation": "เสาประตูทางเข้าฝั่งเครื่องเชื่อมงาน",
            "FIELD5": "FET-RW1-CO-003"
        },
        {
            "No":269,
            "Location": "Rework Fac.",
            "Code": "RW1-DC-004",
            "SubLocation": "ในตู้สายน้ำ FHC-61",
            "FIELD5": "FET-RW1-DC-004"
        },
        {
            "No":270,
            "Location": "QC Center",
            "Code": "QCC-CO-001",
            "SubLocation": "ในห้อง  Calorie  Room",
            "FIELD5": "FET-QCC-CO-001"
        },
        {
            "No":271,
            "Location": "QC Center",
            "Code": "QCC-CO-002",
            "SubLocation": "ในห้อง  Calorie  Room",
            "FIELD5": "FET-QCC-CO-002"
        },
        {
            "No":272,
            "Location": "QC Center",
            "Code": "QCC-CO-003",
            "SubLocation": "ในห้อง  Calorie  Room",
            "FIELD5": "FET-QCC-CO-003"
        },
        {
            "No":273,
            "Location": "QC Center",
            "Code": "QCC-CO-004",
            "SubLocation": "ในห้อง  Calorie  Room",
            "FIELD5": "FET-QCC-CO-004"
        },
        {
            "No":274,
            "Location": "QC Center",
            "Code": "QCC-DC-005",
            "SubLocation": "หน้าห้องเก็บเอกสาร ชั้น 2",
            "FIELD5": "FET-QCC-DC-005"
        },
        {
            "No":275,
            "Location": "QC Center",
            "Code": "QCC-DC-006",
            "SubLocation": "เสาทางเข้า Part supply",
            "FIELD5": "FET-QCC-DC-006"
        },
        {
            "No":276,
            "Location": "QC Center",
            "Code": "QCC-DC-007",
            "SubLocation": "Contaminate Rm.",
            "FIELD5": "FET-QCC-DC-007"
        },
        {
            "No":277,
            "Location": "QC Center",
            "Code": "QCC-DC-008",
            "SubLocation": "เสาประตูทางเข้าทางเข้าห้อง Sampling",
            "FIELD5": "FET-QCC-DC-008"
        },
        {
            "No":278,
            "Location": "QC Center",
            "Code": "QCC-DC-009",
            "SubLocation": "ห้องเก็บเอกสาร QC ชั้น 2",
            "FIELD5": "FET-QCC-DC-009"
        },
        {
            "No":279,
            "Location": "QC Center",
            "Code": "QCC-DC-010",
            "SubLocation": "เสาพื้นที่ Part supply ฝั่งห้อง Calibrate",
            "FIELD5": "FET-QCC-DC-010"
        },
        {
            "No":280,
            "Location": "QC Center",
            "Code": "QCC-DC-011",
            "SubLocation": "QC Sampling",
            "FIELD5": "FET-QCC-DC-011"
        },
        {
            "No":281,
            "Location": "QC Center",
            "Code": "QCC-DC-012",
            "SubLocation": "Calibrate Rm.",
            "FIELD5": "FET-QCC-DC-012"
        },
        {
            "No":282,
            "Location": "QC Center",
            "Code": "QCC-DC-013",
            "SubLocation": "พื้นที่ Overhual shop",
            "FIELD5": "FET-QCC-DC-013"
        },
        {
            "No":283,
            "Location": "QC Center",
            "Code": "QCC-DC-014",
            "SubLocation": "Part supply ใกล้ประตูทางออกฉุกเฉิน",
            "FIELD5": "FET-QCC-DC-014"
        },
        {
            "No":284,
            "Location": "QC Center",
            "Code": "QCC-CO-015",
            "SubLocation": "ในห้อง Durability เก่า",
            "FIELD5": "FET-QCC-CO-015"
        },
        {
            "No":285,
            "Location": "QC Center",
            "Code": "QCC-CO-016",
            "SubLocation": "ในห้อง Durability ใหม่",
            "FIELD5": "FET-QCC-CO-016"
        },
        {
            "No":286,
            "Location": "QC Center",
            "Code": "QCC-DC-017",
            "SubLocation": "Prototype Area",
            "FIELD5": "FET-QCC-DC-017"
        },
        {
            "No":287,
            "Location": "QC Center",
            "Code": "QCC-DC-018",
            "SubLocation": "Prototype Area",
            "FIELD5": "FET-QCC-DC-018"
        },
        {
            "No":288,
            "Location": "QC Center",
            "Code": "QCC-DC-019",
            "SubLocation": "Prototype Area (ห้องเก็บ Part)",
            "FIELD5": "FET-QCC-DC-019"
        },
        {
            "No":289,
            "Location": "QC Center",
            "Code": "QCC-DC-020",
            "SubLocation": "Part supply ชั้น 2 No.1",
            "FIELD5": "FET-QCC-DC-020"
        },
        {
            "No":290,
            "Location": "QC Center",
            "Code": "QCC-DC-021",
            "SubLocation": "Part supply ชั้น 2 No.2",
            "FIELD5": "FET-QCC-DC-021"
        },
        {
            "No":291,
            "Location": "QC Center",
            "Code": "QCC-DC-022",
            "SubLocation": "Part supply ชั้น 2 No.3",
            "FIELD5": "FET-QCC-DC-022"
        },
        {
            "No":292,
            "Location": "QC Center",
            "Code": "QCC-DC-023",
            "SubLocation": "Part supply ชั้น 2 No.4",
            "FIELD5": "FET-QCC-DC-023"
        },
        {
            "No":293,
            "Location": "QC Center",
            "Code": "QCC-DC-024",
            "SubLocation": "Part supply ชั้น 2 No.5",
            "FIELD5": "FET-QCC-DC-024"
        },
        {
            "No":294,
            "Location": "QC Center",
            "Code": "QCC-DC-025",
            "SubLocation": "Part supply ชั้น 1 เสากลาง",
            "FIELD5": "FET-QCC-DC-025"
        },
        {
            "No":295,
            "Location": "ป้อม รปภ.1",
            "Code": "GE1-DC-001",
            "SubLocation": "ป้อม รปภ.1",
            "FIELD5": "FET-GE1-DC-001"
        },
        {
            "No":296,
            "Location": "Wast Water Treatment",
            "Code": "GE1-DC-002",
            "SubLocation": "Wast Water Treatment",
            "FIELD5": "FET-GE1-DC-002"
        },
        {
            "No":297,
            "Location": "Low Air",
            "Code": "GE1-DC-003",
            "SubLocation": "Low Air",
            "FIELD5": "FET-GE1-DC-003"
        },
        {
            "No":298,
            "Location": "Low Air",
            "Code": "GE1-DC-004",
            "SubLocation": "Low Air",
            "FIELD5": "FET-GE1-DC-004"
        },
        {
            "No":299,
            "Location": "ด้านหน้า Gas Yard",
            "Code": "GE1-DC-005",
            "SubLocation": "ด้านหน้า Gas Yard",
            "FIELD5": "FET-GE1-DC-005"
        },
        {
            "No":300,
            "Location": "ด้านข้าง Gas Yard",
            "Code": "GE1-DC-006",
            "SubLocation": "ด้านข้าง Gas Yard",
            "FIELD5": "FET-GE1-DC-006"
        },
        {
            "No":301,
            "Location": "ด้านหลัง Gas Yard",
            "Code": "GE1-DC-007",
            "SubLocation": "ด้านหลัง Gas Yard",
            "FIELD5": "FET-GE1-DC-007"
        },
        {
            "No":302,
            "Location": "ด้านหน้า NG Gas Yard",
            "Code": "GE1-DC-008",
            "SubLocation": "ด้านหน้า NG Gas Yard",
            "FIELD5": "FET-GE1-DC-008"
        },
        {
            "No":303,
            "Location": "ด้านหลัง NG Gas Yard",
            "Code": "GE1-DC-009",
            "SubLocation": "ด้านหลัง NG Gas Yard",
            "FIELD5": "FET-GE1-DC-009"
        },
        {
            "No":304,
            "Location": "ห้องคนขับรถ",
            "Code": "GE1-DC-010",
            "SubLocation": "ห้องคนขับรถ",
            "FIELD5": "FET-GE1-DC-010"
        },
        {
            "No":305,
            "Location": "ป้อม รปภ.2",
            "Code": "GE1-DC-011",
            "SubLocation": "ป้อม รปภ.2",
            "FIELD5": "FET-GE1-DC-011"
        },
        {
            "No":306,
            "Location": "ป้อม รปภ.3",
            "Code": "GE1-DC-012",
            "SubLocation": "ป้อม รปภ.3",
            "FIELD5": "FET-GE1-DC-012"
        },
        {
            "No":307,
            "Location": "ห้องไฟ  โรงจอดรถใหม่",
            "Code": "GE1-DC-013",
            "SubLocation": "ห้องไฟ  โรงจอดรถใหม่",
            "FIELD5": "FET-GE1-DC-013"
        },
        {
            "No":308,
            "Location": "Scap Area",
            "Code": "SC1-DC-001",
            "SubLocation": "เสาโรงแยกขยะ Scap Area",
            "FIELD5": "FET-SC1-DC-001"
        },
        {
            "No":309,
            "Location": "Scap Area",
            "Code": "SC1-DC-002",
            "SubLocation": "เสาโรงแยกขยะ Scap Area",
            "FIELD5": "FET-SC1-DC-002"
        },
        {
            "No":310,
            "Location": "Scap Area",
            "Code": "SC1-DC-003",
            "SubLocation": "เพิ่ม เสาโรงแยกขยะ Scap Area ",
            "FIELD5": "FET-SC1-DC-003"
        },
        {
            "No":311,
            "Location": "Scap Area",
            "Code": "SC1-DC-004",
            "SubLocation": "เสาโรงแยกขยะ Scap Area ",
            "FIELD5": "FET-SC1-DC-004"
        },
        {
            "No":312,
            "Location": "Scap Area",
            "Code": "SC1-DC-005",
            "SubLocation": "เพิ่ม เสาโรงแยกขยะ Scap Area ",
            "FIELD5": "FET-SC1-DC-005"
        },
        {
            "No":313,
            "Location": "Scap Area",
            "Code": "SC1-DC-006",
            "SubLocation": "เสาโรงแยกขยะ Scap Area",
            "FIELD5": "FET-SC1-DC-006"
        },
        {
            "No":314,
            "Location": "Scap Area",
            "Code": "SC1-DC-007",
            "SubLocation": "บริเวณ Scap ข้าง Technical Center",
            "FIELD5": "FET-SC1-DC-007"
        },
        {
            "No":315,
            "Location": "Scap Area",
            "Code": "SC1-DC-008",
            "SubLocation": "บริเวณ Scap ข้าง Technical Center",
            "FIELD5": "FET-SC1-DC-008"
        },
        {
            "No":316,
            "Location": "Scap Area",
            "Code": "SC1-DC-009",
            "SubLocation": "บริเวณ New Scap Area",
            "FIELD5": "FET-SC1-DC-009"
        },
        {
            "No":317,
            "Location": "Scap Area",
            "Code": "SC1-DC-010",
            "SubLocation": "บริเวณ New Scap Area",
            "FIELD5": "FET-SC1-DC-010"
        },
        {
            "No":318,
            "Location": "Scap Area",
            "Code": "SC1-DC-011",
            "SubLocation": "บริเวณ New Scap Area",
            "FIELD5": "FET-SC1-DC-011"
        },
        {
            "No":319,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-001",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-001"
        },
        {
            "No":320,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-002",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-002"
        },
        {
            "No":321,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-003",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-003"
        },
        {
            "No":322,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-004",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-004"
        },
        {
            "No":323,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-005",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-005"
        },
        {
            "No":324,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-006",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-006"
        },
        {
            "No":325,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-007",
            "SubLocation": "Chemical Storege",
            "FIELD5": "FET-CH1-DC-007"
        },
        {
            "No":326,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-008",
            "SubLocation": "Chemical Storage",
            "FIELD5": "FET-CH1-DC-008"
        },
        {
            "No":327,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-009",
            "SubLocation": "Chemical Storage",
            "FIELD5": "FET-CH1-DC-009"
        },
        {
            "No":328,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-010",
            "SubLocation": "Chemical Storage (50 Lbs)",
            "FIELD5": "FET-CH1-DC-010"
        },
        {
            "No":329,
            "Location": "Chemical Storege",
            "Code": "CH1-DC-011",
            "SubLocation": "Chemical Storage (50 Lbs)",
            "FIELD5": "FET-CH1-DC-011"
        },
        {
            "No":330,
            "Location": "Training  Center",
            "Code": "TRC-DC-001",
            "SubLocation": "ประตูทางเข้า  Dojo",
            "FIELD5": "FET-TRC-DC-001"
        },
        {
            "No":331,
            "Location": "Training  Center",
            "Code": "TRC-DC-002",
            "SubLocation": "เสาประตูทางเข้า Technical Center (Kaizen)",
            "FIELD5": "FET-TRC-DC-002"
        },
        {
            "No":332,
            "Location": "Training  Center",
            "Code": "TRC-DC-003",
            "SubLocation": "ในห้องพ่นสี Kaizen",
            "FIELD5": "FET-TRC-DC-003"
        },
        {
            "No":333,
            "Location": "Training  Center",
            "Code": "TRC-DC-004",
            "SubLocation": "Training Center ชั้น 1",
            "FIELD5": "FET-TRC-DC-004"
        },
        {
            "No":334,
            "Location": "Training  Center",
            "Code": "TRC-DC-005",
            "SubLocation": "Training Center ชั้น 1",
            "FIELD5": "FET-TRC-DC-005"
        },
        {
            "No":335,
            "Location": "Training  Center",
            "Code": "TRC-DC-006",
            "SubLocation": "Training Center ชั้น 1",
            "FIELD5": "FET-TRC-DC-006"
        },
        {
            "No":336,
            "Location": "Training  Center",
            "Code": "TRC-DC-007",
            "SubLocation": "Training Center ชั้น 2",
            "FIELD5": "FET-TRC-DC-007"
        },
        {
            "No":337,
            "Location": "Training  Center",
            "Code": "TRC-CO-008",
            "SubLocation": "Training Center ชั้น 2",
            "FIELD5": "FET-TRC-CO-008"
        },
        {
            "No":338,
            "Location": "Training  Center",
            "Code": "TRC-CO-009",
            "SubLocation": "Training Center ชั้น 1 (Design)",
            "FIELD5": "FET-TRC-CO-009"
        },
        {
            "No":339,
            "Location": "รถแก๊สเชื่อม Improvement",
            "Code": "CAG-DC-001",
            "SubLocation": "รถแก๊สเชื่อม Improvement",
            "FIELD5": "FET-CAG-DC-001"
        },
        {
            "No":340,
            "Location": "รถเข็นอุปกรณ์เหตุฉุกเฉินสารเคมีรั่วไหล",
            "Code": "CAG-DC-002",
            "SubLocation": "รถเข็นอุปกรณ์เหตุฉุกเฉินสารเคมีรั่วไหล",
            "FIELD5": "FET-CAG-DC-002"
        },
        {
            "No":341,
            "Location": "พื้นที่ชาร์จ Battery รถ Forklift 1",
            "Code": "CAG-CO-003",
            "SubLocation": "พื้นที่ชาร์จ Battery รถ Forklift 1",
            "FIELD5": "FET-CAG-CO-003"
        },
        {
            "No":342,
            "Location": "พื้นที่ชาร์จ Battery รถ Forklift 2",
            "Code": "CAG-CO-004",
            "SubLocation": "พื้นที่ชาร์จ Battery รถ Forklift 2",
            "FIELD5": "FET-CAG-CO-004"
        },
        {
            "No":343,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-006",
            "SubLocation": "รถโฟล์คลิฟท์   No.6 (W/H)",
            "FIELD5": "FET-FLD-DC-006"
        },
        {
            "No":344,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-007",
            "SubLocation": "รถโฟล์คลิฟท์   No.7 (W/H)",
            "FIELD5": "FET-FLD-DC-007"
        },
        {
            "No":345,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-008",
            "SubLocation": "รถโฟล์คลิฟท์   No.8 (Part Supply)",
            "FIELD5": "FET-FLD-DC-008"
        },
        {
            "No":346,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-009",
            "SubLocation": "รถโฟล์คลิฟท์   No.9 (Part Supply)",
            "FIELD5": "FET-FLD-DC-009"
        },
        {
            "No":347,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-010",
            "SubLocation": "รถโฟล์คลิฟท์   No.10 (Warehouse)",
            "FIELD5": "FET-FLD-DC-010"
        },
        {
            "No":348,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-011",
            "SubLocation": "รถโฟล์คลิฟท์   No.11 (Packing Center)",
            "FIELD5": "FET-FLD-DC-011"
        },
        {
            "No":349,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-012",
            "SubLocation": "รถโฟล์คลิฟท์   No.12 (Warehouse)",
            "FIELD5": "FET-FLD-DC-012"
        },
        {
            "No":350,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-013",
            "SubLocation": "รถโฟล์คลิฟท์   No.13 (Part Supply)",
            "FIELD5": "FET-FLD-DC-013"
        },
        {
            "No":351,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-014",
            "SubLocation": "รถโฟล์คลิฟท์   No.14 (Part Supply)",
            "FIELD5": "FET-FLD-DC-014"
        },
        {
            "No":352,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-015",
            "SubLocation": "รถโฟล์คลิฟท์   No.15 (Part Supply)",
            "FIELD5": "FET-FLD-DC-015"
        },
        {
            "No":353,
            "Location": "รถโฟล์คลิฟท์ ",
            "Code": "FLD-DC-016",
            "SubLocation": "รถโฟล์คลิฟท์ No.16 (Warehouse)",
            "FIELD5": "FET-FLD-DC-016"
        },
        {
            "No":354,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-002",
            "SubLocation": " รถลากไฟฟ้า NO.2",
            "FIELD5": "FET-TTD-DC-002"
        },
        {
            "No":355,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-003",
            "SubLocation": " รถลากไฟฟ้า NO.3 (รถกอล์ฟ)",
            "FIELD5": "FET-TTD-DC-003"
        },
        {
            "No":356,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-004",
            "SubLocation": " รถลากไฟฟ้า NO.4 (Part Supply)",
            "FIELD5": "FET-TTD-DC-004"
        },
        {
            "No":357,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-005",
            "SubLocation": " รถลากไฟฟ้า NO.5 (Part Supply)",
            "FIELD5": "FET-TTD-DC-005"
        },
        {
            "No":358,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-006",
            "SubLocation": " รถลากไฟฟ้า NO.6 (Part Supply)",
            "FIELD5": "FET-TTD-DC-006"
        },
        {
            "No":359,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-007",
            "SubLocation": " รถลากไฟฟ้า NO.7 (Packing Center)",
            "FIELD5": "FET-TTD-DC-007"
        },
        {
            "No":360,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-008",
            "SubLocation": " รถลากไฟฟ้า NO.8 (Packing Center)",
            "FIELD5": "FET-TTD-DC-008"
        },
        {
            "No":361,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-009",
            "SubLocation": " รถลากไฟฟ้า NO.9 (Part Supply)",
            "FIELD5": "FET-TTD-DC-009"
        },
        {
            "No":362,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-010",
            "SubLocation": "รถลากไฟฟ้า NO.10 (Packing Center)",
            "FIELD5": "FET-TTD-DC-010"
        },
        {
            "No":363,
            "Location": " รถลากไฟฟ้า ",
            "Code": "TTD-DC-011",
            "SubLocation": "รถลากไฟฟ้า NO.11 (Packing Center)",
            "FIELD5": "FET-TTD-DC-011"
        }
    ])
    useEffect(() => {
        const res = ServiceGetListQrCode();
        console.log(res)
    }, [])
    return (
        <div className='grid grid-cols-4 gap-2 p-3'>
            {
                qrcode.map((el, index) => {
                    return el.No <= 39 && <>
                        <div className='box' item xs={2}>
                            <div className='card flex rounded-md flex-col justify-center items-center gap-2 py-3'>
                                <QRCodeSVG value={el.FIELD5} />
                                <span className='text-[14px]'>{el.FIELD5}</span>
                                <span className='text-[10px]'>{el.SubLocation}</span>
                            </div>
                        </div>
                        {
                            (index + 1) % 15 == 0 && <div class="pagebreak"> </div>
                        }
                    </>
                })
            }
        </div>
    )
}

export default QrCode