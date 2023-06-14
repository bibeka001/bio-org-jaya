import React, { useState } from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import HeaderComponent from "../Header/HeaderComponent";
import { MdOutlineCancel } from "react-icons/md";
import CategoryComponent from "./CategoryComponent";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import { IoFilterSharp } from "react-icons/io5";
import { getProductById } from "../../application/services/actions/auth";
import { useLocation } from "react-router-dom";
const DetailPage = (props) => {
  const location = useLocation();
  const { state } = location;
  console.log("state?.productDetail", state?.productDetail);
  let finalProductInfo = state?.productDetail?.productDetails
    ? JSON.parse(state?.productDetail?.productDetails)
    : {};
  console.log(":location", state);

  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // console.log("props.route", props.route);
  // console.log("route data", data);

  // const apiHandler = async (productID) => {
  //   props
  //     .getProductById(productID)
  //     .then((res) => {
  //       console.log("api res", res);
  //     })
  //     .catch((error) => {
  //       console.log("api error", error);
  //     });
  // };
  console.log(":productDetails", finalProductInfo);

  return (
    <Container fluid className="main-product">
      <Col className="navbar-section" xs={10} md={12} lg={12}>
        <HeaderComponent />
        {show ? (
          <Modal setShow={setShow}>
            {" "}
            <h3
              style={{
                textAlign: "center",
                padding: "1rem",
                color: "#a3238e",
                fontWeight: "bold",
              }}
            >
              Are you sure?
            </h3>
            <p
              style={{
                textAlign: "center",
                position: "absolute",
                top: "4rem",
                left: "2rem",
                fontWeight: "bold",
              }}
            >
              You Want to leave the site?
            </p>
            <div className="d-flex justify-content-between align-items-center mx-5">
              <button
                style={{
                  position: "absolute",
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
              >
                YES
              </button>
              <button
                style={{
                  position: "absolute",
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
          </Modal>
        ) : null}
      </Col>
      <Col className="web-closer-setion text-end" xs={12} md={12} lg={12}>
        <MdOutlineCancel
          type="button"
          className="closeButton"
          onClick={() => setShow((p) => !p)}
          size={"30px"}
        />
      </Col>
      <Row className="section1-product align-items-center"></Row>
      <Row className="section2-detail align-items-center">
        <Col sm={12} md={6}>
          <div className="search-results-box">
            <IoFilterSharp size={10} className="filter-icon" />
            <div className="vl" />
            <div>
              <h4
                className="h2"
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "#a3238e",
                }}
              >
                {finalProductInfo?.["Chemical Name"]
                  ? finalProductInfo?.["Chemical Name"]
                  : "--"}
              </h4>
              <h3 className="h3" style={{ fontSize: "15px" }}>
                Home/ Search Result /{" "}
                {finalProductInfo["Chemical Name"]
                  ? finalProductInfo["Chemical Name"]
                  : "--"}
              </h3>{" "}
            </div>
          </div>{" "}
          <Col sm={12} lg={8} className="d-flex">
            <Col className="ml-2" style={{ marginRight: "5rem" }}>
              <p className="detail-product-name">
                {finalProductInfo?.["Chemical Name"]
                  ? finalProductInfo?.["Chemical Name"]
                  : "--"}
              </p>
              <div className="image-div-detail">
                <p
                  style={{
                    fontWeight: "bold",
                    marginLeft: "4rem",
                    marginTop: "1rem",
                  }}
                >
                  Molecular Diagram
                  <img
                    src={
                      finalProductInfo?.img_url
                        ? finalProductInfo?.img_url
                        : "--"
                    }
                  />
                </p>
              </div>
            </Col>
            <Col>
              <p className="detail-category">
                {finalProductInfo?.Category ? finalProductInfo?.Category : "--"}
              </p>
              <p className="details">
                Synonyms :{" "}
                {finalProductInfo?.Synonyms ? finalProductInfo?.Synonyms : "--"}
              </p>
              <p className="details">
                CAS Number :{" "}
                {finalProductInfo["CAS Number"]
                  ? finalProductInfo["CAS Number"]
                  : "--"}
              </p>
              <p className="details">
                CAT Number :{" "}
                {finalProductInfo["Catalogue Number"]
                  ? finalProductInfo["Catalogue Number"]
                  : "--"}
              </p>
              <p className="details">
                Molecular Formula :{" "}
                {finalProductInfo["Molecular Formula"]
                  ? finalProductInfo["Molecular Formula"]
                  : "--"}
              </p>
              <p className="details">
                Molecular Weight :{" "}
                {finalProductInfo["Molecular Weight"]
                  ? finalProductInfo["Molecular Weight"]
                  : "--"}
              </p>{" "}
              <p className="details">
                Appearance :{" "}
                {finalProductInfo?.Appearance
                  ? finalProductInfo?.Appearance
                  : "--"}
              </p>
              <p className="details">
                Purity :{" "}
                {finalProductInfo?.Purity ? finalProductInfo?.Purity : "--"}
              </p>
              <p className="details">
                Storage Condition :{" "}
                {finalProductInfo?.Storage ? finalProductInfo?.Storage : "--"}
              </p>
              <p className="details">
                Solubility:{" "}
                {finalProductInfo?.Solubility
                  ? finalProductInfo?.Solubility
                  : "--"}
              </p>
              <input className="quantity-box" placeholder="Quality in Mg*" />
              <label className="checkbox">
                <input
                  type="checkbox"
                  className="check-btn"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <p className="Draft">Draft&nbsp;COA</p>
                <span className={`check ${isChecked ? "checked" : ""}`}></span>
              </label>
              <button className="detail-button">Add to Enquiry</button>
            </Col>
          </Col>
        </Col>
      </Row>
      <Row className="section3-details"></Row>
      <CategoryComponent />
      <FinalBarComponent />
    </Container>
  );
};

export default DetailPage;
