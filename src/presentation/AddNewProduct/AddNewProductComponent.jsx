import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import BioOrganicLogo from "../../infrastructure/assets/images/bio-logo.png";
import { IoPersonCircle } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsUpload } from "react-icons/bs";
import { useFormik } from "formik";
import SearchModal from "../../infrastructure/components/SearchModal";
import ScaleLoader from "react-spinners/ScaleLoader";
import {
  getListOfProduct,
  imgUpload,
} from "../../application/services/actions/auth";

import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function AddNewProductComponent(props) {
  const location = useLocation();
  const productInformation = location?.state?.data
    ? JSON.parse(location?.state?.data?.productDetails)
    : {};
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [isEditProductName, setIsEditProductName] = useState(
    location?.state?.screen === "Add New" ? false : true
  );
  const [isEditInventoryInformation, setIsEditInventoryInformation] = useState(
    location?.state?.screen === "Add New" ? false : true
  );
  const [isEditWorkingStandard, setIsEditWorkingStandard] = useState(
    location?.state?.screen === "Add New" ? false : true
  );
  const [allProductList, setAllProductList] = useState([]);
  const [status, setStatus] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  console.log("productInformation", productInformation);
  console.log("location", location);

  const handleClosePreview = () => {
    setSelectedImage(null);
  };
  console.log("selectedImage", selectedImage);
  const formik = useFormik({
    initialValues: {
      id: selectedProduct?.id
        ? selectedProduct?.id
        : location?.state?.data?.id
        ? location?.state?.data?.id
        : "",
      ProductName: selectedProduct?.chemicalName
        ? selectedProduct?.chemicalName
        : location?.state?.data?.chemicalName
        ? location?.state?.data?.chemicalName
        : "",
      CAT: selectedProduct?.catalogId
        ? selectedProduct?.catalogId
        : location?.state?.data?.catalogId
        ? location?.state?.data?.catalogId
        : "",
      InventoryStatus: location?.state?.screen === "Add New" ? "" : "In-Stock",
      Category: selectedProductDetails?.Category
        ? selectedProductDetails?.Category
        : productInformation?.Category
        ? productInformation?.Category
        : "",
      Synonym: selectedProductDetails?.Synonyms
        ? selectedProductDetails?.Synonyms
        : productInformation?.Synonyms
        ? productInformation?.Synonyms
        : "",
      CAS: selectedProduct?.casNumber
        ? selectedProduct?.casNumber
        : location?.state?.data?.casNumber
        ? location?.state?.data?.casNumber
        : "",
      MolecularFormula: selectedProduct?.molecularFormula
        ? selectedProduct?.molecularFormula
        : location?.state?.data?.molecularFormula
        ? location?.state?.data?.molecularFormula
        : "",
      MolecularWeight: selectedProduct?.molecularWeight
        ? selectedProduct?.molecularWeight
        : location?.state?.data?.molecularWeight
        ? location?.state?.data?.molecularWeight
        : "",
      Appearance: selectedProductDetails?.Appearance
        ? selectedProductDetails?.Appearance
        : productInformation?.Appearance
        ? productInformation?.Appearance
        : "",
      Purity: selectedProductDetails?.Purity
        ? selectedProductDetails?.Purity
        : productInformation?.Purity
        ? productInformation?.Purity
        : "",
      Storage: selectedProductDetails?.Storage
        ? selectedProductDetails?.Storage
        : productInformation?.Storage
        ? productInformation?.Storage
        : "",
      Solubilty: selectedProductDetails?.Solubility
        ? selectedProductDetails?.Solubility
        : productInformation?.Solubility
        ? productInformation?.Solubility
        : "",
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (formData) => formHandler(formData),
    // validationSchema,
  });
  const productImageUpload = (base64) => {
    const id = formik.values.id;
    const payload = {
      image: base64,
    };
    console.log("payload",payload)
    props
      .uploadProductImage(id, payload)
      .then((res) => {
        console.log("product image upload res", res);
      })
      .catch((error) => {
        console.log("product image upload error", error);
      });
  };

  const formHandler = (formData) => {
    const payload = {
      id: selectedProduct?.id
        ? selectedProduct?.id
        : location?.state?.data?.id
        ? location?.state?.data?.id
        : "",
      // createdId: 0,
      // createdDate: "",
      // updatedId: 0,
      // updatedDate: "",
      catalogId: formData.CAT ? formData.CAT :"",
      casNumber: formData.CAS ? formData.CAS : "",
      molecularFormula:formData.MolecularFormula ? formData.MolecularFormula : "",
      molecularWeight: formData.MolecularWeight ? formData.MolecularWeight :"",
      chemicalName: formData.ProductName ? formData.ProductName :"",
      synonyms: formData.Synonym ? formData.Synonym :"",
      category: formData.Category ? formData.Category :"",
      InventoryStatus:formData.InventoryStatus ? formData.InventoryStatus :"",
      addToLatest: true,
      productDetails: {
        catalogId: formData.CAT ? formData.CAT :"",
        casNumber: formData.CAS ? formData.CAS :"",
        molecularFormula: formData.MolecularFormula ? formData.MolecularFormula :"",
        molecularWeight: formData.MolecularWeight ? formData.MolecularWeight :"",
        chemicalName: formData.ProductName ? formData.ProductName :"",
        synonyms: formData.Synonym ? formData.Synonym :"",
        productImage:formData.CAS ? formData.CAS : "",
        category: formData.Category ? formData.Category :"",
        Applications: "",
        References:"",
        Purity:formData.Purity ? formData.Purity :"",
        Storage:formData.Storage ? formData.Storage :"",
        Solubility:formData.Solubility ? formData.Solubility :"",
      },
    };
    console.log("formdata", formData);
    console.log("payload", payload);
    // setStatus(true);
    // props
    //   .getListOfProduct(payload)
    //   .then(() => {
    //     console.log("api response->");
    //     setStatus(false);
    //   })
    //   .catch((error) => {
    //     console.log("api calling failed->", error);
    //     setStatus(false);
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
      // multipleFilters: [
      //   {
      //     filterName: "",
      //     filterValue: 0,
      //   },
      // ],
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
        toast.error(error?.reason || "No Match Found!!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.log("get search product error", error);
      });
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        console.log("fire");
        productImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log("selectedProduct", selectedProduct);
  return (
    <Container fluid className="main-div-add" sm={6} md={8} lg={12}>
      <Row
        className="navbar-add align-items-center d-flex d-row"
        sm={6}
        lg={12}
      >
        <Col xs={4} md={4} lg={7} style={{ paddingLeft: "5rem" }}>
          <img
            className="bio-logo-add"
            src={BioOrganicLogo}
            alt="BioOrganicLogo"
          />
          <span
            style={{
              fontSize: "35px",
              color: "#a3238e",
              cursor:"pointer"
              //marginTop: "5px",
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
      <Row className="sec1-add align-items-center">
        <Row>
          <Col md={8} sm={12}>
            <div className="search-container d-flex d-row">
              <AiOutlineQuestionCircle size={28} className="info-btn-add" />
              <input
                className={!show ? "search-box-add" : "search-box-add"}
                placeholder="Enter CAT#,CAS#,Chemical Name or Mol Formula"
                onChange={(e) => {
                  console.log("e.t", e.target.value);
                  setSearch(e.target.value);
                  setSelectedProduct(null);
                  e.target.value.length >= 3
                    ? (setShow(true), searchApiCall(e.target.value))
                    : setShow(false);
                }}
                value={
                  selectedProduct?.chemicalName
                    ? selectedProduct?.chemicalName
                    : search
                }
              />
              <BsSearch size={25} className="search-btn-add" />
            </div>
            {show ? (
              <SearchModal setShow={setShow}>
                <div
                  style={
                    {
                      //   border: "1px solid #a3238e",
                      //   justifyContent: "center",
                      //   height: "15rem",
                      //   borderBottomLeftRadius: "10px",
                      //   borderBottomRightRadius: "10px",
                      //   backgroundColor: "white",
                      //   overflow: "scroll",
                    }
                  }
                >
                  {allProductList && allProductList.length ? (
                    allProductList.map((item) => {
                      return (
                        <div
                          onClick={() => {
                            let ProductDetails =
                              JSON.parse(item?.productDetails) || {};
                            setSelectedProductDetails(ProductDetails);
                            setSelectedProduct(item);
                            setShow(false);
                          }}
                        >
                          <h6>
                            {item?.chemicalName ? item?.chemicalName : "--"}
                          </h6>
                        </div>
                      );
                    })
                  ) : (
                    <h6>Product not found!</h6>
                  )}
                </div>
              </SearchModal>
            ) : null}
          </Col>
          <Col md={4} sm={12} className="d-flex d-row">
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              {/* <button
                //   to="/"
                className="addnew-btn mx-1 text-center" onClick={()=>{
                  navigate("/AddNewProduct", {
                    state: {  screen: "Add New" },
                  })}}
                
              >
                Add New
              </button> */}
            </Row>

            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <button
                //   to="/"
                className="update-btn mx-1 text-center"
              >
                Update
              </button>
            </Row>
          </Col>
        </Row>
      </Row>
      <Row style={{ backgroundColor: "#f7f7f7" }} sm={8} md={8} lg={8}>
        <Row>
          <div className="d-flex d-row">
            <Row sm={4} md={4} lg={4}>
              <div>
                {/* <MdOutlineModeEditOutline
                  size={35}
                  className="prodname-box-edit"
                  onClick={() => {
                    setIsEditProductName(!isEditProductName);
                  }}
                /> */}
                <input
                  type="text"
                  style={{
                    color: "#a3238e",
                    fontSize: "25px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  className="prodname-box mt-3"
                  placeholder="Add New Product Name"
                  disabled={isEditProductName}
                  value={formik.values.ProductName}
                  onChange={formik.handleChange("ProductName")}
                  autoFocus
                />
              </div>
            </Row>
          </div>
        </Row>
        <Row sm={8} md={8} lg={10}>
          <Modal
            show={showUpdate}
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
                You Want to update the product?
              </p>
              {/* <div><h6></h6></div> */}
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
                    setShowUpdateConfirm(!showUpdateConfirm)
                      ? setShowUpdate(true)
                      : setShowUpdate(false);
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
                  onClick={() => setShowUpdate(false)}
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
                  onClick={() => setShowUpdateConfirm(false)}
                >
                  Close
                </button>
              </div>
            </Modal.Body>
          </Modal>
          <Col>
            <div className="img-upload">
              {" "}
              <h6 style={{ paddingLeft: "1rem", paddingTop: "1rem" }}>
                Molecular Diagram
              </h6>
              {selectedImage ? (
                <div>
                  <h3 style={{ fontSize: "1rem", marginLeft: "1rem" }}>
                    Preview:
                  </h3>
                  <div
                    style={{
                      // border: "1px solid #ccc",
                      // borderRadius: "4px",
                      // padding: "10px",
                      // marginBottom: "10px",
                      display: "flex",
                      // flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor: "#ccc",
                    }}
                  >
                    <img
                      src={selectedImage}
                      alt="Preview"
                      style={{ maxWidth: "7rem", maxHeight: "7rem" }}
                    />
                    <button onClick={handleClosePreview}>Close</button>
                  </div>
                </div>
              ) : (
                <BsUpload size={55} className="upload-img" />
              )}
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ padding: "1rem 1px 6px 50px" }}
              />
            </div>
            <Row className="align-items-center">
              <h3
                className="mt-5 "
                style={{ marginLeft: "8rem", fontWeight: "bold" }}
              >
                Inventory Information
                {/* <MdOutlineModeEditOutline
                  size={45}
                  style={{ paddingLeft: "1rem" }}
                  onClick={() => {
                    setIsEditInventoryInformation(!isEditInventoryInformation);
                  }}
                /> */}
              </h3>
              <Col>
                <div className="txt-style">
                  <h6>CAT Number:</h6>
                  <div className="txt-style" style={{ marginLeft: "0.1rem" }}>
                    <h6>Inventory Status:</h6>
                  </div>
                </div>
              </Col>
              <Col>
                <form>
                  <Row>
                    {isEditInventoryInformation ? (
                      <h6 style={{ marginTop: "1.5rem" }}>
                        {formik.values.CAT || "--"}
                      </h6>
                    ) : (
                      <input
                        id="CAT"
                        name="CAT"
                        type="text"
                        onChange={formik.handleChange("CAT")}
                        value={formik.values.CAT}
                        placeholder="Enter the CAT Number"
                        className="txt-box-std mt-4"
                        disabled={isEditInventoryInformation}
                        // style={{
                        //   borderRadius: "10px",
                        //   height: "2rem",
                        //   border: "transparent",
                        // }}
                      />
                    )}
                  </Row>
                  <Row>
                    {isEditInventoryInformation ? (
                      <h6 style={{ marginTop: "1.4rem" }}>
                        {formik.values.InventoryStatus || "--"}
                      </h6>
                    ) : (
                      <input
                        id="InventoryStatus"
                        name="InventoryStatus"
                        type="text"
                        onChange={formik.handleChange("InventoryStatus")}
                        value={formik.values.InventoryStatus}
                        placeholder="Enter the Inventory Status"
                        disabled={isEditInventoryInformation}
                        className="txt-box-std mt-4"
                        // style={{
                        //   borderRadius: "10px",
                        //   height: "2rem",
                        //   border: "transparent",
                        // }}
                      />
                    )}
                  </Row>
                </form>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <h3
                className="txt-style mt-4"
                style={{ marginLeft: "1rem", paddingLeft: "10px" }}
              >
                {/* {productInformation?.Category
                  ? productInformation?.Category
                  : "--"}  */}
                Product Details
                {/* <MdOutlineModeEditOutline
                  size={35}
                  style={{ marginLeft: "1rem" }}
                  onClick={() => {
                    setIsEditWorkingStandard(!isEditWorkingStandard);
                  }}
                /> */}
              </h3>
              <Col>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Category:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Category || "--"}</h6>
                    ) : (
                      <textarea
                        id="Category"
                        name="Category"
                        type="textarea"
                        rows={3}
                        cols={20}
                        onChange={formik.handleChange("Category")}
                        value={formik.values.Category}
                        placeholder="Enter the Category"
                        className="txt-box-std mt-3"
                        disabled={isEditWorkingStandard}
                        // style={{
                        //   borderRadius: "10px",
                        //   height: "5rem",
                        //   border: "transparent",
                        // //   marginTop: "2rem",
                        //   width: "25rem",
                        //padding:"1px"
                        //}}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Synonyms:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Synonym || "--"}</h6>
                    ) : (
                      <input
                        id="Synonym"
                        name="Synonym"
                        type="textarea"
                        onChange={formik.handleChange("Synonym")}
                        value={formik.values.Synonym}
                        placeholder="Enter the Synonyms"
                        className="txt-box-std mt-3"
                        disabled={isEditWorkingStandard}
                        // style={{
                        //   borderRadius: "10px",
                        //   height: "5rem",
                        //   border: "transparent",
                        // //   marginTop: "2rem",
                        //   width: "25rem",
                        //padding:"1px"
                        //}}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>CAS Number:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.CAS || "--"}</h6>
                    ) : (
                      <input
                        id="CAS"
                        name="CAS"
                        type="text"
                        onChange={formik.handleChange("CAS")}
                        value={formik.values.CAS}
                        placeholder="Enter the CAS Number"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Molecular Formula:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.MolecularFormula || "--"}</h6>
                    ) : (
                      <input
                        id="MolecularFormula"
                        name="MolecularFormula"
                        type="text"
                        onChange={formik.handleChange("MolecularFormula")}
                        value={formik.values.MolecularFormula}
                        placeholder="Enter the Molecular Formula"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Molecular Weight:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.MolecularWeight || "--"}</h6>
                    ) : (
                      <input
                        id="MolecularWeight"
                        name="MolecularWeight"
                        type="text"
                        onChange={formik.handleChange("MolecularWeight")}
                        value={formik.values.MolecularWeight}
                        placeholder="Enter the Molecular Weight"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Appearance:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Appearance || "--"}</h6>
                    ) : (
                      <input
                        id="Appearance"
                        name="Appearance"
                        type="text"
                        onChange={formik.handleChange("Appearance")}
                        value={formik.values.Appearance}
                        placeholder="Enter the Appearance"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Purity:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Purity || "--"}</h6>
                    ) : (
                      <input
                        id="Purity"
                        name="Purity"
                        type="text"
                        onChange={formik.handleChange("Purity")}
                        value={formik.values.Purity}
                        placeholder="Enter the Purity"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Storage Condition:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Storage || "--"}</h6>
                    ) : (
                      <input
                        id="Storage"
                        name="Storage"
                        type="text"
                        onChange={formik.handleChange("Storage")}
                        value={formik.values.Storage}
                        placeholder="Enter the Storage Condition"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="align-items-center">
                  <Col>
                    <div className="mt-3">
                      <h6 style={{ fontWeight: "bold" }}>Solubility:</h6>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "12px" }}>
                    {isEditWorkingStandard ? (
                      <h6>{formik.values.Solubilty || "--"}</h6>
                    ) : (
                      <input
                        id="Solubility"
                        name="Solubility"
                        type="text"
                        onChange={formik.handleChange("Solubility")}
                        value={formik.values.Solubilty}
                        placeholder="Enter the Solubility"
                        className="txt-box-std mt-4"
                        disabled={isEditWorkingStandard}
                        style={{
                          borderRadius: "10px",
                          height: "2rem",
                          border: "transparent",
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row sm={4} lg={12} className="d-flex justify-content-center">
          <Row style={{ justifyContent: "center", alignItems: "center" }}>
            <Col>
              <button
                //   to="/"
                className="footer-btn mx-3 mt-4 text-center"
                // style={{ borderRadius:"25px",backgroundColor:"transparent" }}
                onClick={
                  isEditInventoryInformation ||
                  isEditWorkingStandard ||
                  isEditProductName
                    ? () => {
                        setIsEditProductName(false),
                          setIsEditInventoryInformation(false),
                          setIsEditWorkingStandard(false);
                        //setShowUpdate(!showUpdate);
                      }
                    : formik.handleSubmit
                }
              >
                {!isEditInventoryInformation ||
                !isEditWorkingStandard ||
                !isEditProductName
                  ? "Update"
                  : "Edit"}
              </button>
            </Col>
          </Row>

          {!isEditInventoryInformation ||
          !isEditWorkingStandard ||
          !isEditProductName ? (
            <Row style={{ justifyContent: "center", alignItems: "center" }}>
              <Col>
                <button
                  //   to="/"
                  className="footer-btn mx-3 mt-4 text-center"
                  onClick={() => {
                    setIsEditProductName(true),
                      setIsEditInventoryInformation(true),
                      setIsEditWorkingStandard(true);
                  }}
                >
                  Cancel
                </button>
              </Col>
            </Row>
          ) : null}
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
  uploadProductImage: (payloadData) => imgUpload(payloadData),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewProductComponent);
