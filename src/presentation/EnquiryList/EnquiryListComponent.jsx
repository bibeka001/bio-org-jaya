import React, { useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import { MdEdit, MdOutlineCancel } from "react-icons/md";
import { CgClose } from "react-icons/cg";
// import Modal from "../../infrastructure/components/Modal";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { useFormik } from "formik";
import AddListItem from "./components/AddListItem";
import { connect } from "react-redux";
import { postEnquiryList } from "../../application/services/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
const ValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .nullable()
    .required("Name is required."),
  email: yup.string().nullable().email().required("Email is required."),
  phoneNumber: yup
    .string()
    .matches(/^\S*$/, "Space is not allowed")
    .min(10, "Number should not be less than 10 Digit")
    .max(10, "Number should not be more than 10 Digit")
    .matches(/(?=.*?\d)^\$?(([1-9]\d{0,9}))?$/, "Only number allowed")
    .matches(
      /^[^!@#$%^&*()\"/?'=+{}; :,<.>]*$/,
      "Special character is not allowed"
    )
    .typeError("That doesn't look like a phone number")
    .required(`PhoneNumber is required`),
  companyName: yup.string().nullable().required("CompanyName is required."),
});
export const EnquiryListComponent = (props) => {
  const [show, setShow] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [SelectedItem, setSelectedItem] = useState("");
  const [enquiryList, setEnquiryList] = useState([]);
  const formHandler = async () => {
    const payload = {
      id: "",
      fullName: values.fullName,
      emailId: values.email,
      phoneNumber: values.phoneNumber,
      companyName: values.companyName,
      compounds: enquiryList.map((item) => {
        return {
          compoundName: item.compound.value,
          mg: item.mg,
          isDraftCOA: item.isInterMediate,
        };
      }),
    };
    console.log("first,", payload);
    toast.info("res.message.message", {
      position: toast.POSITION.TOP_RIGHT,
    });

    await props
      .PostEnquiryList(payload)
      .then((res) => {
        toast.success(res.message.message || "Success", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const OnChangeHandler = (fieldName, e) => {
    setFieldValue(fieldName, e.target.value);
  };
  const RemovedHandler = (item) => {
    setShowRemoveModal(false);
    setShow(false);
    let itemIndex = enquiryList.filter(
      (filterItem) => filterItem.mg !== item.mg
    );
    setEnquiryList(itemIndex);
  };
  const { handleSubmit, setFieldValue, values, touched, errors } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      companyName: "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (value) => formHandler(value),
    validationSchema: ValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
  });

  const updateEnquiryList = (item, newData = {}) => {
    setEnquiryList([
      ...enquiryList.map((el) => {
        if (el?.compound?.id === item?.compound?.id && el?.mg === item?.mg) {
          el = { ...el, ...newData };
          return el;
        } else {
          return el;
        }
      }),
    ]);
    console.log("enquiryList", enquiryList);
  };

  const handleClose = () => {
    setShowRemoveModal(false);
    setShow(false);
  };

  return (
    <>
      <Container fluid className="main">
        <Col className="navbar-section" xs={10} md={12} lg={12}>
          <HeaderComponent />
        </Col>
        <Col className="web-closer-setion text-end" xs={12} md={12} lg={12}>
          <MdOutlineCancel
            type="button"
            className="modal-close-button"
            onClick={() => setShow((p) => !p)}
          />
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            size="sm"
            centered
            className="p-4"
          >
            <Modal.Body className="m-3">
              <h3
                style={{
                  textAlign: "center",
                  // padding: "1rem",
                  color: "#a3238e",
                  fontWeight: "bold",
                }}
              >
                Leave the Site?
              </h3>
              <p
                style={{
                  textAlign: "center",

                  top: "4rem",
                  left: "2rem",
                  fontWeight: "bold",
                }}
              >
                Submit enquiry before Leaving
              </p>
              <div className="d-flex justify-content-between align-items-center mx-5">
                <button
                  style={{
                    top: "8rem",
                    left: "2rem",
                    borderRadius: "18px",
                    height: "2rem",
                    width: "4rem",
                    fontSize: "11px",
                    border: "1.5px solid black",
                    background: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => {}}
                >
                  YES
                </button>
                <button
                  style={{
                    top: "8rem",
                    left: "11rem",
                    borderRadius: "18px",
                    height: "2rem",
                    width: "4rem",
                    fontSize: "11px",
                    border: "1.5px solid black",
                    background: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => setShow(false)}
                >
                  NO
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={showRemoveModal}
            onHide={handleClose}
            backdrop="static"
            size="sm"
            centered
            className="p-4"
          >
            <Modal.Body className="m-3">
              <h3
                style={{
                  textAlign: "center",
                  // padding: "1rem",
                  color: "#a3238e",
                  fontWeight: "bold",
                }}
              >
                Are you sure?
              </h3>
              <p
                style={{
                  textAlign: "center",

                  top: "4rem",
                  left: "2rem",
                  fontWeight: "bold",
                }}
              >
                You Want to remove this product from enquiry
              </p>
              <div className="d-flex justify-content-between align-items-center mx-5">
                <button
                  style={{
                    top: "8rem",
                    left: "2rem",
                    borderRadius: "18px",
                    height: "2rem",
                    width: "4rem",
                    fontSize: "11px",
                    border: "1.5px solid black",
                    background: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => RemovedHandler(SelectedItem)}
                >
                  YES
                </button>
                <button
                  style={{
                    top: "8rem",
                    left: "11rem",
                    borderRadius: "18px",
                    height: "2rem",
                    width: "4rem",
                    fontSize: "11px",
                    border: "1.5px solid black",
                    background: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => setShowRemoveModal(false)}
                >
                  NO
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </Col>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Row className="section1 align-items-center ">
          <Row className="section1 align-items-center">
            <Col sm={12} md={12} lg={7}>
              <Row className="mb-5 pb-5" style={{ height: 300 }}>
                {enquiryList && enquiryList?.length ? (
                  <div style={{ justifyContent: "flex-start" }}>
                    <NavLink to="/products">
                      <h1
                        className="header-btn-enq"
                        style={{
                          color: "#a3238e",
                          fontWeight: "bold",
                          width: "30%",
                        }}
                      >
                        Resume Browsing
                      </h1>
                    </NavLink>
                  </div>
                ) : null}
                <Col xs="12" className="mostly-customized-scrollbar">
                  <div className="mostly-customized-scrollbar-inner">
                    {enquiryList && enquiryList?.length ? (
                      enquiryList?.map(
                        (item, index) => (
                          console.log("item", item),
                          (
                            <Row
                              key={item?.compund?.id || index}
                              style={{
                                backgroundColor: "#ffffff",
                                borderRadius: "10px",
                                minHeight: "40px",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: index > 0 ? "10px" : 0,
                                marginRight: "3px",
                              }}
                            >
                              <Col
                                style={{
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div>
                                  <span style={{ marginBottom: 0 }}>
                                    {item?.compound?.value}
                                  </span>
                                </div>
                              </Col>
                              <Col>
                                <div
                                  onMouseEnter={() => {
                                    updateEnquiryList(item, {
                                      showEdit: true,
                                    });
                                    console.log("hgs");
                                  }}
                                  onMouseLeave={() => {
                                    updateEnquiryList(item, {
                                      showEdit: false,
                                    });
                                    console.log("removed");
                                  }}
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100px",
                                  }}
                                >
                                  {item.showEdit && item.readOnly ? (
                                    <button
                                      className="edit_btn"
                                      onClick={() => {
                                        updateEnquiryList(item, {
                                          showEdit: false,
                                          readOnly: false,
                                        });
                                      }}
                                    >
                                      Edit <MdEdit />
                                    </button>
                                  ) : (
                                    <input
                                      type="number"
                                      name="edit_mg"
                                      className="form-control "
                                      pattern="/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{4})*)|\d+)?(\.\d{1,2})?$/"
                                      required={true}
                                      maxLength={4}
                                      value={`${item.mg}`}
                                      readOnly={item.readOnly}
                                      onChange={(e) => {
                                        updateEnquiryList(item, {
                                          mg: e.currentTarget.value,
                                        });
                                      }}
                                      onBlur={() => {
                                        updateEnquiryList(item, {
                                          showEdit: false,
                                          readOnly: true,
                                        });
                                      }}
                                    />
                                  )}
                                </div>
                              </Col>
                              <Col numCol={2} className="col-w-select ">
                                {/* <input
                                  style={{
                                    float: "left",
                                    borderColor: "red",
                                    border: "3px",
                                  }}
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={(e) => {
                                    updateEnquiryList(item, {
                                      isInterMediate: e.currentTarget.checked,
                                    });
                                  }}
                                />
                                <span
                                  className={
                                    String(currentlyClicked) !==
                                    String(item[idField])
                                      ? "l-collapse-icon"
                                      : "l-expand-icon"
                                  }
                                >
                                  &nbsp;
                                </span> */}
                                <input
                                  className="check-input-label Draft-style"
                                  style={
                                    {
                                      // float: "left",
                                      // borderColor: "red",
                                      // backgroundColor: "black",
                                      // border: "3px",
                                    }
                                  }
                                  id={item?.compound?.id}
                                  type="checkbox"
                                  checked={item?.isInterMediate}
                                  onChange={(e) => {
                                    updateEnquiryList(item, {
                                      isInterMediate: e.currentTarget.checked,
                                    });
                                  }}
                                  // className="check-input"
                                />
                                <label
                                  htmlFor={item?.compound?.id}
                                  className="check-input-label Draft-style ms-2"
                                >
                                  Draft COA
                                </label>
                              </Col>
                              <Col xs={1} md={1} lg={1}>
                                <CgClose
                                  type="button"
                                  onClick={() => {
                                    setShowRemoveModal(true);
                                    setSelectedItem(item);
                                  }}
                                />
                              </Col>
                            </Row>
                          )
                        )
                      )
                    ) : (
                      <h2 className="list-text text-center">
                        Your list is empty
                      </h2>
                    )}
                  </div>
                </Col>
              </Row>

              <AddListItem
                setEnquiryList={setEnquiryList}
                enquiryList={enquiryList}
              />
            </Col>
            <Col sm={12} md={12} lg={5}>
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    display: "flex",
                    flexDirection: "column",
                    width: "60%",
                  }}
                >
                  <h2 className="h21">Fill the form to</h2>
                  <h2 className="h22">get the Quote</h2>
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    name="fullName"
                    value={values.fullName}
                    className="input-style"
                    placeholder="Full Name"
                    onChange={(e) => {
                      OnChangeHandler("fullName", e);
                    }}
                  />

                  {errors.fullName && touched.fullName ? (
                    <div className="errorMessage">{errors.fullName}</div>
                  ) : null}
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    name="email"
                    value={values.email}
                    className="input-style"
                    placeholder="Mail ID"
                    onChange={(e) => {
                      OnChangeHandler("email", e);
                    }}
                  />
                  {errors.email && touched.email ? (
                    <div className="errorMessage">{errors.email}</div>
                  ) : null}
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    className="input-style"
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={values.phoneNumber}
                    onChange={(e) => {
                      OnChangeHandler("phoneNumber", e);
                    }}
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div className="errorMessage">{errors.phoneNumber}</div>
                  ) : null}
                </div>
                <div
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <input
                    className="input-style"
                    placeholder="Company Name"
                    name="companyName"
                    value={values.companyName}
                    onChange={(e) => {
                      OnChangeHandler("companyName", e);
                    }}
                  />
                  {errors.companyName && touched.companyName ? (
                    <div className="errorMessage">{errors.companyName}</div>
                  ) : null}
                </div>

                <div
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <button
                    className="submit-button"
                    type={"submit"}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  PostEnquiryList: (payload) => postEnquiryList(payload),
};

export default connect(null, mapDispatchToProps)(EnquiryListComponent);
