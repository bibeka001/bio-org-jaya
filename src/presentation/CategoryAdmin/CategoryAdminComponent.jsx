import React,{ useState, useEffect } from 'react'
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    Tooltip,
    OverlayTrigger,
    Button,
    Modal,
  } from "react-bootstrap";
import BioOrganicLogo from "../../infrastructure/assets/images/bio-logo.png";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { IoPersonCircle } from "react-icons/io5";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Table, ITableProps, kaReducer, useTable } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
//import SearchModal from "../../infrastructure/components/SearchModal";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CategoryAdminComponent() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedProduct, setSelectedproduct] = useState(null);
  return (
    <Container fluid className="main-div-cat" sm={6} lg={12}>
    <Row
      className="navbar-cat align-items-center d-flex d-row"
      sm={6}
      lg={12}
    >
      <Col xs={4} md={4} lg={7} style={{ paddingLeft: "5rem" }}>
        <img className="bio-logo" src={BioOrganicLogo} alt="BioOrganicLogo" />
        <span
          style={{
            fontSize: "35px",
            color: "#a3238e",
            //marginTop: "5px",
            cursor:"pointer"
          }}
          onClick={()=>{navigate("/AdminDashboard")}}
        >
          {" "}
          BioOrganics
        </span>
      </Col>
      <Col xs={8} md={8} lg={1} style={{ paddingLeft: "5.5rem" }}>
        <IoPersonCircle size={45} />
      </Col>
      <Col xs={8} md={8} lg={4} className="align-items-right">
        <Row>
          <h5
            style={{
              color: "#a3238e",
              fontWeight: "bold",
              marginRight: "80px",
            }}
          >
            Hello Admin,
          </h5>
        </Row>

        <Row>
          <h5 style={{ color: "grey", fontWeight: "bold" }}>
            Welcome back!!
          </h5>
        </Row>
      </Col>
    </Row>
    <Row className="sec-cat align-items-center">
        <Col className="d-flex">
            {/* <Link to="/AddNewProduct" >
              Add New
            </Link> */}
            <button
              className="addcat-btn mx-1 text-center"
              onClick={() => {
                // navigate("/AddNewProduct", {
                //   state: { screen: "Add New" },
                // });
              }}
            >
              Add New Category
            </button>
     
          </Col>
          <Col >
            <button
              //   to="/"
              className="update-btn mx-1 text-center"
              onClick={() => {
                //setShowlatest(!showlatest);
              }}
            >
              Update
          </button>
        </Col>
      </Row>
      </Container>
  );
}

export default CategoryAdminComponent
