import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import LoginNav from "../../../components/navbars/login-nav/LoginNav";
import { login } from "../../../utils/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "../../../assets/assets";
import ReactLoading from "react-loading";
import { Input, message, Alert } from "antd";
import LogoLogin from "../../../assets/logo-its.png"
import LogoNav from "../../../assets/logo-its.png"
function Login(props) {
  //state
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageVal, setMessageVal] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //handle change
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  //handle submit login
  const handleLogin = () => {
    setLoading(true);
    var dataBody = JSON.stringify({
      "email": user.email,
      "password": user.password
    });

    var config = {
      method: 'post',
      url: 'https://rcm-albert.dhani.cloud/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dataBody
    };

    axios(config)
      .then(function (response) {
        login({
          email: user.email,
          token: response.data.loginToken,
        });
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        message.success("Login berhasil");
        setLoading(false);
        props.history.push("/dashboard");
      })
      .catch(function (error) {
        setMessageVal("Email atau password anda salah");
        setLoading(false);
        setOpenAlert(true);
      });

  };
  return (
    <div className={styles.wrapper}>
      <LoginNav />
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>RCM Project</h1>
          <img src={LogoLogin} alt="maskot kurir" className={styles.maskotImage} />
        </div>
        <div className={styles.rightContent}>
          <div className={styles.formGroup}>
            <h3 className={styles.formTitle}>Masuk ke akun anda</h3>
            {/* alert */}
            <div className={styles.alertLogin}>
              {openAlert && (
                <Alert
                  className={styles.alertText}
                  message={messageVal}
                  type="error"
                  showIcon
                  closable
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                />
              )}
            </div>
            <div className={styles.formField}>
              <label htmlFor="whatsapp" className={styles.label}>
                Email
              </label>
              <Input required type="email" className={styles.input} name="email" value={user.email} onChange={handleChange} />
            </div>
            <div className={styles.formField}>
              <label htmlFor="password" className={styles.label}>
                Kata Sandi
              </label>
              <Input.Password required name="password" className={styles.input} value={user.password} onChange={handleChange} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </div>
            {/* <div className={styles.infoLogin}>
              <a target="_blank" href="https://api.whatsapp.com/send?phone=6287861130080&text=Saya%20lupa%20kata%20sandi%20saya." className={styles.linkForgetPw}>
                Lupa kata sandi ?
              </a>
            </div> */}
            <div className={styles.infoLogin}></div>
            {loading ? (
              <button disabled className={styles.btnLogin}>
                <ReactLoading className={styles.loadingLogin} type={props.balls} color={props.color} height={20} width={30} />
              </button>
            ) : (
              <button onClick={handleLogin} className={styles.btnLogin}>
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
