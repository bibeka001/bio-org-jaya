import React, { useEffect, useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import { IoFilterSharp } from "react-icons/io5";
//import Modal from "../../infrastructure/components/Modal";
import { MdOutlineCancel } from "react-icons/md";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import Productcard from "../../infrastructure/components/ProductCard/Productcard";
import { getListOfProduct } from "../../application/services/actions/auth";
import { getProductByCategory } from "../../application/services/actions/auth";
import { getCategoryList } from "../../application/services/actions/auth";
import { connect } from "react-redux";
import Carousel from "react-multi-carousel";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import CategoryComponent from "./CategoryComponent";
import { useLocation, useNavigate } from "react-router-dom";

export const ProductsComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("product screen routes", location);
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState(false);
  const [productList, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

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
  const catagoryList = () => {
    let payload = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 10,
      search: "",
      sortDirection: "",
      sortField: "",
      category: location?.state?.catagoryName
        ? location?.state?.catagoryName
        : "",
    };
    console.log("location?.state?.catagoryName", location?.state?.catagoryName);
    console.log("catagoryList payload", payload);
    props
      .getCategoryList(payload)
      .then((res) => {
        console.log("get category res", res);
        setCategoryList(res?.data?.result || []);
      })
      .catch((error) => {
        console.log("get category list error", error);
      });
  };
  const productListApi = () => {
    let payload = {
      pageNumber: 1,
      pageSize: 3,
      search: "",
      sortField: "",
      sortDirection: "",
      category: "",
    };
    props
      .getListOfProduct(payload)
      .then((res) => {
        console.log("get product res", res);
        setProductList(res.data.result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
  };
  const ProductByCatagory = (catagory) => {
    // setProductList([]);
    let payload = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 6,
      search: "",
      sortDirection: "",
      sortField: "",
      category: catagory ? catagory : "Standards",
    };
    console.log("payload", payload);
    props
      .getProductByCategory(payload)
      .then((res) => {
        console.log("get product res", res);
        setProductList(res.data.result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
  };
  useEffect(() => {
    ProductByCatagory();
    productListApi();
    catagoryList();

    return () => {};
  }, []);

  const handleDisplay = () => setDisplay(false);
  const handleClose = () => setShow(false);

  return (
    <Container fluid className="main-product">
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
      <Row className="section1-product align-items-center"></Row>
      <Row className="section2-product align-items-center">
        <Col sm={12} md={12}>
          <div className="search-results-box">
            <IoFilterSharp
              type="button"
              className="filter-icon"
              onClick={() => setDisplay((p) => !p)}
            />
            <Modal
              show={display}
              onHide={handleDisplay}
              backdrop="static"
              size="sm"
              centered
              className="p-4 display-modal"
            >
              <Modal.Body className="m-3">
                {categoryList && categoryList.length ? (
                  categoryList.map((list) => {
                    return (
                      <div
                        onClick={() => {
                          ProductByCatagory(list.categoryName);
                          setDisplay(false);
                        }}
                      >
                        <h6>{list.categoryName}</h6>
                      </div>
                    );
                  })
                ) : (
                  <h6>No List Found</h6>
                )}
                {/* {cardDetails.categoryName
                        ? cardDetails.categoryName
                        : "--"} */}
              </Modal.Body>
            </Modal>
            {/* );
              }) */}

            <div className="vl" />
            <div>
              <h4
                className="h2"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                Search Results
              </h4>
              <h3 className="h3" style={{ fontSize: "15px" }}>
                <h6>"20" results found for "category name"</h6>
              </h3>
            </div>
          </div>
          {/* <Col sm={12} lg={8} className="d-flex">
            <Row>
              {productList.map((cardlist) => {
                return (
                  <Col className="box ml-2" style={{ marginRight: "5rem" }}>
                    <Productcard data={cardlist} />
                  </Col>
                );
              })}
            </Row>
          </Col> */}
          <div className="productCardList">
            <Row>
              {productList.map((cardlist, index) => {
                return (
                  <Col
                    md={4}
                    lg={4}
                    sm={4}
                    xs={12}
                    key={index}
                    // style={{ backgroundColor: "red" }}
                  >
                    <div style={{ marginTop: "20px" }}>
                      <Productcard data={cardlist} />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
      {/* <Row className="section4-product align-items-center">
        <Col>
          <p className="para">Working Standards</p>
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-padding-bottom"
            customButtonGroup={<CustomButtonGroup />}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {product && product.length ? (
              product.map((cardDetails) => {
                return (
                  <Col sm={12} lg={4}>
                    <Card className="custom-card-category">
                      <Card.Body>
                        <Card.Title>
                          {cardDetails?.chemicalName
                            ? cardDetails.chemicalName
                            : " --"}
                        </Card.Title>
                        <div className="card-div">
                          {cardDetails.productImage
                            ? cardDetails.productImage
                            : "No Image Found"}
                        </div>
                        <h6 className="text">
                          Molecular Formula :
                          {cardDetails.molecularFormula
                            ? cardDetails.molecularFormula
                            : ""}
                        </h6>
                        <h6 className="text">
                          CAS Number :
                          {cardDetails.casNumber
                            ? cardDetails.casNumber
                            : " --"}
                        </h6>
                        <Row>
                          <Col>
                            <button className="product-button">
                              More Details
                            </button>
                          </Col>
                          <Col>
                            <button className="product-button">
                              Add to Enquiry
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
        </Col>
        <Col>
          <p className="para">Isotope Labelled</p>
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-padding-bottom"
            customButtonGroup={<CustomButtonGroup />}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {product && product.length ? (
              product.map((cardDetails) => {
                return (
                  <Col sm={12} lg={4}>
                    <Card className="custom-card-category">
                      <Card.Body>
                        <Card.Title>
                          {cardDetails?.chemicalName
                            ? cardDetails.chemicalName
                            : " --"}
                        </Card.Title>
                        <div className="card-div">
                          {cardDetails.productImage
                            ? cardDetails.productImage
                            : "No Image Found"}
                        </div>
                        <h6 className="text">
                          Molecular Formula :
                          {cardDetails.molecularFormula
                            ? cardDetails.molecularFormula
                            : ""}
                        </h6>
                        <h6 className="text">
                          CAS Number :
                          {cardDetails.casNumber
                            ? cardDetails.casNumber
                            : " --"}
                        </h6>
                        <Row>
                          <Col>
                            <button className="product-button">
                              More Details
                            </button>
                          </Col>
                          <Col>
                            <button className="product-button">
                              Add to Enquiry
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
        </Col>
        <Col>
          <p className="para">Metabolites</p>
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass="container-padding-bottom"
            customButtonGroup={<CustomButtonGroup />}
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {product && product.length ? (
              product.map((cardDetails) => {
                return (
                  <Col sm={12} lg={4}>
                    <Card className="custom-card-category">
                      <Card.Body>
                        <Card.Title>
                          {cardDetails?.chemicalName
                            ? cardDetails.chemicalName
                            : " --"}
                        </Card.Title>
                        <div className="card-div">
                          {cardDetails.productImage
                            ? cardDetails.productImage
                            : "No Image Found"}
                        </div>
                        <h6 className="text">
                          Molecular Formula :
                          {cardDetails.molecularFormula
                            ? cardDetails.molecularFormula
                            : ""}
                        </h6>
                        <h6 className="text">
                          CAS Number :
                          {cardDetails.casNumber
                            ? cardDetails.casNumber
                            : " --"}
                        </h6>
                        <Row>
                          <Col>
                            <button className="product-button">
                              More Details
                            </button>
                          </Col>
                          <Col>
                            <button className="product-button">
                              Add to Enquiry
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
        </Col>
      </Row> */}
      <CategoryComponent />
      <FinalBarComponent />
    </Container>
  );
};

// const mapStateToProps = (
//   { authReducer: { getProductList } },
//   { authReducer: { getProductByCategory } }
// ) => ({
//   getProductList,
//   getProductByCategory,
// });
const mapDispatchToProps = {
  getListOfProduct: (payloadData) => getListOfProduct(payloadData),
  getProductByCategory: (payloadData) => getProductByCategory(payloadData),
  getCategoryList: (payloadData) => getCategoryList(payloadData),
};
export default connect(null, mapDispatchToProps)(ProductsComponent);
