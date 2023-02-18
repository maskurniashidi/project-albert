import React, { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../../utils/auth";
import styles from "./MyAccount.module.css";
import { Skeleton, Input } from "antd";

function MyAccount() {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://wild-tan-tadpole-tutu.cyclic.app/profile/me',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("TOKEN")}`
      }
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          logout();
        }
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.container}>
          {/* <ToastContainer
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
          /> */}
          <div className={styles.topWrapper}>
            <h3 className={styles.title}>Profil Saya</h3>
            <p className={styles.titleDesc}>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.detailContainer}>
            <div className={styles.leftDetail}>
              {/* <div className={styles.detailGroupPicture}>
                <div className={styles.profileContainer}>
                  {
                    profilePic === null ? <Image src={`https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80`} alt="avatar" className={styles.profilePicItem} /> : <Image src={URL.createObjectURL(profilePic)} className={styles.profilePicItem} />
                  }
                </div>
                <input accept=".png, .jpeg, .jpg" className={styles.fileInput} type="file" name="photo_profile" onChange={imageChange} />
              </div> */}
              <div style={{ marginTop: "16px" }} className={styles.detailGroup}>
                <p className={styles.detailTitle}>Nama</p>
                <Input type="text" className={styles.formControlWithMargin} name="name" value={user.fullName} />
              </div>
              <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>Email</p>
                <Input type="email" className={styles.formControlWithMargin} name="email" value={user.email} />
              </div>
              <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>Role</p>
                <Input type="email" className={styles.formControlWithMargin} name="role" value={user.role} />
              </div>
              {/* <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>Jenis Kelamin</p>
                <Select required defaultValue={user.gender === "L" ? "Laki-Laki" : "Perempuan"} className={styles.formControl} onChange={handleChangeGender}>
                  <Option value="L">Laki-laki</Option>
                  <Option value="P">Perempuan</Option>
                </Select>
              </div> */}
              {/* <div className={styles.detailGroup}>
                <p className={styles.detailTitle}>No Telepon</p>
                <Input addonBefore="+62" value="8213231451" name="phoneNumber" type="number" className={styles.formControl} onChange={handleChange} />
              </div> */}
              {/* <div className={styles.btnContainer}>
                {editable === true ? (
                  <>
                    {loadingLogin ? (
                      <button disabled className={styles.btnSave}>
                        <ReactLoading className={styles.loadingLogin} type={props.balls} color={props.color} height={20} width={30} />
                      </button>
                    ) : (
                      <button className={styles.btnSave} onClick={updateProfile}>
                        Simpan
                      </button>
                    )}
                  </>
                ) : (
                  <button disabled className={styles.btnSaveDisabled}>
                    Simpan
                  </button>
                )}
              </div> */}
            </div>

            {/* <div className={styles.rightDetail}></div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
