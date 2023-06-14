import React, { useEffect, useState } from "react";
import LoginImg from "../../infrastructure/assets/images/login_design.jpeg";
import BioOrganicLogo from "../../infrastructure/assets/images/logo.png";
import { Link } from "react-router-dom";
import { logIn } from "../../application/services/actions/auth";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginComponent = (props) => {
  let validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const formHandler = async (formData) => {
    console.log("formData", formData);
    let payload = {
      username: formData.email,
      password: formData.password,
    };
    console.log("payload", payload);
    await props
      .logIn(payload)
      .then((res) => {
        console.log("login api res", res);
      })
      .catch((error) => {
        console.log("login api Error");
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      formHandler(values);
    },
  });

  // useEffect(async () => {
  //   let payload = {
  //     username: input.email,
  //     password: input.password,
  //   };
  //   await props
  //     .logIn(payload)
  //     .then((res) => {
  //       console.log("login", res);
  //       setInput(res.data.result);
  //     })
  //     .catch((error) => {
  //       console.log("login error", error);
  //     });
  //   return () => {};
  // }, []);

  // console.log("input", input);

  // useEffect(() => {
  //   props
  //     .logIn()
  //     .then((res) => {
  //       console.log("api res", res);
  //     })
  //     .catch((error) => {
  //       console.log("login Error");
  //     });
  // }, []);
  return (
    <div className=" login">
      <img className="background-img" src={LoginImg} />
      <div className="login-container">
        <div className="d-flex justify-content-center align-items-center">
          <img className="bio-logo me-2" src={BioOrganicLogo} />
          <span
            style={{
              fontSize: "17px",
              color: "#a3238e",
            }}
          >
            BioOrganics
          </span>
        </div>
        <div
          style={{
            borderTop: "2px solid #fff ",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <hr />
        <h3 className="mt-3" style={{ fontWeight: "bold" }}>
          Log in
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <input
              name="email"
              className="justify-content-end"
              placeholder="Email Address"
              style={{
                width: "22rem",
                height: "3rem",
                borderRadius: "5px",
                border: "1px solid rgb(209 209 209)",
              }}
              onChange={formik.handleChange("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              name="password"
              className="justify-content-end"
              placeholder="Password"
              style={{
                width: "22rem",
                height: "3rem",
                borderRadius: "5px",
                border: "1px solid rgb(209 209 209)",
                marginTop: "10px",
              }}
              onChange={formik.handleChange("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
          </div>
        </form>
        <div
          style={{ marginLeft: "57px", marginRight: "57px" }}
          className="d-flex justify-content-between align-items-center mt-3"
        >
          <div className="mt-2 d-flex justify-content align-items-center remember-me">
            <input type="checkbox" className="checkbox-btn" />
            &nbsp;
            <span style={{ fontWeight: "bold", fontSize: "13px" }}>
              Remember me
            </span>
          </div>
          <div>
            <span
              className="remember-me"
              style={{ fontWeight: "bold", fontSize: "13px" }}
            >
              Forgot Password?
            </span>
          </div>
        </div>
        <button
          className="login-submit-btn"
          onClick={() => {
            // formHandler();
            formik.handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authReducer: { logIn } }) => ({
  logIn,
});
const mapDispatchToProps = {
  logIn: (payloadData) => logIn(payloadData),
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
