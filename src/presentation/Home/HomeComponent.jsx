import React from "react";
import SheImage from "../../infrastructure/assets/images/she.png";
import She2Image from "../../infrastructure/assets/images/she2.png";
import SolutionImage from "../../infrastructure/assets/images/solution.png";
import HeaderComponent from "../Header/HeaderComponent";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import BioOrganicLogo from "../../infrastructure/assets/images/translogo.png";
import Location from "../../infrastructure/assets/images/location2.jpg";
import CustomCard from "../../infrastructure/components/Card/CustomCard";
import Carousel from "react-multi-carousel";
import { NavLink, useNavigate } from "react-router-dom";
import { getCertificateList } from "../../application/services/actions/auth";
import { getLatestProduct } from "../../application/services/actions/auth";
import { getCategoryList } from "../../application/services/actions/auth";
import { connect } from "react-redux";
import certificateimg from "../../infrastructure/assets/images/certificate.png";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const HomeComponent = (props) => {
  const [show, setShow] = useState(false);
  const [certificateList, setCertificateList] = useState([]);
  const [latestProductList, setLatestProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  let navigate = useNavigate();

  console.log("props", props);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  let CardList = [
    {
      id: 1,
      name: "name",
      description: "desc",
    },
  ];

  const init = () => {
    const payload = {
      pageNumber: 1,
      pageSize: 3,
      search: "",
      sortField: "",
      sortDirection: "",
      filterName: "",
      filterValue: "",
      multipleFilters: [
        {
          filterName: "",
          filterValue: 0,
        },
      ],
    };

    props
      .getCertificateList(payload)
      .then((res) => {
        console.log("get certificate res", res);
        setCertificateList(res?.data?.result || []);
      })
      .catch((error) => {
        console.log("get certificate list error", error);
      });

    const payloads = {
      pageNumber: "1",
      pageSize: "10",
      search: "",
      sortDirection: "",
      sortField: "",
    };
    props
      .getLatestProduct(payloads)
      .then((res) => {
        console.log("get product res", res);
        setLatestProductList(res?.data?.result || []);
      })
      .catch((error) => {
        console.log("get product list error", error);
      });

    const result = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 3,
      search: "",
      sortDirection: "",
      sortField: "",
    };
    props
      .getCategoryList(result)
      .then((res) => {
        console.log("get category res", res);
        setCategoryList(res?.data?.result || []);
      })
      .catch((error) => {
        console.log("get category list error", error);
      });
  };

  const CustomButtonGroup = ({ next, previous }) => (
    <div className="custom-button-group">
      <BsFillArrowLeftSquareFill
        onClick={previous}
        // style={{ color: "#710060", marginRight: "5px" }}
        size={"20px"}
        className="LeftArrowIcon"
      />
      <BsFillArrowRightSquareFill
        onClick={next}
        // style={{ color: "#710060", marginLeft: "5px" }}
        size={"20px"}
        className="LeftArrowIcon"
      />
    </div>
  );

  useEffect(() => {
    init();
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Container fluid className="main">
      <Row className="w-100">
        <Col
          className="navbar-section web-closer-setion text-end"
          xs={12}
          md={12}
          lg={12}
        >
          <HeaderComponent />
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
                You Want to leave the site?
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
        </Col>
      </Row>

      <Row className="section1 align-items-center">
        <Col sm={12} md={6}>
          <h2 className="h21">Trusted Manufacturer of</h2>
          <h2 className="h22">Speciality Research</h2>
          <h2 className="h22">Chemicals</h2>
          <h6 className="h61">Reference Standards, Impurities, Metabolities</h6>
          <h6 className="h61">Glucuronides and Isotope Labeled Compounds</h6>
          <button
            className="btn"
            onClick={() => {
              navigate("/contact");
            }}
          >
            Get in Touch
          </button>
        </Col>
        <Col sm={12} md={6}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="sheimage" src={SheImage} />
          </div>
        </Col>
      </Row>
      <Row className="section2  align-items-center">
        <Col sm={12} lg={3}>
          <h6 className="h62">Our</h6>
          <h2 className="h23">Latest Products</h2>
          <button
            className="btn"
            onClick={() => {
              navigate("/products");
            }}
          >
            Show More
          </button>
        </Col>
        <Col sm={12} lg={9} className="p-3">
          <Row className="d-flex d-row ProductContainer">
            <Carousel
              additionalTransfrom={0}
              arrows={false}
              className="productCarousel"
              containerClass="my-carousel"
              customButtonGroup={<CustomButtonGroup />}
              itemClass="productCard"
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside
              responsive={responsive}
            >
              {latestProductList && latestProductList.length ? (
                latestProductList.map((cardDetails) => {
                  return (
                    <Col>
                      <Card>
                        <Card.Body>
                          {cardDetails.productImage
                            ? cardDetails.productImage
                            : "--"}
                          <p
                            style={{
                              color: "#f6913a",
                              fontWeight: "bold",
                              marginLeft: "19rem",
                              marginTop: "-1rem",
                              fontSize: "22px",
                            }}
                          >
                            NEW
                          </p>
                          <Card.Title
                            style={{
                              color: "#f6913a",
                              marginLeft: "10rem",
                              fontWeight: "bold",
                              fontSize: "18px",
                            }}
                          >
                            {cardDetails.chemicalName
                              ? cardDetails.chemicalName
                              : " --"}
                          </Card.Title>
                          <Card.Text>
                            <p
                              style={{
                                marginLeft: "7rem",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              Molecular Formula :{" "}
                              {cardDetails.molecularFormula
                                ? cardDetails.molecularFormula
                                : " --"}
                            </p>
                          </Card.Text>
                          <Card.Text>
                            <p
                              style={{
                                marginLeft: "8rem",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              CAS Number :{" "}
                              {cardDetails.casNumber
                                ? cardDetails.casNumber
                                : "--"}
                            </p>
                          </Card.Text>
                          {/* {cardDetails.logo
                          ? cardDetails.logo
                          : "No Image Found"} */}
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })
              ) : (
                <div>
                  <h1>No Records Found!!</h1>
                </div>
              )}
            </Carousel>
          </Row>
        </Col>
      </Row>
      <Row className="section3 align-items-center">
        <Col sm={12} md={6}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="sheimage2" src={She2Image} />
          </div>
        </Col>
        <Col sm={12} md={6} className="">
          <h6 className="h62">About</h6>
          <h2 className="h24">Sub Heading</h2>
          <h6 className="h61">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            quo.
          </h6>
          <button className="btn">Know More</button>
        </Col>
      </Row>
      <Row className="section4  align-items-center">
        <Col sm={12} lg={4}>
          <h6 className="h62">Area of expertise</h6>
          <h2 className="h23">product categories</h2>
          <h6 className="h61">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            quo.
          </h6>
          <button
            className="btn"
            onClick={() => {
              navigate("/products");
            }}
          >
            Show More
          </button>
        </Col>
        <Col sm={12} lg={8}>
          <Row className="d-flex d-row">
            {categoryList && categoryList.length ? (
              categoryList.map((cardDetails) => {
                return (
                  <Col>
                    <Card className="category-card">
                      <Card.Body
                      // style={{
                      //   fontWeight: "bold",
                      //   fontSize: "15px",
                      //   textAlign: "center",
                      //   alignItems:"center",
                      //   height:"7rem"
                      // }}
                      >
                        {cardDetails.categoryName
                          ? cardDetails.categoryName
                          : "--"}
                      </Card.Body>
                      <button
                        className="check-btn"
                        onClick={() => {
                          console.log("slected card", cardDetails);
                          navigate("/products", {
                            state: { catagoryName: cardDetails?.categoryName },
                          })
                        }}
                      >
                        Check
                      </button>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <div>
                <h1>No Records Found!!</h1>
              </div>
            )}
          </Row>
        </Col>
      </Row>
      <Row className="section5 align-items-center" sm={12} lg={11}>
        <Row>
          <h2 className="h25 text-center mb-5">
            Certificates of accreditations
          </h2>
        </Row>
        <Row className="justify-content-center">
          <Col>
            <Row className="d-flex d-row ">
              <div
                style={{
                  position: "relative",
                }}
              >
                <Carousel
                  additionalTransfrom={0}
                  arrows={false}
                  className="productCarousel"
                  containerClass="my-carousel"
                  customButtonGroup={<CustomButtonGroup />}
                  itemClass="productCard"
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside
                  responsive={responsive}
                >
                  {certificateList && certificateList.length ? (
                    certificateList.map((cardDetails) => {
                      return (
                        <Col sm={10} lg={10}>
                          <Card className="certificate-card">
                            <Card.Body>
                              <Card.Title
                                style={{
                                  textAlign: "center",
                                  color: "#a3238e",
                                  fontWeight: "bold",
                                }}
                              >
                                {cardDetails.name ? cardDetails.name : " --"}
                              </Card.Title>
                              <Row>
                                <Col sm={2} lg={4}>
                                  {cardDetails.logo ? (
                                    <img
                                      //src={certificateimg}
                                      src={`data:image/jpeg;base64,${cardDetails.logo}`}
                                    />
                                  ) : (
                                    <h6>No Image Found</h6>
                                  )}
                                </Col>
                                <Col
                                  style={{
                                    textAlign: "left",
                                    fontSize: "12px",
                                  }}
                                >
                                  <Card.Text>
                                    {cardDetails.description
                                      ? cardDetails.description
                                      : " --"}
                                  </Card.Text>
                                  <button className="certificate-btn">
                                    View Certificate
                                  </button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })
                  ) : (
                    <div>
                      <h1>No Records Found!!</h1>
                    </div>
                  )}
                </Carousel>
              </div>
            </Row>
          </Col>
        </Row>
      </Row>
      <FinalBarComponent />
    </Container>
  );
};

// const mapStateToProps = ({ authReducer: { getCertificateList } }) => ({
//   getCertificateList,
// });
const mapDispatchToProps = {
  getCertificateList: (payload) => getCertificateList(payload),
  getLatestProduct: (payloads) => getLatestProduct(payloads),
  getCategoryList: (result) => getCategoryList(result),
};
export default connect(null, mapDispatchToProps)(HomeComponent);
