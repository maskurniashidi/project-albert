import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../../utils/auth";
import { message, Skeleton, Tooltip, Select, Space, Table, Tag, Input } from "antd";
import { BASE_API_URL } from "../../helper/url";
//dependency component
import { Link } from "react-router-dom";
//my own component
import styles from "./Dashboard.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { CarouselDashboard1, CarouselDashboard2 } from "../../assets/assets";
//framework component
import { Carousel } from "react-bootstrap";
import { Typography, Breadcrumbs } from "@mui/material";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdSensors } from "react-icons/md";

const { Option } = Select;

function Dashboard() {
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

  // newDataTemp = [...newDataTemp, { key: item.id, name: item.name, medicNumber: item.medicalRecordNumber, gender: item.gender, phoneNumber: item.phoneNumber, tags: ["Pasien"] }];

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
            <h2 className={styles.pageTitle}>Dashboard</h2>
            <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
              <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                Home
              </Link>
              <Typography className={styles.breadUnactive}>Dashbord</Typography>
            </Breadcrumbs>
          </div>
          <div className={styles.main}>
            {/* <Carousel className={styles.carouselWrapper}>
              <Carousel.Item interval={2000} className={styles.carouselItem}>
                <img className={styles.imageCarousel} src="https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="First slide" />
              </Carousel.Item>
              <Carousel.Item interval={1000} className={styles.carouselItem}>
                <img className={styles.imageCarousel} src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80" alt="Second slide" />
              </Carousel.Item>
            </Carousel> */}
            {/* Kriteria Keuangan */}
            <div className={styles.dashboardKeuanganContainer}>
              <div className={styles.dashboardLeft}>
                <h3 className={styles.dashboardKeuanganTitle}>FLOW SENSOR</h3>
                <p className={styles.dashboardKeuanganDesc}>Data flow sensor</p>
                <div className={styles.divider}></div>
                <div className={styles.sensorBox}>
                  <h2 className={styles.sensorValue}>74</h2>
                  <MdSensors className={styles.sensorIcon} />
                </div>

                {/* <div className={styles.testBox}>
                  <div className={styles.testLeft}>
                    <h4 className={styles.testText}>MBTF</h4>
                    <h4 className={styles.testText}>Time</h4>
                    <h4 className={styles.testText}>Reliability</h4>
                  </div>
                  <div className={styles.testRight}>
                    <h4 className={styles.testText}>: 20</h4>
                    <div className={styles.testTime}>
                      <h4 className={styles.testText}>: </h4>
                      <Input className={styles.testTimeInput} placeholder="20" />
                      <button className={styles.btnTestTime}>Test</button>
                    </div>
                    <h4 className={styles.testText}>: 42</h4>
                  </div>
                </div> */}

                <div className={styles.testBox}>
                  <h4 className={styles.testText}>Input Durasi Uji : </h4>
                  <Input className={styles.testTimeInput} placeholder="20" />
                  <button className={styles.btnTestTime}>Test</button>
                </div>

                <div className={styles.testBox2}>
                  <h4 className={styles.testText}>MTBF : 12</h4>
                  <h4 className={styles.testText}>Reliability : 23</h4>
                </div>

                {/* <h3 className={styles.dashboardTableTitle}>History</h3> */}

                <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                  <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
                </div>
                <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                  <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
                </div>
                {/* <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                  <Table columns={columns} dataSource={dataPatient} />
                </div> */}
              </div>
              <div className={styles.dashboardRight}>
                <h3 className={styles.dashboardKeuanganTitle}>VIBRATION SENSOR</h3>
                <p className={styles.dashboardKeuanganDesc}>Data vibration Sensor</p>
                <div className={styles.divider}></div>
                <div className={styles.sensorBox}>
                  <h2 className={styles.sensorValue}>71</h2>
                  <MdSensors className={styles.sensorIcon} />
                </div>

                {/* <div className={styles.testBox}>
                  <div className={styles.testLeft}>
                    <h4 className={styles.testText}>MBTF</h4>
                    <h4 className={styles.testText}>Time</h4>
                    <h4 className={styles.testText}>Reliability</h4>
                  </div>
                  <div className={styles.testRight}>
                    <h4 className={styles.testText}>: 20</h4>
                    <div className={styles.testTime}>
                      <h4 className={styles.testText}>: </h4>
                      <Input className={styles.testTimeInput} placeholder="20" />
                      <button className={styles.btnTestTime}>Test</button>
                    </div>
                    <h4 className={styles.testText}>: 42</h4>
                  </div>
                </div>

                <h3 className={styles.dashboardTableTitle}>History</h3> */}

                <div className={styles.testBox}>
                  <h4 className={styles.testText}>Input Durasi Uji : </h4>
                  <Input className={styles.testTimeInput} placeholder="20" />
                  <button className={styles.btnTestTime}>Test</button>
                </div>


                <div className={styles.testBox2}>
                  <h4 className={styles.testText}>MTBF : 12</h4>
                  <h4 className={styles.testText}>Reliability : 23</h4>
                </div>

                <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                  <Table columns={columnsVibration} dataSource={dataVibration} pagination={false} />
                </div>
                <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                  <Table columns={columnsVibration} dataSource={dataVibration} pagination={false} />
                </div>
                {/* <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                  <Table columns={columns} dataSource={dataPatient} />
                </div> */}

              </div>
            </div>

            {/* kriteria berdasarkan kota */}
            <div className={styles.dashboardCityContainer}></div>

            {/* <div className={styles.tableDashboardContainer}>
              <div className={styles.tableDashboardCard}>
                <h3 className={styles.dashboardTableTitle}>Pasien Terbaru</h3>
                <Table columns={columns} dataSource={dataPatient} />
              </div>
            </div> */}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
