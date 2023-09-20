import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../../utils/auth";
import { message, Skeleton, Tooltip, Select, Space, Table, Tag, Input, Modal } from "antd";
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
import ApexChart from "./ApexChart"
import Banner from "../../assets/banner.png"
const { Option } = Select;

function Dashboard() {
  //state
  const [allDataFlow, setAllDataFlow] = useState();
  const [allDataVibration, setAllDataVibration] = useState();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [idFlow, setIdFlow] = useState()
  const [idVib, setIdVib] = useState()
  const [limit, setLimit] = useState()
  const [limit2, setLimit2] = useState()
  const [flowVal, setFlowVal] = useState()
  const [vibVal, setVibVal] = useState()
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const history = useHistory();
  const [dataFlow, setDataFlow] = useState([{
    key: 1, duration: 33, timeStart: "01:00:00", timeEnd: "09:12:12", status: "Error"
  }, {
    key: 2, duration: 6, timeStart: "02:43:12", timeEnd: "09:12:12", status: "Fixed"
  }, {
    key: 3, duration: 2, timeStart: "11:42:14", timeEnd: "09:12:12", status: "Start"
  }, {
    key: 4, duration: 1, timeStart: "02:12:00", timeEnd: "09:12:12", status: "End"
  },]);

  const [dataVibration, setDataVibration] = useState([{
    key: 1, duration: 3, timeStart: "01:00:00", timeEnd: "10:00:00", status: "Error"
  }, {
    key: 2, duration: 4, timeStart: "01:00:00", timeEnd: "13:23:12", status: "Fixed"
  }, {
    key: 3, duration: 1, timeStart: "01:00:00", timeEnd: "12:32:12", status: "Start"
  }, {
    key: 4, duration: 6, timeStart: "01:00:00", timeEnd: "09:12:12", status: "End"
  },]);


  const [dataY, setDataY] = useState([0, -23, -12, 2, 8, 3, 2, -4, 6, 8, -30, 2, 4, -6, 1, 10, 0, 2, 10, 2, 10, 3, 2, 2])
  const [dataX, setDataX] = useState(["00.00", "01.00", "02.00", "03.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00", "12.00", "13.00", "14.00", "15.00", "16.00", "17.00", "18.00", "19.00", "20.00", "21.00", "22.00", "23.00", "24.00"])
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
      title: "Time Start",
      dataIndex: "timeStart",
      key: "timeStart",
    },
    {
      title: "Time End",
      dataIndex: "timeEnd",
      key: "timeEnd",
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
      title: "Time Start",
      dataIndex: "timeStart",
      key: "timeStart",
    },
    {
      title: "Time End",
      dataIndex: "timeEnd",
      key: "timeEnd",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];


  useEffect(() => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/all',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    };



    axios(config)
      .then(function (response) {
        console.log("flow id", response.data[0]);
        setAllDataFlow(response.data[0])
        setFlowVal(response.data[0].value)
        setLimit(response.data[0])
        setIdFlow(response.data[0].id)
        setLoading1(false)

      })
      .catch(function (error) {
        if (error.response.status === 401) {
          logout();
        }
        console.log(error.response.status)
        console.log(error);
      });
  }, []);



  useEffect(() => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/all',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("vib id", response.data[0]);
        setAllDataVibration(response.data[0]);
        setVibVal(response.data[0].value)
        setIdVib(response.data[0].id)
        setLimit2(response.data[0])
        setLoading2(false)
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          logout();
        }
        console.log(error);
      });

  }, []);

  const EditLimitFlow = () => {
    var dataBody = JSON.stringify({
      "HH": limit.HH,
      "H": limit.H,
      "SP": limit.SP,
      "L": limit.L,
      "LL": limit.LL,
    });

    var config = {
      method: 'patch',
      url: `https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${idFlow}/update-limit-value`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
      },
      data: dataBody
    };

    axios(config)
      .then(function (response) {
        message.success("Limit berhasi di edit")
        setVisible(false)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        message.error("Limit gagal di edit")
        setVisible(false)
      });
  }


  const EditLimitVib = () => {
    var dataBody = JSON.stringify({
      "HH": limit2.HH,
      "H": limit2.H,
      "SP": limit2.SP,
      "L": limit2.L,
      "LL": limit2.LL,
    });

    var config = {
      method: 'patch',
      url: `https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${idVib}/update-limit-value`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
      },
      data: dataBody
    };

    axios(config)
      .then(function (response) {
        message.success("Limit berhasi di edit")
        setVisible2(false)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(function (error) {
        message.error("Limit gagal di edit")
        setVisible2(false)
      });


  }

  const handleCancelFlow = () => {
    setVisible(false)
  }

  const onchangeLimitFlow = (e) => {
    setLimit({
      ...limit,
      [e.target.name]: e.target.value
    })
  }


  const handleCancelVib = () => {
    setVisible2(false)
  }

  const onchangeLimitVib = (e) => {
    setLimit2({
      ...limit2,
      [e.target.name]: e.target.value
    })
  }



  if (loading1 || loading2) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout>

      {/* Modal */}
      <Modal
        title="Edit Limit"
        visible={visible}
        onOk={EditLimitFlow}
        onCancel={handleCancelFlow}
        okButtonProps={{ className: `${styles.btnOkModal}` }}
        okText="Edit"
        cancelText="Batal"
      >
        <label style={{ marginBottom: 8 }} htmlFor="">HH</label>
        <Input style={{ marginBottom: 8 }} name="HH" type="number" value={limit.HH} onChange={onchangeLimitFlow} />
        <label style={{ marginBottom: 8 }} htmlFor="">H</label>
        <Input style={{ marginBottom: 8 }} name="H" type="number" value={limit.H} onChange={onchangeLimitFlow} />
        <label style={{ marginBottom: 8 }} htmlFor="">SP</label>
        <Input style={{ marginBottom: 8 }} name="SP" type="number" value={limit.SP} onChange={onchangeLimitFlow} />
        <label style={{ marginBottom: 8 }} htmlFor="">L</label>
        <Input style={{ marginBottom: 8 }} name="L" type="number" value={limit.L} onChange={onchangeLimitFlow} />
        <label style={{ marginBottom: 8 }} htmlFor="">LL</label>
        <Input style={{ marginBottom: 8 }} name="LL" type="number" value={limit.LL} onChange={onchangeLimitFlow} />
      </Modal>

      <Modal
        title="Edit Limit"
        visible={visible2}
        onOk={EditLimitVib}
        onCancel={handleCancelVib}
        okButtonProps={{ className: `${styles.btnOkModal}` }}
        okText="Edit"
        cancelText="Batal"
      >
        <label style={{ marginBottom: 8 }} htmlFor="">HH</label>
        <Input style={{ marginBottom: 8 }} name="HH" type="number" value={limit2.HH} onChange={onchangeLimitVib} />
        <label style={{ marginBottom: 8 }} htmlFor="">H</label>
        <Input style={{ marginBottom: 8 }} name="H" type="number" value={limit2.H} onChange={onchangeLimitVib} />
        <label style={{ marginBottom: 8 }} htmlFor="">SP</label>
        <Input style={{ marginBottom: 8 }} name="SP" type="number" value={limit2.SP} onChange={onchangeLimitVib} />
        <label style={{ marginBottom: 8 }} htmlFor="">L</label>
        <Input style={{ marginBottom: 8 }} name="L" type="number" value={limit2.L} onChange={onchangeLimitVib} />
        <label style={{ marginBottom: 8 }} htmlFor="">LL</label>
        <Input style={{ marginBottom: 8 }} name="LL" type="number" value={limit2.LL} onChange={onchangeLimitVib} />
      </Modal>

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
        <img className={styles.banner} src={Banner} alt="" />
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
              <div>
                {
                  allDataFlow.flowName == null ?
                    <>
                        <h3 className={styles.dashboardKeuanganTitle}>
                          SENSOR
                        </h3>
                        <p className={styles.dashboardKeuanganDesc}>Data sensor</p>
                    </>
                    :
                    <>
                        <h3 className={styles.dashboardKeuanganTitle}>
                          {`${allDataFlow.flowName.toUpperCase()}`} SENSOR
                        </h3>
                        <p className={styles.dashboardKeuanganDesc}>Data {`${allDataFlow.flowName.toLowerCase()}`} sensor</p>
                    </>
                }
              </div>
              <div className={styles.divider}></div>
              <div className={styles.sensorBox}>
                <h2 className={styles.sensorValue}>{flowVal}</h2>
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
                <h4 className={styles.testText}>HH : {limit.HH}</h4>
                <h4 className={styles.testText}>H : {limit.H}</h4>
                <h4 className={styles.testText}>SP : {limit.SP}</h4>
                <h4 className={styles.testText}>L : {limit.L}</h4>
                <h4 className={styles.testText}>LL : {limit.LL}</h4>
                <button onClick={() => setVisible(true)} style={{ backgroundColor: "red", width: 100, padding: "4px 2px", color: "white", borderRadius: 4 }}>Edit Limit</button>
              </div>

              {/* <h3 className={styles.dashboardTableTitle}>History</h3> */}

              <div className={styles.tableDashboardCard}>
                <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                <ApexChart data={dataY} categories={dataX} className={styles.dashboardChart} />
                <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
              </div>
              <div className={styles.tableDashboardCard}>
                <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                <ApexChart data={dataY} categories={dataX} className={styles.dashboardChart} />
                <Table columns={columnsFlow} dataSource={dataFlow} pagination={false} />
              </div>
              {/* <div className={styles.tableDashboardCard}>
                  <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                  <Table columns={columns} dataSource={dataPatient} />
                </div> */}
            </div>
            <div className={styles.dashboardRight}>
              <div>
                {
                  allDataVibration.vibrationName == null ?
                      <>
                          <h3 className={styles.dashboardKeuanganTitle}>
                            SENSOR
                          </h3>
                          <p className={styles.dashboardKeuanganDesc}>Data sensor</p>
                      </>
                      :
                      <>
                          <h3 className={styles.dashboardKeuanganTitle}>
                            {`${allDataVibration.vibrationName.toUpperCase()}`} SENSOR
                          </h3>
                          <p className={styles.dashboardKeuanganDesc}>Data {`${allDataVibration.vibrationName.toLowerCase()}`} sensor</p>
                      </>
                }
              </div>
              <div className={styles.divider}></div>
              <div className={styles.sensorBox}>
                <h2 className={styles.sensorValue}>{vibVal}</h2>
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
                <h4 className={styles.testText}>HH : {limit2.HH}</h4>
                <h4 className={styles.testText}>H : {limit2.H}</h4>
                <h4 className={styles.testText}>SP : {limit2.SP}</h4>
                <h4 className={styles.testText}>L : {limit2.L}</h4>
                <h4 className={styles.testText}>LL : {limit2.LL}</h4>
                <button onClick={() => setVisible2(true)} style={{ backgroundColor: "red", width: 100, padding: "4px 2px", color: "white", borderRadius: 4 }}>Edit Limit</button>

              </div>

              <div className={styles.tableDashboardCard}>
                <h3 className={styles.dashboardTableTitle}>Record 1</h3>
                <ApexChart data={dataY} categories={dataX} className={styles.dashboardChart} />
                <Table columns={columnsVibration} dataSource={dataVibration} pagination={false} />
              </div>
              <div className={styles.tableDashboardCard}>
                <h3 className={styles.dashboardTableTitle}>Record 2</h3>
                <ApexChart data={dataY} categories={dataX} className={styles.dashboardChart} />
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

    </DashboardLayout>
  );
}

export default Dashboard;
