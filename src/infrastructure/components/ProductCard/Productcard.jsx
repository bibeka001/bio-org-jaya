import React from "react";
import { useState } from "react";
import { Card, Col, Row, Nav, Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const Productcard = (props) => {
  const [show, setShow] = useState(false);
  const { data } = props;
  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div>
      <Row>
        <Col sm={12} lg={12}>
          <Card className="custom-card mt-5">
            <Card.Body>
              <Card.Title>
                <span className="titleName">
                  {data?.chemicalName ? data.chemicalName : " --"}
                </span>
              </Card.Title>
              <div className="card-div">
                {data.productImage ? data.productImage : "No Image Found"}
              </div>
              <div className="text-center">
                <h6 className="text">
                  Molecular Formula :
                  {data.molecularFormula ? data.molecularFormula : ""}
                </h6>
                <h6 className="text">
                  CAS Number :{data.casNumber ? data.casNumber : " --"}
                </h6>
              </div>
              <Row className="text-center">
                <Col>
                  <button
                    className="product-button"
                    onClick={() => {
                      navigate("/detailpage", { state: data });
                    }}
                  >
                    More Details
                  </button>
                </Col>
                <Col>
                  <button
                    className="product-button"
                    onClick={() => setShow({ state: data })}
                    // onClick={() => {
                    //   navigate("/enquirypage", { state: data });
                    // }}
                  >
                    Add to Enquiry
                  </button>
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
                          fontSize: "20px",
                        }}
                      >
                        {data?.chemicalName ? data.chemicalName : " --"}
                      </h3>
                      <p
                        style={{
                          textAlign: "center",
                          top: "4rem",
                          left: "2rem",
                          fontWeight: "bold",
                        }}
                      >
                        CAT Number: {data?.casNumber ? data.casNumber : " --"}
                      </p>
                      <label>
                        <input
                          type="checkbox"
                          // checked={isChecked}
                          // onChange={handleCheckboxChange}
                        />
                        <p>Single Quantity</p>
                        {/* <span
                          className={`check ${isChecked ? "checked" : ""}`}
                        ></span> */}
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          //className="check-btn"
                          // checked={isChecked}
                          // onChange={handleCheckboxChange}
                        />
                        <p>Multiple Quantity</p>
                        {/* <span
                          className={`check ${isChecked ? "checked" : ""}`}
                        ></span> */}
                      </label>
                      <input
                        style={{
                          backgroundColor: "#f6f6f6",
                          border: "2px solid #f7f7f7",
                          height: "3rem",
                          width: "15rem",
                          borderRadius: "13px",
                          marginTop: "3rem",
                        }}
                        placeholder="Quality in Mg*"
                      />
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          className="check-btn"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                        />
                        <p className="Draft-card">Draft&nbsp;COA</p>
                        <span
                          className={`check ${isChecked ? "checked" : ""}`}
                        ></span>
                      </label>
                      <button
                        type={"submit"}
                        className="add-btn"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Add
                      </button>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Productcard;
