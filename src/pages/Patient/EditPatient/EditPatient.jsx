import React, { useState, useEffect } from "react";
import axios from "axios";
//dependency component
import { Link, useLocation, useHistory, useParams } from "react-router-dom";
//my own component
import styles from "./EditPatient.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { BASE_API_URL } from "../../../helper/url";
import { logout } from "../../../utils/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
//framework component
import ReactLoading from "react-loading";
import { Typography, Breadcrumbs } from "@mui/material";
import { Select, Image, Timeline, Input, Tooltip, Skeleton, message } from "antd";
import { FaUserAlt, FaImage } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { DefaultAvatar } from "../../../assets/assets";
//var
const { TextArea } = Input;
const { Option } = Select;
function EditPatient(props) {
    const [status, setStatus] = useState("");
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingConfirm, setLoadingConfirm] = useState(false);
    const [reject, setReject] = useState(false);
    const [note, setNote] = useState("");
    const location = useLocation();
    const history = useHistory;
    const [profileImage, setProfileImage] = useState(null);
    const { id } = useParams();
    const [password, setPassword] = useState({
        current_password: "",
        new_password: "",
    });
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
        birthDate: "",
        profileImage: "",
        note: "",
        medicalRecordNumber: "",
        disease: "",
        address: "",
    });
    const [doctor, setDoctor] = useState({
        strNumber: "",
        address: "",
        practicePlace: "",
        specialization: "",
        birthDate: "",
    })

    const [patient, setPatient] = useState({
        id: "",
        name: "",
        email: "",
        phoneNumber: "",
        gender: "",
    });

    //handle change
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeGender = (event) => {
        setUser({
            ...user,
            ["gender"]: event,
        });
    };


    useEffect(() => {
        var config = {
            method: "get",
            url: `${BASE_API_URL}/patient/${id}`,
        };

        axios(config)
            .then(function (response) {
                setDetail(response.data);
                setUser(response.data);
                setUser({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    phoneNumber: response.data.phoneNumber,
                    gender: response.data.gender,
                    birthDate: response.data.birthDate,
                    profileImage: response.data.profileImage,
                    note: response.data.note,
                    medicalRecordNumber: response.data.medicalRecordNumber,
                    disease: response.data.disease,
                    address: response.data.address
                });
                setDoctor({
                    strNumber: response.data.strNumber,
                    address: response.data.address,
                    practicePlace: response.data.practicePlace,
                    specialization: response.data.specialization,
                    birthDate: response.data.birthDate,
                });
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const handleChangeImage = (event) => {
        setProfileImage(event.target.files[0]);

    }


    const updateUser = () => {
        var dataBody = new FormData();
        dataBody.append('name', user.name);
        dataBody.append('profileImage', user.profileImage);
        dataBody.append('medicalRecordNumber', user.medicalRecordNumber);
        dataBody.append('birthDate', user.birthDate);
        dataBody.append('gender', user.gender);
        dataBody.append('phoneNumber', user.phoneNumber);
        dataBody.append('email', user.email);
        dataBody.append('address', user.address);
        dataBody.append('disease', user.disease);
        dataBody.append('note', user.note);
        if (profileImage !== null) {
            dataBody.append('profileImage', profileImage);
        }
        var config = {
            method: 'patch',
            url: `${BASE_API_URL}/patient/${id}`,
            "content-type": "multipart/form-data",
            data: dataBody
        };

        axios(config)
            .then(function (response) {
                toast.success('Mengedit Pasien Berhasil', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(function (error) {
                console.log(error);
                toast.error('Edit Pasien Gagal', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    }

    const handleChangePassword = (event) => {
        setPassword({
            ...password,
            [event.target.name]: event.target.value,
        });
    };

    const updatePassword = () => {

    }

    return (
        <DashboardLayout>
            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <h2 className={styles.pageTitle}>Edit User</h2>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                        <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                            Home
                        </Link>
                        <Link className={styles.breadActive} underline="hover" color="inherit" to="/user">
                            User
                        </Link>
                        <Typography className={styles.breadUnactive}>Edit User</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.detailContainer}>
                    <div className={styles.container}>
                        <div className={styles.leftContainer}>
                            <div className={styles.profile}>
                                <div className={styles.imageBoxProfile}>
                                    <Image src={DefaultAvatar} className={styles.imageItemProfile} />
                                </div>
                                <div className={styles.topProfileText}>
                                    <h5 className={styles.name}>Albert Kurniawan</h5>
                                    <p className={styles.type}>User</p>
                                </div>
                            </div>
                            <div className={styles.mainDetail}>
                                <div className={styles.mainUserDetail}>
                                    <div className={styles.mainTitle}>
                                        <FaUserAlt className={styles.mainTitleIcon} />
                                        <h4 className={styles.mainTitleText}>Data Diri User</h4>
                                    </div>
                                    <div className={styles.mainDetailData}>
                                        <div className={styles.mainLeftData}>

                                            <div className={styles.formField}>
                                                <p className={styles.titleDetail}>Nama</p>
                                                <Input value={user.name} name="name" onChange={handleChange} />
                                            </div>

                                            <div className={styles.formField}>
                                                <p className={styles.titleDetail}>Email</p>
                                                <Input type="email" value={user.email} name="email" onChange={handleChange} />
                                            </div>
                                            <div className={styles.formField}>
                                                <p className={styles.titleDetail}>No Whatsapp</p>
                                                <Input addonBefore="+62" type="number" value={user.phoneNumber} name="phoneNumber" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={updateUser} className={styles.btnSave}>Simpan</button>
                                </div>

                                <div className={styles.mainUserDetail}>
                                    <div className={styles.mainTitle}>
                                        <RiLockPasswordFill className={styles.mainTitleIcon} />
                                        <h4 className={styles.mainTitleText}>Ubah Kata Sandi</h4>
                                    </div>
                                    <div className={styles.mainDetailData}>
                                        <div className={styles.mainLeftData}>
                                            <div className={styles.detailGroup}>
                                                <p className={styles.detailTitle}>Kata Sandi Baru</p>
                                                <Input.Password required onChange={handleChangePassword} name="current_password" value={password.current_password} className={styles.formControl} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                            </div>
                                            <div className={styles.detailGroup}>
                                                <p className={styles.detailTitle}>Konfirmasi Kata Sandi</p>
                                                <Input.Password required onChange={handleChangePassword} name="new_password" value={password.new_password} className={styles.formControl} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={updatePassword} className={styles.btnSave}>Ubah</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </DashboardLayout >
    );
}

export default EditPatient;
