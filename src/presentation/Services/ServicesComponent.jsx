import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  InputGroup,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import SheImg from "../../infrastructure/assets/images/chemist_her.png";
import Flask from "../../infrastructure/assets/images/flask_light.png";
import FlaskDark from "../../infrastructure/assets/images/flask_dark.png";
import HeaderComponent from "../Header/HeaderComponent";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import AnalyticalIcon from "../../infrastructure/assets/icons/analytical service.svg";
import CustomIcon from "../../infrastructure/assets/icons/custom synthesis.svg";
import RDIcon from "../../infrastructure/assets/icons/rnd.svg";
import MoleculeIcon from "../../infrastructure/assets/icons/small molecule.svg";
import FTEIcon from "../../infrastructure/assets/icons/fte service.svg";
import ProcessIcon from "../../infrastructure/assets/icons/process-development.svg";
//import Modal from "../../infrastructure/components/Modal";
import BioOrganicLogo from "../../infrastructure/assets/images/translogo.png";
import { MdOutlineCancel } from "react-icons/md";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { postContactList } from "../../application/services/actions/auth";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .nullable()
    .required("Name is required."),
  email: yup.string().nullable().email().required("Email is required."),
  message: yup.string().nullable().required("Message is required."),
});
const ServicesComponent = (props) => {
  const [show, setShow] = useState(false);
  const sidebar = [
    { type: "Custom Synthesis", img: CustomIcon },
    { type: "Analytical Services", img: AnalyticalIcon },
    { type: "Contract R & D", img: RDIcon },
    { type: "Small Molecule Manufacturing", img: MoleculeIcon },
    { type: "FTE Services", img: FTEIcon },
    { type: "Process Development", img: ProcessIcon },
  ];

  const content = [
    {
      type: "Custom Synthesis",
      data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
      type: "Analytical Services",
      data: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      type: "Contract R & D",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    },
    {
      type: "Small Molecule Manufacturing",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    },
    {
      type: "FTE Services",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    },
    {
      type: "Process Development",
      data: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of ",
    },
  ];

  const [validated, setValidated] = useState(false);
  const formHandler = async (value) => {
    const payload = {
      id: "",
      fullName: value.fullName,
      emailId: value.email,
      message: value.message,
    };
    toast.info("Pending...", {
      position: toast.POSITION.TOP_RIGHT,
    });

    await props
      .PostContact(payload)
      .then((res) => {
        console.log("res>>", res);
        toast.success(res?.message?.message || "Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        handleReset();
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const {
    handleSubmit,
    handleReset,
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
    validationSchema: validationSchema,
    validateOnMount: true,
    validateOnChange: true,

    onSubmit: (values) => formHandler(values),
  });

  const [info, setInfo] = useState(content[0]);
  const handleClose = () => setShow(false);

  const onClickHandler = (item) => {
    const temp = content.find((it) => it.type === item.type);
    setInfo(temp);
  };

  return (
    <Container fluid className="main-service">
      <Col className="navbar-section" xs={10} md={12} lg={12}>
        <HeaderComponent />
      </Col>
      <Col className="web-closer-section text-end" xs={12} md={12} lg={12}>
        <MdOutlineCancel
          type="button"
          className="closeButton"
          onClick={() => setShow((p) => !p)}
          size={"30px"}
        />
      </Col>
      <Row className="section-service align-items-center">
        <Col sm={12} md={6}>
          <h1 style={{ fontSize: "37px", marginLeft: 100, fontWeight: "bold" }}>
            Best in class
          </h1>
          <h2
            style={{
              fontSize: "40px",
              color: "#a3238e",
              fontWeight: "bold",
              marginLeft: 100,
            }}
          >
            Customer Service
          </h2>
          <div
            className="py-3 d-block align-items-left"
            style={{
              width: "60%",
              marginLeft: 100,
            }}
          >
            <p style={{ textAlign: "justify" }}>
              We offer a wide range of Services to meet the diverse needs of our
              clients.Our services are tailored to meet the unique requirements
              of each individual client and help them achieve their goals.We
              strive to exceed expectationsand build long-term relationships
              with our clients.
            </p>
          </div>
        </Col>
        {/* <div style={{ flex: 1, display: "flex" }}>
            <img className="sheimg" src={SheImg} />
          </div> */}
        <Col sm={12} md={6}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="sheimage" src={SheImg} />
          </div>
        </Col>
      </Row>
      <div className="second-div-services">
        <h1
          style={{
            fontWeight: "bold",

            color: "#a3238e",

            paddingLeft: "10rem",

            paddingTop: "0.5rem",
          }}
        >
          We assist our clients in different ways.
        </h1>

        <div className="service-options-box py-3 d-block align-items-center">
          <h2
            style={{
              color: "#a3238e",

              marginLeft: "17rem",

              fontWeight: "bold",

              marginTop: "3rem",

              fontSize: "25px",
            }}
          >
            {info.type}
          </h2>

          <p
            style={{
              marginLeft: "4rem",

              marginTop: "2rem",

              fontSize: "15px",

              textAlign: "justify",
            }}
          >
            {info.data}
          </p>
        </div>

        <img className="flaskimg1" src={Flask} />

        <img className="flaskimg2" src={Flask} />

        <img className="flaskimg3" src={Flask} />

        <div
          style={{
            marginTop: "11rem",

            backgroundColor: "white",

            width: "15%",

            position: "sticky",

            //padding: "10px 27px 10px 4px",
          }}
        >
          {sidebar.map((item, index) => {
            return (
              <div
                key={index}
                className="d-flex justify-content-center align-items-center"
                onClick={() => onClickHandler(item)}
                style={{
                  backgroundImage:
                    info.type === item.type
                      ? "linear-gradient(to left, #f6913a, #a3238e)"
                      : "",

                  padding: "3px 27px 3px 4px",

                  marginBottom: "10px",

                  cursor: "pointer",
                }}
              >
                <img className="icon-img px-2 me-1" src={item.img} />

                <span
                  style={{
                    color: info.type === item.type ? "white" : "#a3238e",
                  }}
                  className="options-box"
                >
                  {item.type}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Col xs="12" sm="12" md="12">
        <Row className="align-items-center justify-content-center w-100 form-div">
          <Col xs="12" sm="12" md="6">
            <div className="">
              <h1
                className="form-text-div mt-0 text-center"
                style={{ color: "#a3238e" }}
              >
                Have any queries? Write to us
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
                    <Row
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignContent: "center",
                      }}
                    >
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
      </Col>
      <FinalBarComponent />
    </Container>
  );
};
const mapDispatchToProps = {
  PostContact: (payload) => postContactList(payload),
};

export default connect(null, mapDispatchToProps)(ServicesComponent);
