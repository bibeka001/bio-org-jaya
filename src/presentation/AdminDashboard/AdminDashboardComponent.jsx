import React, { useState, useEffect } from "react";
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
import { Link, NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { IoPersonCircle } from "react-icons/io5";
import { Form } from "react-bootstrap";
import { GiSettingsKnobs } from "react-icons/gi";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Table, ITableProps, kaReducer, useTable } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
//import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { connect } from "react-redux";
import {
  getListOfProduct,
  deleteListOfProductList,
} from "../../application/services/actions/auth";
import SearchModal from "../../infrastructure/components/SearchModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function AdminDashboardComponent(props) {
  const [search, setSearch] = useState("");
  const [allProductList, setAllProductList] = useState([]);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [showlatest, setShowlatest] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [show1, setShow1] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedproduct] = useState(null);
  const [selectedProductDelete, setSelectedproductDelete] = useState(null);
  const [selectedCheckBox, setSelectedCheckBox] = useState(null);
  const rowPropsGetter = (rowData, rowIndex) => {
    console.log("rowData", rowData);
    if (rowIndex % 2 === 0) {
      return { className: "edit-button" };
    }
    return { className: "edit-button" };
  };
  //const [showTooltip, setShowTooltip] = useState(false);

  const columns = [
    { key: "catalogId", title: "CAT#", style: { textAlign: "center" } },
    { key: "casNumber", title: "CAS#", style: { textAlign: "center" } },
    {
      key: "chemicalName",
      title: "CHEMICAL NAME",
      style: { textAlign: "center" },
    },
    {
      key: "OPTIONS",
      title: "OPTIONS",
      dataType: DataType.String,
      style: { textAlign: "center" },
    },
    {
      key: "ADD_TO_LATEST",
      title: "ADD TO LATEST",
      style: { textAlign: "center" },
      dataType: DataType.Boolean,
      editor: false,
    },
    {
      key: "VISIBILITY",
      title: "VISIBILITY",
      style: { textAlign: "center" },
      dataType: DataType.Boolean,
      editor: false,
    },
  ];

  const init = async () => {
    const payload = {
      pageNumber: 1,
      pageSize: 100,
      search: "",
      sortField: "",
      sortDirection: "",
      filterName: "",
      filterValue: "",
      category: "",
      multipleFilters: [
        {
          filterName: "",
          filterValue: 0,
        },
      ],
    };
    setStatus(true);
    props
      .getListOfProduct(payload)
      .then((res) => {
        setStatus(false);

        console.log("get production res", res);
        setAllProductList(res?.data?.result ? res?.data?.result : []);
      })
      .catch((error) => {
        setStatus(false);
        setAllProductList([]);
        console.log("get product error", error);
      });
  };

  useEffect(() => {
    init();
  }, []);
  console.log("selectedCheckBox", selectedCheckBox);
  const deleteProduct = async (productId) => {
    const payload = {
      productIds: [productId],
    };
    console.log("productid", productId);
    console.log("payload", payload);
    // setStatus(true)
    // props
    //   .getListOfProduct(payload)
    //   .then((res) => {
    // setStatus(false)
    //     console.log("get production res", res);
    //     init();
    //     //setAllProductList(res?.data?.result ? res?.data?.result : []);
    //   })
    //   .catch((error) => {
    //     console.log("get product error", error);
    //   });
  };
  const searchApiCall = async (value) => {
    console.log("value", value);
    const payload = {
      pageNumber: 1,
      pageSize: 10,
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
    <Container fluid className="main-div-admin" sm={6} lg={12}>
      <Row
        className="navbar-admin align-items-center d-flex d-row"
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
            }}
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
      <Row className="sec1 align-items-center">
        <Row>
          <Col md={8} sm={4} lg={6}>
            <div className="d-flex d-row">
              <AiOutlineQuestionCircle size={28} className="info-btn-admin" />
              <input
                className="search-box-admin"
                placeholder="Enter CAT#,CAS#,Chemical Name or Mol Formula"
                onChange={(e) => {
                  // console.log("e.t", e.target.value);
                  setSelectedproduct(null);
                  setSearch(e.target.value),
                    e.target.value.length >= 3
                      ? searchApiCall(e.target.value)
                      : (setShow(false), init());
                }}
                value={selectedProduct ? selectedProduct : search}
                // value="dhanya"
                contentEditable
              />
              <BsSearch
                size={25}
                className="search-btn-admin"
                onClick={() => {
                  searchApiCall(search);
                }}
              />
            </div>
            {show ? (
              <SearchModal setShow={setShow}>
                {status ? (
                  <ScaleLoader
                    color="#a3238e"
                    height={"1rem"}
                    style={{ marginLeft: "20rem" }}
                  />
                ) : null}
                <div style={{}}>
                  {allProductList && allProductList.length ? (
                    allProductList.map((item) => {
                      return (
                        <div>
                          <h11
                            onClick={() => {
                              setSelectedproduct(item.chemicalName);
                              setShow(false);
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
          <Col md={4} sm={12} className="d-flex d-row">
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              {/* <Link to="/AddNewProduct" >
                Add New
              </Link> */}
              <button
                className="addnew-btn mx-1 text-center"
                onClick={() => {
                  navigate("/AddNewProduct", {
                    state: { screen: "Add New" },
                  });
                }}
              >
                Add New Product
              </button>
            </Row>
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              {/* <Link to="/AddNewProduct" >
                Add New
              </Link> */}
              <button
                className="cat-btn mx-1 text-center"
                onClick={() => {
                  navigate("/category");
                }}
              >
                Category List
              </button>
            </Row>
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Link
                //   to="/"
                className="update-btn mx-1 text-center"
                onClick={() => {
                  setShowlatest(!showlatest);
                }}
              >
                Update
              </Link>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          {/* {status ? <ScaleLoader color="#a3238e" height={"1rem"} style={{ marginLeft:"25rem",marginTop:"50rem",zIndex:"90" }}/> : null} */}

          <Modal
            show={show1}
            //onHide={handleClose}
            backdrop="static"
            size="sm"
            centered
            className="p-2"
          >
            <Modal.Body className="m-1">
              <h5
                style={{
                  textAlign: "center",
                  // padding: "1rem",
                  color: "#a3238e",
                  fontWeight: "bold",
                }}
              >
                Are you sure you want to delete?
              </h5>
              <Row>
                <Col
                  style={{
                    textAlign: "center",
                  }}
                >
                  <h6
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Chemical Name:
                  </h6>
                  {selectedProductDelete?.chemicalName
                    ? selectedProductDelete?.chemicalName
                    : "--"}
                  <h6
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    CAT Number:
                  </h6>
                  {selectedProductDelete?.catalogId
                    ? selectedProductDelete?.catalogId
                    : "--"}

                  <h6
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    CAS Number:
                  </h6>
                  {selectedProductDelete?.casNumber
                    ? selectedProductDelete?.casNumber
                    : "--"}

                  <h6
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Inventory Status:
                  </h6>
                  {selectedProductDelete?.catalogId
                    ? selectedProductDelete?.catalogId
                    : "--"}
                </Col>
              </Row>

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
                  onClick={() => {
                    deleteProduct(selectedProductDelete?.id);
                    setShow1(false);
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
                  onClick={() => setShow1(false)}
                >
                  NO
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={showlatest}
            //onHide={handleClose}
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
                Update the selected to latest products
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
                  onClick={() => {
                    setshowUpdateConfirm(!showUpdateConfirm)
                      ? setShowlatest(true)
                      : setShowlatest(false);
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
                  onClick={() => setShowlatest(false)}
                >
                  NO
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Modal
            show={showUpdateConfirm}
            //onHide={handleClose}
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
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Successfull!
              </h3>
              <p
                style={{
                  textAlign: "center",

                  top: "4rem",
                  left: "2rem",
                  fontWeight: "bold",
                }}
              >
                Updated Successfully
              </p>
              {/* <div><h6></h6></div> */}
              <div className="d-flex justify-content-between align-items-center mx-5">
                <button
                  style={{
                    //top: "8rem",
                    //left: "10rem",
                    marginLeft: "2rem",
                    alignItems: "center",
                    borderRadius: "18px",
                    height: "2rem",
                    width: "4rem",
                    fontSize: "11px",
                    border: "1.5px solid black",
                    background: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => setshowUpdateConfirm(false)}
                >
                  Close
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Table
            columns={columns}
            data={allProductList}
            rowKeyField={"id"}
            rowPropsGetter={rowPropsGetter}
            renderEditCell={() => {
              console.log("fjkdsjf");
            }}
            noData={{
              text: "No Data Found",
            }}
            // sortingMode={SortingMode.Single}
            paging={{
              enabled: true,
              pageSize: 10,
              pageIndex: 0,
            }}
            childComponents={{
              rootDiv: {
                elementAttributes: () => ({
                  style: { backgroundColor: "#f7f7f7", borderRadius: "25px" },
                }),
              },
              dataRow: {
                elementAttributes: (rowData, rowIndex) => ({
                  // className: rowData.rowData.id ? "even-row" : "odd-row",
                  onClick: (event, extendedEvent) => {
                    console.log("fire", rowData.rowData);
                  },
                }),
              },
              // dataRow: {
              //   elementAttributes: (e) => ({
              //     onClick: (event, extendedEvent) => {
              //       console.log("fire",e.rowData)
              //     },
              //   }),
              // },
              cell: {
                content: ({ column, rowData }) => {
                  switch (column?.key) {
                    case "ADD_TO_LATEST":
                      return (
                        <input
                          type="checkbox"
                          name={column.key}
                          id={column.title}
                          onClick={() => {}}
                        />
                      );
                    case "VISIBILITY":
                      return (
                        <input
                          type="checkbox"
                          name={column.key}
                          id={column.title}
                          onClick={() => {}}
                        />
                      );
                    case "OPTIONS":
                      const [showToolTip, setShowToolTip] = useState(false);
                      //const [status, setStatus] = useState(false);
                      const [show, setShow] = useState(false);
                      const handleButtonClick = () => {
                        setShowToolTip(!showToolTip);
                        setTimeout(() => {
                          setShowToolTip(false);
                        }, 6000); // Duration in milliseconds
                      };

                      return (
                        <div>
                          <OverlayTrigger
                            show={showToolTip}
                            placement="bottom"
                            overlay={
                              <Tooltip className="tooltip-custom">
                                <Row
                                  className="options-button"
                                  onClick={() => {
                                    console.log("fire edit");
                                    navigate("/AddNewProduct", {
                                      state: { data: rowData, screen: "Edit" },
                                    });
                                  }}
                                >
                                  <Col>Edit</Col>
                                  <Col>
                                    <MdEdit size={25} />
                                  </Col>
                                </Row>
                                <Row
                                  className="options-button"
                                  onClick={() => {
                                    console.log("fire delete", rowData);
                                    setSelectedproductDelete(rowData);

                                    setShow1(!show1);
                                  }}
                                >
                                  <Col>Delete</Col>
                                  <Col>
                                    <MdDeleteForever size={25} />
                                  </Col>
                                </Row>
                              </Tooltip>
                            }
                          >
                            <button
                              className="options-button"
                              //variant="primary"
                              onClick={handleButtonClick}
                              // style={{
                              //   border: "none",
                              //   backgroundColor: "transparent",
                              // }}
                            >
                              <GiSettingsKnobs
                                size="15px"
                                style={{ transform: "rotate(90deg)" }}
                              />
                            </button>
                          </OverlayTrigger>
                        </div>
                      );
                  }
                },
              },
            }}
          />
        </Row>
      </Row>
    </Container>
  );
}

const mapStateToProps = ({ authReducer: { getProductList } }) => ({
  getProductList,
});
const mapDispatchToProps = {
  getListOfProduct: (payloadData) => getListOfProduct(payloadData),
  deleteListOfProductList: (payloadData) =>
    deleteListOfProductList(payloadData),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboardComponent);
