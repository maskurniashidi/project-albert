import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../../../utils/auth";
import { message, Skeleton, Tooltip, Select, Space, Tag, Input, Pagination, Button, Modal, TimePicker, DatePicker } from "antd";
import { BASE_API_URL } from "../../../helper/url";
import dayjs from 'dayjs';
import moment from 'moment';
//dependency component
import { Link } from "react-router-dom";
//my own component
import styles from "./History.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { CarouselDashboard1, CarouselDashboard2 } from "../../../assets/assets";
//framework component
import { Carousel } from "react-bootstrap";
import { Typography, Breadcrumbs } from "@mui/material";
import { AiOutlineQuestionCircle, AiFillDelete } from "react-icons/ai";
import { MdSensors } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { ExclamationCircleFilled } from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { Option } = Select;
const { confirm } = Modal;
function History() {
    let detailUser = JSON.parse(localStorage.getItem("user"))
    const [flowVal, setFlowVal] = useState()
    const [flowId, setFlowId] = useState()
    const [vibVal, setVibVal] = useState()
    const [vibId, setVibId] = useState()
    // state loading
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    // flow
    const [dataFlowGlobal, setDataFlowGlobal] = useState(null);
    const [dataFlowHistory, setDataFlowHistory] = useState([]);
    const [dataFlowName, setDataFlowName] = useState("");
    const [dataFlowMtbf, setDataFlowMtbf] = useState(null);
    const [dataFlowReliability, setDataFlowReliability] = useState(null);
    // vibration
    const [dataVibrationGlobal, setDataVibrationGlobal] = useState(null);
    const [dataVibrationHistory, setDataVibrationHistory] = useState([]);
    const [dataVibrationName, setDataVibrationName] = useState("");
    const [dataVibrationMtbf, setDataVibrationMtbf] = useState(null);
    const [dataVibrationReliability, setDataVibrationReliability] = useState(null);
    // Modal
    const [visible, setVisible] = useState(false);
    const [typeModal, setTypeModal] = useState(null);
    const [modalText, setModalText] = useState(null);
    const [idDataHistory, setIdDataHistory] = useState(null);

    const [visibleAddRecordFlow, setVisibleAddRecordFlow] = useState(false);
    const [visibleDeleteRecordFlow, setVisibleDeleteRecordFlow] = useState(false);
    const [visibleAddDataRecordFlow, setVisibleAddDataRecordFlow] = useState(false);
    const [visibleAddRecordVib, setVisibleAddRecordVib] = useState(false);
    const [visibleDeleteRecordVib, setVisibleDeleteRecordVib] = useState(false);
    const [visibleAddDataRecordVib, setVisibleAddDataRecordVib] = useState(false);
    // state input
    const [inputRecordFlow, setInputRecordFlow] = useState(null)
    const [inputChangeFlowName, setInputChangeFlowName] = useState(null)
    const [inputDataRecordFlow, setInputDataRecordFlow] = useState({
        duration: null,
        timeStart: "",
        timeEnd: "",
        status: ""
    })
    const [inputRecordVib, setInputRecordVib] = useState(null)
    const [inputChangeVibrationName, setInputChangeVibrationName] = useState(null)
    const [inputDataRecordVib, setInputDataRecordVib] = useState({
        duration: null,
        timeStart: "",
        timeEnd: "",
        status: ""
    })

    //! ------------------------------------
    //!             HANDLE CHANGE
    //! ------------------------------------

    const onChangeFlow = (e, type) => {
        if (type === "add record flow") {
            setInputRecordFlow(e.target.value)
            console.log(inputRecordFlow)
        } else if (type === "add data record flow") {
            setInputDataRecordFlow({ ...inputDataRecordFlow, [e.target.name]: e.target.value })
        }
        console.log(inputDataRecordFlow);
    }

    const onChangeFlowName = (e, type) => {
        if (type === "edit flow title") {
            setInputChangeFlowName(e.target.value)
        }
    }

    const onChangeVibrationName = (e, type) => {
        if (type === "edit vibration title") {
            setInputChangeVibrationName(e.target.value)
        }
    }


    const onChangeStatusFlow = (key, value) => {
        setInputDataRecordFlow({ ...inputDataRecordFlow, [key]: value });
        console.log(inputDataRecordFlow);
    }

    const onChangeDurationFlow = (time, timeString) => {
        console.log(time, timeString);
        setInputDataRecordFlow({ ...inputDataRecordFlow, ["time"]: timeString })
    };

    const onChangeVibration = (e, type) => {
        console.log(e, type)
        if (type === "add record vibration") {
            setInputRecordVib(e.target.value)
            console.log(inputRecordVib)
        } else if (type === "add data record vibration") {
            setInputDataRecordVib({ ...inputDataRecordVib, [e.target.name]: e.target.value })
        }
    }

    const onChangeTimeStartFlow = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setInputDataRecordFlow({ ...inputDataRecordFlow, ["timeStart"]: dateString })


        // Menghitung timeEnd berdasarkan duration dan timeStart
        if (inputDataRecordFlow.duration && dateString) {
            const durationInHours = parseInt(inputDataRecordFlow.duration) * 60; // Konversi duration dari jam ke menit
            const timeStart = new Date(dateString); // Menggunakan objek Date bawaan JavaScript untuk manipulasi tanggal dan waktu
            const timeEnd = new Date(timeStart.getTime() + durationInHours * 60000); // Menambahkan duration ke timeStart
            setInputDataRecordFlow({ ...inputDataRecordFlow, ["timeEnd"]: timeEnd.toISOString() });
            console.log("end", timeEnd.toISOString())
        }

    };


    const onChangeTimeEndFlow = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setInputDataRecordFlow({ ...inputDataRecordFlow, ["timeEnd"]: dateString })
    };

    const onChangeTimeStartVib = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setInputDataRecordVib({ ...inputDataRecordVib, ["timeStart"]: dateString })


        // Menghitung timeEnd berdasarkan duration dan timeStart
        if (inputDataRecordVib.duration && dateString) {
            const durationInHours = inputDataRecordVib.duration * 60; // Konversi duration dari jam ke menit
            const timeStart = new Date(dateString); // Menggunakan objek Date bawaan JavaScript untuk manipulasi tanggal dan waktu
            const timeEnd = new Date(timeStart.getTime() + durationInHours * 60000); // Menambahkan duration ke timeStart
            setInputDataRecordVib({ ...inputDataRecordVib, ["timeEnd"]: timeEnd.toISOString() });
            console.log("end", timeEnd.toISOString())
        }

    };


    const onChangeTimeEndVib = (value, dateString) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setInputDataRecordVib({ ...inputDataRecordVib, ["timeEnd"]: dateString })
    };

    const onChangeStatusVibration = (key, value) => {
        setInputDataRecordVib({ ...inputDataRecordVib, [key]: value });

    }

    const onChangeDurationVibration = (time, timeString) => {
        console.log(time, timeString);
        setInputDataRecordVib({ ...inputDataRecordVib, ["time"]: timeString })
    };

    //! ------------------------------------
    //!             HANDLE CLICK
    //! ------------------------------------
    const showModal = (type, val) => {
        setTypeModal(type);
        console.log("id history", val);
        setIdDataHistory(val);
        setVisible(true);
        console.log(type)
        if (type === "add record flow") {
            setModalText("Tambahkan Record")
        } else if (type === "add record vibration") {
            setModalText("Tambahkan Record")
        } else if (type === "add data record flow") {
            setModalText("Tambahkan Data Record")
        } else if (type === "add data record vibration") {
            setModalText("Tambahkan Data Record")
        } else if (type === "edit flow title") {
            setModalText("Ubah Nama Record")
        } else if (type === "edit vibration title") {
            setModalText("Ubah Nama Record")
        }
    }

    const handleCancel = (type) => {
        setTypeModal(null);
        setModalText(null);
        setVisible(false);
    }

    const handleOk = () => {
        console.log("data flow his", dataFlowGlobal)
        if (typeModal === "add record flow") {
            var dataBody = JSON.stringify({
                "name": inputRecordFlow,
            });

            var config = {
                method: 'post',
                url: `https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${dataFlowGlobal.id}/add-history`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };

            axios(config)
                .then(function (response) {
                    // alert("record flow berhasil ditambahkan");
                    toast.success('Record flow berhasil ditambahkan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setVisible(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (error) {
                    toast.error('Record flow gagal ditambahkan, pastikan input text telah terisi', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });

        } else if (typeModal === "add record vibration") {
            var dataBody = JSON.stringify({
                "name": inputRecordVib,
            });

            var config = {
                method: 'post',
                url: `https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${dataVibrationGlobal.id}/add-history`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };

            axios(config)
                .then(function (response) {
                    toast.success('Record vibration berhasil ditambahkan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setVisible(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (error) {
                    toast.error('Record vibration gagal ditambahkan, pastikan input text telah terisi', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        } else if (typeModal === "add data record flow") {
            console.log("id data his", idDataHistory);
            // alert("data record flow ditambahkan", idDataHistory)
            var dataBody = JSON.stringify({
                "duration": parseInt(inputDataRecordFlow.duration),
                "timeStart": inputDataRecordFlow.timeStart,
                "timeEnd": inputDataRecordFlow.timeEnd,
                "status": inputDataRecordFlow.status
            });


            var config = {
                method: 'post',
                url: `https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${dataFlowGlobal.id}/${idDataHistory}/add-data`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };

            axios(config)
                .then(function (response) {
                    toast.success('Data record flow berhasil ditambahkan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setVisible(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (error) {
                    toast.error('Data record flow gagal ditambahkan, pastikan input text telah terisi', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        } else if (typeModal === "add data record vibration") {
            var dataBody = JSON.stringify({
                "duration": parseInt(inputDataRecordVib.duration),
                "timeStart": inputDataRecordVib.timeStart,
                "timeEnd": inputDataRecordVib.timeEnd,
                "status": inputDataRecordVib.status
            });

            var config = {
                method: 'post',
                url: `https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${dataVibrationGlobal.id}/${idDataHistory}/add-data`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };

            axios(config)
                .then(function (response) {
                    toast.success('Data Record Vibration berhasil ditambahkan', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setVisible(false);
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                })
                .catch(function (error) {
                    toast.error('Data record vibration gagal ditambahkan, pastikan input text telah terisi', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
            // }
        } else if (typeModal === "edit flow title") {            
            var dataBody = JSON.stringify({
                "flowName": inputChangeFlowName,
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${flowId}/update-flow-name`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };
            
            axios(config)
            
            .then(function (response) {
                toast.success('Record berhasil diubah', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setVisible(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(function (error) {
                toast.error('Record gagal diubah', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        } else if (typeModal === "edit vibration title") {            
            var dataBody = JSON.stringify({
                "vibrationName": inputChangeVibrationName,
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${vibId}/update-vibration-name`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                },
                data: dataBody
            };
            
            axios(config)
            
            .then(function (response) {
                toast.success('Record berhasil diubah', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setVisible(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(function (error) {
                toast.error('Record gagal diubah', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        }
    }

    const showDeleteConfirmFlow = (idHistory, idDataHistory) => {
        confirm({
            title: 'Are you sure delete this record ?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${dataFlowGlobal.id}/${idHistory}/${idDataHistory}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                    }
                })
                    .then(response => {
                        toast.success('Data record flow berhasil dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        toast.error('Data record flow gagal dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const showDeleteConfirmVibration = (idHistory, idDataHistory) => {
        confirm({
            title: 'Are you sure delete this record ?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${dataVibrationGlobal.id}/${idHistory}/${idDataHistory}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                    }
                })
                    .then(response => {
                        toast.success('Data record vibration berhasil dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        toast.error('Data record vibration gagal dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    const showDeleteConfirmFlowHistory = (idHistory) => {
        confirm({
            title: 'Are you sure delete this record ?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${dataFlowGlobal.id}/history/${idHistory}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                    }
                })
                    .then(response => {
                        toast.success('History record flow berhasil dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        toast.error('History record flow gagal dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const showDeleteConfirmVibrationHistory = (idHistory) => {
        confirm({
            title: 'Are you sure delete this record ?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                axios.delete(`https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${dataVibrationGlobal.id}/history/${idHistory}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                    }
                })
                    .then(response => {
                        toast.success('History record vibration berhasil dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        toast.error('History record vibration gagal dihapus', {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }



    //! ------------------------------------
    //!             SIDE EFFECT
    //! ------------------------------------

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
                setFlowVal(response.data[0].value)
                setFlowId(response.data[0].id)
                setLoading1(false)

                var config = {
                    method: 'get',
                    url: `https://wild-tan-tadpole-tutu.cyclic.app/flow-sensor/${response.data[0].id}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
                    }
                };

                axios(config)
                    .then(function (response) {
                        console.log("flows", response.data.flows);
                        setDataFlowGlobal(response.data.flows);
                        setDataFlowHistory(response.data.flows.history);
                        setDataFlowName(response.data.flows.flowName)
                        setDataFlowMtbf(response.data.flows.mtbf);
                        setDataFlowReliability(response.data.flows.reliability);
                        console.log("tes");
                        setLoading2(false);
                    })
                    .catch(function (error) {
                        console.log(error.response.status)

                        if (error.response.status === 401) {
                            logout();
                        }
                        console.log(error);
                    });
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    logout();
                }
                console.log(error.response.status)
                console.log(error);
            });
    }, []);


    // vibration
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
                setVibVal(response.data[0].value)
                setVibId(response.data[0].id)
                setLoading3(false)
                var config = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: `https://wild-tan-tadpole-tutu.cyclic.app/vibration-sensor/${response.data[0].id}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`,
                    },
                };

                axios(config)
                    .then(function (response) {
                        console.log("history", response.data);
                        setDataVibrationGlobal(response.data.vibrations);
                        setDataVibrationHistory(response.data.vibrations.history);
                        setDataVibrationName(response.data.vibrations.vibrationName);
                        setDataVibrationMtbf(response.data.vibrations.mtbf);
                        setDataVibrationReliability(response.data.vibrations.reliability);
                        setLoading4(false);

                    })
                    .catch(function (error) {
                        if (error.response.status === 401) {
                            logout();
                        }
                        console.log(error);
                    });
            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    logout();
                }
                console.log(error);
            });

    }, []);

    if (loading1 || loading2 || loading3 || loading4) {
        return <p>Loading...</p>;
    }



    return (
        <DashboardLayout>
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
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className={styles.main}>
                    {/* Modal */}
                    <Modal
                        title={modalText}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        okButtonProps={{ className: `${styles.btnOkModal}` }}
                        okText="Tambah"
                        cancelText="Batal"
                    >
                        {/* <div>
                            <label htmlFor="">Record Name</label>
                            <Input value="" onChange={inputChangeFlow} />
                        </div> */}
                        {typeModal === "add record flow" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Record Name</label>
                                <Input value={inputRecordFlow} onChange={(e) => onChangeFlow(e, "add record flow")} />
                            </div>
                        )}
                        {typeModal === "add record vibration" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Record Name</label>
                                <Input value={inputRecordVib} onChange={(e) => onChangeVibration(e, "add record vibration")} />
                            </div>
                        )}

                        {typeModal === "add data record flow" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Duration</label>
                                <Input style={{ marginBottom: 8 }} name="duration" type="number" value={inputDataRecordFlow.duration} onChange={(e) => onChangeFlow(e, "add data record flow")} />
                                <label style={{ marginBottom: 8 }} htmlFor="">Time Start</label>
                                <DatePicker style={{ marginBottom: 8, display: "block" }} name="timeStart" onChange={onChangeTimeStartFlow} showTime />
                                <label style={{ marginBottom: 8 }} htmlFor="">Time End</label>
                                <DatePicker style={{ marginBottom: 8, display: "block" }} name="timeEnd" onChange={onChangeTimeEndFlow} showTime />
                                <label style={{ marginBottom: 8 }} htmlFor="">Status</label>
                                <Select style={{ marginBottom: 8, display: "block" }} name="status" value={inputDataRecordFlow.status} onChange={(value) => onChangeStatusFlow('status', value)} defaultValue="">
                                    <Option value="START">START</Option>
                                    <Option value="ERROR">ERROR</Option>
                                    <Option value="NORMAL">NORMAL</Option>
                                    <Option value="FAILURE">FAILURE</Option>
                                    <Option value="FINISH">FINISH</Option>
                                </Select>
                            </div>
                        )}

                        {typeModal === "add data record vibration" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Duration</label>
                                <Input style={{ marginBottom: 8 }} name="duration" type="number" value={inputDataRecordVib.duration} onChange={(e) => onChangeVibration(e, "add data record vibration")} />
                                <label style={{ marginBottom: 8 }} htmlFor="">Time Start</label>
                                <DatePicker style={{ marginBottom: 8, display: "block" }} name="timeStart" onChange={onChangeTimeStartVib} showTime />
                                <label style={{ marginBottom: 8 }} htmlFor="">Time End</label>
                                <DatePicker style={{ marginBottom: 8, display: "block" }} name="timeEnd" onChange={onChangeTimeEndVib} showTime />
                                <label style={{ marginBottom: 8 }} htmlFor="">Status</label>
                                <Select style={{ marginBottom: 8, display: "block" }} name="status" value={inputDataRecordVib.status} onChange={(value) => onChangeStatusVibration('status', value)} defaultValue="">
                                    <Option value="START">START</Option>
                                    <Option value="ERROR">ERROR</Option>
                                    <Option value="NORMAL">NORMAL</Option>
                                    <Option value="FAILURE">FAILURE</Option>
                                    <Option value="FINISH">FINISH</Option>
                                </Select>
                            </div>
                        )}
                        {typeModal === "edit flow title" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Ubah Nama</label>
                                {/* <Input value={inputChangeFlowName} onChange={(e) => onChangeFlowName(e, "edit flow title")} /> */}
                                {/* <Input onChange={(e) => onChangeFlowName(e, "edit flow title")} /> */}
                                <Input placeholder={dataFlowName} onChange={(e) => onChangeFlowName(e, "edit flow title")} />
                                {/* <Input value={dataFlowName} onChange={(e) => onChangeFlowName(e.target.value)} /> */}
                            </div>
                        )}
                        {typeModal === "edit vibration title" && (
                            <div>
                                <label style={{ marginBottom: 8 }} htmlFor="">Ubah Nama</label>
                                <Input placeholder={dataVibrationName} onChange={(e) => onChangeVibrationName(e, "edit vibration title")} />
                            </div>
                        )}
                    </Modal>
                    {/* Kriteria Keuangan */}
                    <div className={styles.dashboardKeuanganContainer}>
                        <div className={styles.dashboardLeft}>
                            <div className={styles.dashboardTitleContainer}>
                                <div>
                                    {
                                        dataFlowName == null ?
                                            <>
                                                <h3 className={styles.dashboardKeuanganTitle}>
                                                    HISTORY
                                                </h3>
                                                <p className={styles.dashboardKeuanganDesc}>Data history yang tercatat</p>
                                            </>
                                            :
                                            <>
                                                <h3 className={styles.dashboardKeuanganTitle}>
                                                    HISTORY {dataFlowName.toUpperCase()}
                                                </h3>
                                                <p className={styles.dashboardKeuanganDesc}>Data history {`${dataFlowName.toLowerCase()}`} yang tercatat</p>
                                            </>
                                    }
                                </div>

                                {
                                    detailUser.role !== "user" && 
                                        <button onClick={() => showModal("edit flow title")} className={styles.editTitleArea}>
                                            <FiEdit className={styles.editTitle}/>
                                        </button>
                                }
                            </div>
                            <div className={styles.divider}></div>

                            <div className={styles.sensorBox}>
                                <h2 className={styles.sensorValue}>{flowVal}</h2>
                                <MdSensors className={styles.sensorIcon} />
                            </div>

                            <div className={styles.testBox2}>
                                <h4 className={styles.testText}>MTBF : {dataFlowMtbf}</h4>
                                <h4 className={styles.testText}>Reliability : {dataFlowReliability}</h4>
                            </div>

                            {
                                detailUser.role !== "user" && <button onClick={() => showModal("add record flow")} className={styles.addRecord}>Add Record</button>
                            }

                            {dataFlowHistory.map((item) => {
                                return (
                                    <div key={item.id} className={styles.tableDashboardCard}>
                                        <div className={styles.recordTop}>
                                            <h3 className={styles.dashboardTableTitle}>{item.name}</h3>
                                            {
                                                detailUser.role !== "user" && (
                                                    <div className={styles.historyAction}>
                                                        <button className={styles.addDataRecord} onClick={() => showModal("add data record flow", item.id)}>Add Data</button>
                                                        <button onClick={() => showDeleteConfirmFlowHistory(item.id)} className={styles.addDataRecordDelete}>
                                                            <AiFillDelete className={styles.deleteIcon} style={{ fontSize: "24px", color: "white" }} />
                                                        </button>
                                                    </div>
                                                )
                                            }

                                        </div>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Duration</th>
                                                    <th>Time Start</th>
                                                    <th>Time End</th>
                                                    <th>Status</th>
                                                    {
                                                        detailUser.role !== "user" &&
                                                        <th>Action</th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.data.map((dataHistory) => (
                                                    <tr key={dataHistory.id}>
                                                        <td>{dataHistory.duration}</td>
                                                        <td>{dataHistory.timeStart}</td>
                                                        <td>{dataHistory.timeEnd}</td>
                                                        <td>{dataHistory.status}</td>
                                                        {
                                                            detailUser.role !== "user" &&
                                                            <td>
                                                                <button style={{ color: "red" }} onClick={() => showDeleteConfirmFlow(item.id, dataHistory.id)}>delete</button>
                                                            </td>
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                            })}

                            {/* <div className={styles.paginationBox}>
                                <Pagination defaultCurrent={1} total={20} />
                            </div> */}
                        </div>
                        <div className={styles.dashboardRight}>
                            <div className={styles.dashboardTitleContainer}>
                                <div>
                                    {
                                        dataVibrationName == null ?
                                            <>
                                                <h3 className={styles.dashboardKeuanganTitle}>
                                                    HISTORY
                                                </h3>
                                                <p className={styles.dashboardKeuanganDesc}>Data history yang tercatat</p>
                                            </>
                                            :
                                            <>
                                                <h3 className={styles.dashboardKeuanganTitle}>
                                                    HISTORY {dataVibrationName.toUpperCase()}
                                                </h3>
                                                <p className={styles.dashboardKeuanganDesc}>Data history {`${dataVibrationName.toLowerCase()}`} yang tercatat</p>
                                            </>
                                    }
                                </div>

                                {
                                    detailUser.role !== "user" && 
                                        <button onClick={() => showModal("edit vibration title")} className={styles.editTitleArea}>
                                            <FiEdit className={styles.editTitle}/>
                                        </button>
                                }
                            </div>
                            <div className={styles.divider}></div>

                            <div className={styles.sensorBox}>
                                <h2 className={styles.sensorValue}>{vibVal}</h2>
                                <MdSensors className={styles.sensorIcon} />
                            </div>

                            <div className={styles.testBox2}>
                                <h4 className={styles.testText}>MTBF : {dataVibrationMtbf}</h4>
                                <h4 className={styles.testText}>Reliability : {dataVibrationReliability}</h4>
                            </div>


                            <button onClick={() => showModal("add record vibration")} className={styles.addRecord}>Add Record</button>

                            {dataVibrationHistory.map((item) => {
                                return (
                                    <div key={item.id} className={styles.tableDashboardCard}>
                                        <div className={styles.recordTop}>
                                            <h3 className={styles.dashboardTableTitle}>{item.name}</h3>

                                            {
                                                detailUser.role !== "user" &&
                                                <div className={styles.historyAction}>
                                                    <button className={styles.addDataRecord} onClick={() => showModal("add data record vibration", item.id)}>Add Data</button>
                                                    <button onClick={() => showDeleteConfirmVibrationHistory(item.id)} className={styles.addDataRecordDelete}>
                                                        <AiFillDelete className={styles.deleteIcon} style={{ fontSize: "24px", color: "white" }} />
                                                    </button>
                                                </div>
                                            }

                                        </div>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>Duration</th>
                                                    <th>Time Start</th>
                                                    <th>Time End</th>
                                                    <th>Status</th>
                                                    {
                                                        detailUser.role !== "user" &&
                                                        <th>Action</th>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.data.map((dataHistory) => (
                                                    <tr key={dataHistory.id}>
                                                        <td>{dataHistory.duration}</td>
                                                        <td>{dataHistory.timeStart}</td>
                                                        <td>{dataHistory.timeEnd}</td>
                                                        <td>{dataHistory.status}</td>
                                                        {
                                                            detailUser.role !== "user" &&
                                                            <td>
                                                                <button style={{ color: "red" }} onClick={() => showDeleteConfirmVibration(item.id, dataHistory.id)}>delete</button>
                                                            </td>
                                                        }
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )
                            })}
                            {/* <div className={styles.paginationBox}>
                                <Pagination defaultCurrent={1} total={20} />
                            </div> */}
                        </div>

                    </div>

                    {/* kriteria berdasarkan kota */}
                    <div className={styles.dashboardCityContainer}></div>
                </div>
            </div>

        </DashboardLayout >
    );
}

export default History;
