import React, { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../utils/auth";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import { Skeleton, Space, Table, Tag, Button, Input, Modal } from "antd";
import { ToastContainer, toast } from 'react-toastify';
const { Search } = Input;
function Admin() {
    const [dataAdmin, setDataAdmin] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        var config = {
            method: 'get',
            url: 'https://rcm-albert.dhani.cloud/admin/users',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
            }
        };

        axios(config)
            .then(function (response) {
                setLoading(false);
                var newDataTemp = [];
                (response.data.filter(word => word.role === "admin")).map((item) => {
                    newDataTemp = [...newDataTemp, { key: item.id, name: item.fullName, email: item.email, tags: ["Admin"] }];
                });
                setDataAdmin(newDataTemp);

            })
            .catch(function (error) {
                setLoading(false);
                if (error.response.status === 401) {
                    logout();
                }
                console.log(error);
            });
    }, []);

    // table init
    const columns2 = [
        {
            title: "ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Nama",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            key: "tags",
            dataIndex: "tags",
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        // {
        //     title: "Action",
        //     key: "action",
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <Link to={`/admin/detail-admin/${record.key}`}>
        //                 <AiFillEye className={styles.iconActionView} />
        //             </Link>
        //             <Link to={`/admin/edit-admin/${record.key}`}>
        //                 <AiFillEdit className={styles.iconActionEdit} />
        //             </Link>
        //             <button onClick={() => deleteDoctor(record.userId)}>
        //                 <AiFillDelete className={styles.iconActionDelete} />
        //             </button>
        //         </Space>
        //     ),
        // },
    ];


    // const handleInput = (e) => {
    //     setInputSearch(e.target.value);
    //     var dataSearch = dataForSearch.filter((item) => {
    //         return (
    //             item
    //                 .name
    //                 .toLowerCase()
    //                 .includes(e.target.value.toLowerCase())
    //         )
    //     });
    //     setData(dataSearch)
    //     if (e.target.value === "") {
    //         setData(dataForSearch)
    //     }
    // }

    return (
        <DashboardLayout>
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

            {loading ? (
                <Skeleton />
            ) : (
                <div className={styles.wrapper}>
                    <div className={styles.topWrapper}>
                        <h2 className={styles.pageTitle}>Admin</h2>
                        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
                            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
                                Home
                            </Link>
                            <Typography className={styles.breadUnactive}>Admin</Typography>
                        </Breadcrumbs>
                    </div>
                    <div className={styles.UserListContent}>
                        <div className={styles.titleListUser}>
                            <div className={styles.titleText}>
                                <h3 className={styles.titleTextMain}>Daftar Admin</h3>
                                <p className={styles.titleDesc}>List daftar Admin yang terdaftar dalam aplikasi dicom viewer</p>
                            </div>
                            <Link to="/admin/tambah-admin" className={styles.btnAddUser}>
                                Tambah Admin
                            </Link>
                        </div>
                    </div>

                    {/* <div className={styles.statistikContainer}>
                        <div className={styles.topInfo}>
                            <div className={styles.filterBox}>
                                <div className={styles.searchContainer}>
                                    <Input placeholder="cari berdasar nama" onChange={handleInput} style={{ width: 400 }} />
                                    <button className={styles.searchBtn} onClick={handleInput} >
                                        Cari
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.tableContainerDoctor}>
                        <Table columns={columns2} dataSource={dataAdmin} />
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}

export default Admin;
