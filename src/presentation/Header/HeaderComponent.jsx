import React, { useState } from "react";
import BioOrganicLogo from "../../infrastructure/assets/images/bio-logo.png";
import { BsSearch } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchModal from "../../infrastructure/components/SearchModal";
import { getListOfProduct } from "../../application/services/actions/auth";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function HeaderComponent(props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedproduct] = useState(null);
  const [allProductList, setAllProductList] = useState([]);
  const navigate = useNavigate();
  const searchApiCall = async (value) => {
    console.log("value", value);
    const payload = {
      pageNumber: 1,
      pageSize: 100,
      search: value,
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
    console.log("payload", payload);
    setStatus(true);
    props
      .getListOfProduct(payload)
      .then((res) => {
        setStatus(false);
        setShow(true);
        console.log("get search production res", res);
        setAllProductList(res?.data?.result ? res?.data?.result : []);
      })
      .catch((error) => {
        setStatus(false);
        setShow(false);
        setAllProductList([]);
        console.log("allproduct", allProductList);
        console.log("get search product error", error);
        toast.error(error?.reason || "No Match Found!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <>
      <Navbar expand="xl" className="navbar mx-2" sticky="top" collapseOnSelect>
        <Container fluid xm={6} sm={8} lg={10} xl={10} xxl={12}>
          <Navbar.Brand href="#home">
            <Row className="align-items-center">
              <Col xs={2} md={2} lg={2}>
                <img
                  className="bio-logo "
                  src={BioOrganicLogo}
                  alt="BioOrganicLogo"
                />
              </Col>
              <Col xs={10} md={10} lg={10} xl={12}>
                <span
                  style={{
                    fontSize: "32px",
                    color: "#a3238e",
                    marginLeft: "1px",
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  BioOrganics
                </span>
              </Col>
            </Row>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" expand="lg">
            <Col sm={6} lg={12} xl={12} xxl={12}>
              <Row className="justify-content-end w-100">
                <Col xs="12" sm="10" md="6" lg="6">
                  <div className="search-container justify-content-end position-relative">
                    <AiOutlineQuestionCircle size={28} className="info-btn" />
                    <input
                      className="search-box"
                      placeholder="Enter CAT#,CAS#,Chemical Name or Mol Formula"
                      onChange={(e) => {
                        setSelectedproduct(null);
                        setSearch(e.target.value),
                          e.target.value.length >= 3
                            ? searchApiCall(e.target.value)
                            : setShow(false);
                      }}
                      value={selectedProduct ? selectedProduct : search}
                    />
                    <BsSearch
                      size={25}
                      className="search-btn"
                      onClick={() => {
                        searchApiCall(search);
                        console.log("search read data", search);
                      }}
                    />
                  </div>
                  {show ? (
                    <SearchModal setShow={setShow}>
                      {status ? (
                        <ScaleLoader
                          color="#a3238e"
                          height={"1rem"}
                          style={{ marginRight: "40rem" }}
                        />
                      ) : null}
                      <div style={{ textAlign: "left" }}>
                        {allProductList && allProductList.length ? (
                          allProductList.map((item) => {
                            return (
                              <div>
                                <h11
                                  onClick={() => {
                                    setSelectedproduct(item.chemicalName);
                                    navigate("/detailpage", {
                                      state: {
                                        productDetail: item,
                                      },
                                    });
                                    setShow(false);
                                    console.log(
                                      "search data",
                                      setSelectedproduct(item.chemicalName)
                                    );
                                  }}
                                >
                                  {item.chemicalName}
                                </h11>
                              </div>
                            );
                          })
                        ) : (
                          <h3>No Record Found!</h3>
                        )}
                      </div>
                    </SearchModal>
                  ) : null}
                </Col>
              </Row>
              <Row className="justify-content-end">
                <Col xs={12} sm="10" md="8" lg="7" xxl={12}>
                  <Nav className="d-flex align-items-center justify-content-around">
                    <Nav.Link
                      as={NavLink}
                      to="/"
                      exact
                      className="header-btn mx-1 text-center"
                    >
                      Home
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/corporate"
                      exact
                      className="header-btn mx-1 text-center"
                    >
                      Corporate
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/services"
                      exact
                      className="header-btn mx-1 text-center z"
                    >
                      Services
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/contact"
                      exact
                      className="header-btn mx-1 text-center"
                    >
                      Contact
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/products"
                      exact
                      className="header-btn mx-1 text-center"
                    >
                      Products
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/login"
                      exact
                      className="header-btn mx-1 text-center "
                    >
                      Log In
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/enquirylist"
                      exact
                      className="header-btn-enq mx-1 text-center"
                      style={{ color: "#a3238e", fontWeight: "bold" }}
                    >
                      Enquiry List
                    </Nav.Link>
                  </Nav>
                </Col>
              </Row>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

// export default HeaderComponent;
const mapStateToProps = ({ authReducer: { getProductList } }) => ({
  getProductList,
});
const mapDispatchToProps = {
  getListOfProduct: (payloadData) => getListOfProduct(payloadData),
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
