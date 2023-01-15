//react component
import React, { useState } from "react";
import { Link } from "react-router-dom";
//dependency component
import axios from "axios";
import { BASE_API_URL } from "../../../helper/url";
//my own component
import styles from "./Login.module.css";
import LoginNav from "../../../components/navbars/login-nav/LoginNav";
import { login } from "../../../utils/auth";
import { EyeInvisibleOutlined, EyeTwoTone } from "../../../assets/assets";
import LoginLogo from "../../../assets/images/login-logo.png";
//framework component
import ReactLoading from "react-loading";
import { Input, message, Alert } from "antd";
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

    if (user.email === "admin@gmail.com" && user.password === "admin") {
      login({
        email: user.email,
        token: Math.random(),
      });
      message.success("Login berhasil");
      setLoading(false);
      props.history.push("/dashboard");
    } else {
      setMessageVal("Email atau password anda salah");
      setLoading(false);
      setOpenAlert(true);
    }

  };
  return (
    <div className={styles.wrapper}>
      <LoginNav />
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <h1 className={styles.title}>Project Albert</h1>
          <p className={styles.description}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nulla sequi rerum blanditiis vero. Temporibus aliquam veritatis voluptas quos nobis!</p>
          <img src={"https://www.pngmart.com/files/21/Internet-Of-Things-IOT-Vector-PNG-Picture.png"} alt="maskot kurir" className={styles.maskotImage} />
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
            <div className={styles.infoLogin}>
              <a target="_blank" href="https://api.whatsapp.com/send?phone=6287861130080&text=Saya%20lupa%20kata%20sandi%20saya." className={styles.linkForgetPw}>
                Lupa kata sandi ?
              </a>
            </div>
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
