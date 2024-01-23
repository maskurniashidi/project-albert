import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { logout } from "../../../utils/auth";
import { Link } from "react-router-dom";
import styles from "./Patient.module.css";
import { message, Skeleton, Tooltip, Input, Select, Space, Table, Tag } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";

function Patient() {
  const [dataUser, setDataUser] = useState([]);
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
        (response.data.filter(word => word.role === "user")).map((item) => {
          newDataTemp = [...newDataTemp, { key: item.id, name: item.fullName, email: item.email, tags: ["User"] }];
        });
        setDataUser(newDataTemp);

      })
      .catch(function (error) {
        if (error.response.status === 401) {
          logout();
        }
        setLoading(false);
        console.log(error);
      });
  }, []);


  // table
  const columns = [
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
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Link to={`/user/detail-user/${record.key}`}>
    //         <AiFillEye className={styles.iconActionView} />
    //       </Link>
    //       <Link to={`/user/edit-user/${record.key}`}>
    //         <AiFillEdit className={styles.iconActionEdit} />
    //       </Link>
    //       <button onClick={() => deletePasien(record.key)}>
    //         <AiFillDelete className={styles.iconActionDelete} />
    //       </button>
    //     </Space>
    //   ),
    // },
  ];


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
      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>User</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Typography className={styles.breadUnactive}>User</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.UserListContent}>
          <div className={styles.titleListUser}>
            <div className={styles.titleText}>
              <h3 className={styles.titleTextMain}>Daftar User</h3>
              <p className={styles.titleDesc}>List daftar user yang terdaftar dalam aplikasi albert</p>
            </div>
            <Link to="/user/tambah-user" className={styles.btnAddUser}>
              Tambah User
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
        <div className={styles.UserListContent}>
          {/* <div className={styles.statistikContainer}>
            <div className={styles.topInfo}>
              <div className={styles.filterBox}>
                <div className={styles.searchContainer}>
                  <Input placeholder="cari berdasar nama" style={{ width: 400 }} />
                  <button className={styles.searchBtn}>Cari</button>
                </div>
              </div>
            </div>
          </div> */}

          {loading ? (
            <Skeleton />
          ) : (
            <div className={styles.tableContainerDoctor}>
              <Table columns={columns} dataSource={dataUser} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Patient;
