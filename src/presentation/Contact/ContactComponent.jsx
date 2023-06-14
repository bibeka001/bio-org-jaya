import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import Location from "../../infrastructure/assets/images/location2.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import PurpleCircle from "../../infrastructure/assets/images/purple_circle.png";
import HeaderComponent from "../../presentation/Header/HeaderComponent";
import { connect } from "react-redux";
import { postContactList } from "../../application/services/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .nullable()
    .required("Name is required."),
  email: yup.string().nullable().email().required("Email is required."),
  message: yup.string().nullable().required("Message is required."),
});
function ContactComponent(props) {
  const formHandler = async (value) => {
    const payload = {
      id: "",
      fullName: value.fullName,
      emailId: value.email,
      message: value.message,
    };
    toast.info("Pending..", {
      position: toast.POSITION.TOP_RIGHT,
    });

    await props
      .PostContact(payload)
      .then((res) => {
        console.log("res>>", res);
        toast.success(res?.message?.message || "Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const {
    handleSubmit,
    setFieldValue,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (value) => formHandler(value),
    validationSchema: ValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });
  return (
    <div className="main">
      <HeaderComponent />
      {/* <div className="upper-div .container-flex"></div> */}
      <Container fluid className="containerDiv bg-primary px-0">
        <Row className="d-flex justify-content-between g-0 align-items-center">
          <Col
            className="d-flex contact-div align-items-center justify-content-center"
            xs="12"
            sm="12"
            md="6"
          >
            <div className="d-flex align-items-flex-start justify-content-flex-start flex-column">
              {/* <div className="imageDiv">
                <img className="purpleimg" src={PurpleCircle} />
              </div> */}
              <p className="p1">
                <BsTelephone size={28} className="mx-4 mb-3" />
                Phone
              </p>
              <p className="text-white">+91 7259396247</p>

              <p className="p1">
                <CiMail size={35} className="mx-4 mb-1" />
                Email
              </p>
              <p className="text-white">Example@gmail.com</p>

              <p className="p1">
                <CiLocationArrow1 size={35} className="mx-4" />
                Location
              </p>
              <p className="text-white flex-container">
                #01,Lorem Ipsum dolor sit amet,
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.268220586842!2d77.4967750743013!3d13.01858398730111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cf61aaaaaab%3A0x5d9b8fc84da867a4!2sBioOrganics!5e0!3m2!1sen!2sin!4v1686657166371!5m2!1sen!2sin"
                width={"350rem"}
                height={"200rem"}
                style={{ borderRadius: "30px" }}
              ></iframe>
            </div>
          </Col>
          <Col xs="12" sm="12" md="6">
            <div className="d-flex align-items-center justify-content-center flex-column form-div w-100">
              <h1 className="form-text-div" style={{ color: "#434343" }}>
                We'd love to hear from you,
              </h1>
              <h1 className="form-text-div mt-0 " style={{ color: "#a3238e" }}>
                Get in touch
              </h1>
              <form className="w-100">
                <Row className="w-100 justify-content-center">
                  <Col className="" xs="12" sm="12" md="6">
                    <Row>
                      <input
                        id="fullName"
                        name="fullName"
                        value={values.fullName}
                        className="form-style"
                        type="text"
                        placeholder="Full Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.fullName && touched.fullName ? (
                        <div className="errorMessage">{errors.fullName}</div>
                      ) : null}
                    </Row>
                    <Row>
                      <input
                        id="email"
                        name="email"
                        value={values.email}
                        className="form-style"
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email ? (
                        <div className="errorMessage">{errors.email}</div>
                      ) : null}
                    </Row>
                    <Row>
                      <textarea
                        id="message"
                        name="message"
                        value={values.message}
                        className="form-style"
                        type="textarea"
                        rows="4"
                        placeholder="Message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.message && touched.message ? (
                        <div className="errorMessage">{errors.message}</div>
                      ) : null}
                    </Row>
                    <Row style={{}}>
                      <Col></Col>
                      <Col xs="12" sm="12" md="4">
                        <button
                          type={"submit"}
                          onClick={handleSubmit}
                          className="form-submit-btn"
                        >
                          Submit
                        </button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = {
  PostContact: (payload) => postContactList(payload),
};

export default connect(null, mapDispatchToProps)(ContactComponent);
