import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import Carousel from "react-multi-carousel";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { getProductByCategory } from "../../application/services/actions/auth";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const CategoryComponent = (props) => {
  const [product, setProduct] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
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
  useEffect(() => {
    let payload = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 1,
      search: "",
      sortDirection: "",
      sortField: "",
      category: "Standards",
    };
    props
      .getProductByCategory(payload)
      .then((res) => {
        console.log("get product res", res);
        setProduct(res.data.result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
    return () => {};
  }, []);

  useEffect(() => {
    let payload = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 1,
      search: "",
      sortDirection: "",
      sortField: "",
      category: "Metabolites",
    };
    props
      .getProductByCategory(payload)
      .then((res) => {
        console.log("get product res", res);
        setProduct(res.data.result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
    return () => {};
  }, []);

  useEffect(() => {
    let payload = {
      typeRefId: null,
      pageNumber: 1,
      pageSize: 1,
      search: "",
      sortDirection: "",
      sortField: "",
      category: "Isotope Labelled",
    };
    props
      .getProductByCategory(payload)
      .then((res) => {
        console.log("get product res", res);
        setProduct(res.data.result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
    return () => {};
  }, []);

  return (
    <Row className="section4-product align-items-center">
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
          // swipeable
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
                        {cardDetails.casNumber ? cardDetails.casNumber : " --"}
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
                        {cardDetails.casNumber ? cardDetails.casNumber : " --"}
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
                        {cardDetails.casNumber ? cardDetails.casNumber : " --"}
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
    </Row>
  );
};

const mapDispatchToProps = {
  getProductByCategory: (payloadData) => getProductByCategory(payloadData),
};
export default connect(null, mapDispatchToProps)(CategoryComponent);
