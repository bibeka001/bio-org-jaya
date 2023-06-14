import React, { useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import CorporatePic1 from "../../infrastructure/assets/images/corporate-pic1.png";
import CorporatePic2 from "../../infrastructure/assets/images/corporate-pic2.png";
import FlaskLight from "../../infrastructure/assets/images/flask_light.png";
import FinalBarComponent from "../FinalBar/FinalBarComponent";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import Carousel from "react-multi-carousel";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import QualityImage from "../../infrastructure/assets/icons/Quality Icon.svg";
import Confidential from "../../infrastructure/assets/images/confidential.png";
import TimeFrame from "../../infrastructure/assets/icons/timeframe.svg";
import Archive from "../../infrastructure/assets/icons/archive.svg";

export const CorporateComponent = () => {
  const [show, setShow] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
      name: "Quality",
      description:
        "All Product well characterized using NMR, MS and HPLC, Certificate of Analysis will be provided.",
      logo: QualityImage,
    },
    {
      id: 2,
      name: "Confidentiality",
      description: (
        <ul>
          <li>Strict confidentiality will be maintained</li>
          <li>All employees have signed the confidentiality agreement</li>
          <li>NDA is in place with all the transacting organizations</li>
        </ul>
      ),
      logo: Confidential,
    },
    {
      id: 3,
      name: "Time Frame",
      description:
        "All the products will be delivered punctually as per the agreed time schedule with constant channel of communication with clients regarding the progress of the synthesis.",
      logo: TimeFrame,
    },
    {
      id: 4,
      name: "Archive",
      description:
        "Both soft-copies and hard-copies will be preserved as per regulatory requirements.",
      logo: Archive,
    },
    {
      id: 5,
      name: "Superior Service",
      description:
        "A dedicated professional customer service team positioned to ensure customer satisfaction and technical support.",
      logo: QualityImage,
    },
  ];
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
          <h2 className="h21">State of the Art</h2>
          <h2 className="h22">laboratory in Banglore</h2>
          <h6 className="h61">
            Recognized By DSIR, Department of Biotechnologies, Department of
          </h6>
          <h6 className="h61">
            Atomic Energy, Government of India. BioOrganics lab is the only
          </h6>
          <h6 className="h61">
            laboratory in the country to have a unique collaborative
          </h6>
          <h6 className="h61">
            agreement with the Department of Atomic Energy's Heavy Water
          </h6>
          <h6 className="h61">
            Board for supply of Deuterium Oxide for Research and Development
          </h6>
          <h6 className="h61">in the Non-nuclear use of Heavy Water</h6>
        </Col>
        <Col sm={12} md={6}>
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img className="corporatimage1" src={CorporatePic1} />
          </div>
        </Col>
      </Row>
      <Row className="section2 align-items-center">
        <Col sm={12} lg={6}>
          <img className="corporatimage2" src={CorporatePic2} />
        </Col>
        <Col sm={12} lg={6}>
          <h6 className="corporateabouttext">About</h6>
          <h2 className="corporateourstorytext">Our Story</h2>
          <div>
            <p className="h61">
              BioOrganics is a leading manufacture of speciality research of
              chemicals for pharmaceutical and biomedical research. The company
              was founded by Dr.Vijaykumar Hulikal, a distinguished scientist in
              the year 2001.
            </p>
            <p className="h61">
              BioOrganics was conceptualized with Dr.Hulikal's vision of a
              seamless amalgamation of academia and industry for providing
              medicinal chemistry and organic synthetic services of the highest
              quality.
            </p>
          </div>
          <div className="h61">
            <p>
              The company has developed technologies for the manufacturers of
              Stable Isotope Labeled products, Referencen Standards,
              Metabolites, Impurities and Glucuronides among its vast array of
              20,000+ products. BioOrganics also provides custom synthesis of
              organic compounds.
            </p>
          </div>
          <div className="h61">
            <p>
              BioOrganics has championed the field of Deuterium Labelling
              Chemistry.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="section4 align-items-center">
        <Row>
          <h2 className="h25 text-center">The BioOrganics Promise</h2>
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
                  {CardList && CardList.length ? (
                    CardList.map((cardDetails) => {
                      return (
                        <Col sm={10} lg={10}>
                          <Card className="card-style">
                            {/* <Card.Body>
                              <Card.Title>{cardDetails.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">
                                {cardDetails.description}
                              </Card.Subtitle>
                              {/* <Card.Img> */}

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
                                      src={cardDetails.logo}
                                      //src={`data:image/jpeg;base64,${cardDetails.logo}`}
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
      <Row className="section5 align-items-center">
        <Row>
          <h2 className="h25 text-center">Why BioOrganics</h2>
        </Row>
        <Row className="align-center rowstyle">
          <Col className="col1style">
            <Col sm={4} md={8} lg={8}>
              <div className="col1div2 text-center">
                <h5 className="h5all">Subject Matter &nbsp; Expertise</h5>
              </div>
              <div className="coldiv">
                <p className="div1para">
                  BioOrganics is led by an acclaimed scientist with a large term
                  of organic chemists. Our chemists have year of experience in
                  the exploratory project research and collaborative R & D
                  synthesis applied in pharmaceutical and chemical industries
                </p>
              </div>
            </Col>
          </Col>
          <Col className="col1style">
            <Col sm={12} md={6}>
              <div className="col1div2 text-center">
                <h5 className="h5all">State of the Art Laboratory</h5>
              </div>
              <div className="coldiv text-center">
                <p className="div1para">
                  BioOrganics is duly recognized for its research activities by
                  various Department of the Government of India, including:
                  Department of Scientific and Industrial Research (DSIR)
                  Department of Biotechnology (DBT) Department of Atomic Energy
                  (DAE) - Heavy Water Board (HWB){" "}
                </p>
              </div>
            </Col>
          </Col>
          <Col className="col1style">
            <Col sm={12} md={6}>
              <div className="col1div2 text-center">
                <h5 className="h5all">Customer Service</h5>
              </div>
              <div className="coldiv text-center">
                <p className="div1para">
                  Our customer service team is led by technical team of expert.
                  Organic Chemists. We offer quick and comprehensive response in
                  case of sale queries and off replacement guarantee in case of
                  any issues.
                </p>
              </div>
            </Col>
          </Col>
        </Row>
      </Row>
      <FinalBarComponent />
    </Container>
  );
};

export default CorporateComponent;
