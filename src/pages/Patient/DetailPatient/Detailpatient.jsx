import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import styles from "./DetailPatient.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import { Typography, Breadcrumbs } from "@mui/material";
import { Image, Skeleton } from "antd";
import { FaUserAlt } from "react-icons/fa";
import { DefaultAvatar } from "../../../assets/assets";

function DetailPatient(props) {
  const [loading, setLoading] = useState(false);
  return (
    <DashboardLayout>

      <div className={styles.wrapper}>
        <div className={styles.topWrapper}>
          <h2 className={styles.pageTitle}>Detail User</h2>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcumbs}>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/dashboard">
              Home
            </Link>
            <Link className={styles.breadActive} underline="hover" color="inherit" to="/user">
              User
            </Link>
            <Typography className={styles.breadUnactive}>Detail User</Typography>
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
                  <h5 className={styles.name}>Albert</h5>
                  <p className={styles.city}>USER</p>
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
                      <p className={styles.titleDetail}>Email</p>
                      <p className={styles.titleDetail}>No Whatsapp</p>
                    </div>
                    <div className={styles.mainRightData}>
                      <p className={styles.textDetail}>: albert@gmail.com</p>
                      <p className={styles.textDetail}>: 087812819313</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.status}>
              <div>
                <div className={styles.statusTitle}>Status User</div>
                <p className={styles.textTimeline}>Dibuat pada : 12/12/2022</p>
              </div>
            </div>
          </div>
          {/* dicom */}
        </div>
      )}
    </DashboardLayout>
  );
}

export default DetailPatient;
