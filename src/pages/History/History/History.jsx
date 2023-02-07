import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../../../utils/auth";
import { message, Skeleton, Tooltip, Select, Space, Table, Tag, Input, Pagination } from "antd";
import { BASE_API_URL } from "../../../helper/url";
//dependency component
import { Link } from "react-router-dom";
//my own component
import styles from "./History.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { CarouselDashboard1, CarouselDashboard2 } from "../../../assets/assets";
//framework component
import { Carousel } from "react-bootstrap";
import { Typography, Breadcrumbs } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdSensors } from "react-icons/md";



const { Option } = Select;

function History() {
    //state
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [dataFlow, setDataFlow] = useState([{
        key: 1, duration: 33, time: "01:00:00", status: "Error"
    }, {
        key: 2, duration: 6, time: "02:43:12", status: "Fixed"
    }, {
        key: 3, duration: 2, time: "11:42:14", status: "Start"
    }, {
        key: 4, duration: 1, time: "02:12:00", status: "End"
    },]);

    const [dataVibration, setDataVibration] = useState([{
        key: 1, duration: 3, time: "10:00:00", status: "Error"
    }, {
        key: 2, duration: 4, time: "13:23:12", status: "Fixed"
    }, {
        key: 3, duration: 1, time: "12:32:12", status: "Start"
    }, {
        key: 4, duration: 6, time: "09:12:12", status: "End"
    },]);
    // table
    const columnsFlow = [
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: (text) => <Link>{text}</Link>,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    const columnsVibration = [
        {
            title: "Duration",
            dataIndex: "duration",
            key: "duration",
            render: (text) => <Link>{text}</Link>,
        },
        {
            title: "Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
    ];

    return (
        <DashboardLayout>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.topWrapper}>
                        <h2 className={styles.pageTitle}>History</h2>
                        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                                Dashboard
                            </Link>
                            <Typography className={styles.breadUnactive}>History</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={styles.main}>
                        {/* Kriteria Keuangan */}
                        <div className={styles.dashboardKeuanganContainer}>
                            <div className={styles.dashboardLeft}>
                                <h3 className={styles.dashboardKeuanganTitle}>HISTORY FLOW SENSOR</h3>
                                <p className={styles.dashboardKeuanganDesc}>Data history flow sensor yang tercatat</p>
                                <div className={styles.divider}></div>

                                <div className={styles.sensorBox}>
                                    <h2 className={styles.sensorValue}>75</h2>
                                    <MdSensors className={styles.sensorIcon} />
                                </div>

                                <div className={styles.testBox2}>
                                    <h4 className={styles.testText}>MTBF : 12</h4>
                                    <h4 className={styles.testText}>Reliability : 23</h4>
                                </div>

                                <Link to={"/history/add-record"} className={styles.addRecord}>Tambah Record</Link>

                                <div className={styles.tableDashboardCard}>
                                    <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                                    <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
                                </div>
                                <div className={styles.tableDashboardCard}>
                                    <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                                    <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
                                </div>
                                <div className={styles.paginationBox}>
                                    <Pagination defaultCurrent={1} total={20} />
                                </div>
                            </div>
                            <div className={styles.dashboardRight}>
                                <h3 className={styles.dashboardKeuanganTitle}>HISTORY VIBRATION SENSOR</h3>
                                <p className={styles.dashboardKeuanganDesc}>Data history vibration Sensor</p>
                                <div className={styles.divider}></div>

                                <div className={styles.sensorBox}>
                                    <h2 className={styles.sensorValue}>71</h2>
                                    <MdSensors className={styles.sensorIcon} />
                                </div>

                                <div className={styles.testBox2}>
                                    <h4 className={styles.testText}>MTBF : 12</h4>
                                    <h4 className={styles.testText}>Reliability : 23</h4>
                                </div>

                                <Link to={"/history/add-record"} className={styles.addRecord}>Tambah Record</Link>

                                <div className={styles.tableDashboardCard}>
                                    <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                                    <Table columns={columnsVibration} dataSource={dataVibration} pagination={false} />
                                </div>
                                <div className={styles.tableDashboardCard}>
                                    <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                                    <Table columns={columnsVibration} dataSource={dataVibration} pagination={false} />
                                </div>
                                <div className={styles.paginationBox}>
                                    <Pagination defaultCurrent={1} total={20} />
                                </div>
                            </div>

                        </div>

                        {/* kriteria berdasarkan kota */}
                        <div className={styles.dashboardCityContainer}></div>

                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default History;
