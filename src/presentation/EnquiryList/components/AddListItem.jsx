import React, { useState, useEffect } from "react";
import { Col, Row, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { getListOfProduct } from "../../../application/services/actions/auth";
import { connect } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

const ValidationSchema = yup.object().shape({
  compound: yup.object().nullable().required("Please select an item.."),
  mg: yup
    .string()
    .matches(/^\S*$/, "Space is not allowed")
    .max(4, "Too Long!")
    .matches(
      /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{4})*)|\d+)?(\.\d{1,2})?$/,
      "Only number allowed"
    )
    .typeError("That doesn't look like a phone number")
    .nullable()
    .required("Please enter Quality."),
  showEdit: yup.boolean().default(false),
  readOnly: yup.boolean().default(true),
});
function AddListItem({
  setEnquiryList,
  enquiryList,
  checkEnquiryData,
  getListOfProduct,
}) {
  const [data, setData] = useState({
    compound: "",
    mg: "",
    isInterMediate: false,
    showEdit: false,
    readOnly: true,
  });
  const [options, setOptions] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");

  const handleInputChange = (e, key) => {
    const tempData = {
      ...data,
    };
    tempData[key] = e;

    setFieldValue(key, e);
    setData(tempData);
  };

  const formHandler = (e) => {
    setData({
      ...data,
    });

    // console.log("🚀 ~ file: AddListItem.jsx:43 ~ formHandler ~ e:", e);
    console.log("tempData", tempData);
    console.log("data", data);

    const tempData = [...enquiryList];
    if (
      !tempData.some(
        (el) => el?.compound?.id == data?.compound?.id && el?.mg == data?.mg
      )
    ) {
      tempData.push(data);
      setEnquiryList(tempData);
      handleReset();
    }
  };
  const { handleSubmit, setFieldValue, handleReset, values, touched, errors } =
    useFormik({
      initialValues: {
        compound: "",
        mg: "",
        isInterMediate: false,
      },
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnChange: true,
      onSubmit: (value) => formHandler(value),
      validationSchema: ValidationSchema,
      validateOnMount: true,
      validateOnChange: true,
    });

  const postEnquiryList = async () => {
    let payload = {
      pageNumber: 1,
      pageSize: 100,
      search: "",
      sortField: "",
      sortDirection: "",
      category: "",
    };
    await getListOfProduct(payload)
      .then((res) => {
        console.log("get product res", res);
        const Result = res?.data?.result.map((item) => {
          return {
            id: item?.id,
            value: item?.chemicalName,
            label: item?.chemicalName,
          };
        });
        setOptions(Result);
      })
      .catch((error) => {
        console.log("get product error", error);
      });
  };

  useEffect(() => {
    postEnquiryList();
  }, []);

  return (
    <Row className="align-items-center justify-content-center w-100">
      <Col xs="12">
        <div className="d-flex w-100">
          <Select
            isClearable
            options={options}
            placeholder="Search Compound"
            classNamePrefix="react-select"
            onChange={(val) => {
              handleInputChange(val, "compound");
            }}
            value={values.compound}
          />
          {errors.compound && touched.compound ? (
            <div className="errorMessage">{errors.compound}</div>
          ) : null}

          <input
            type="text"
            value={values.mg}
            className="quality-box"
            placeholder="Quality in Mg"
            onChange={(e) => handleInputChange(e.target.value, "mg")}
          />
          {errors.mg && touched.mg ? (
            <div className="errorMessage">{errors.mg}</div>
          ) : null}

          <div className="checkbox-container">
            <input
              className="check-input"
              type="checkbox"
              // value=""
              // id="flexCheckIndeterminate"
              onChange={(e) => {
                handleInputChange(e.target.checked, "isInterMediate");
              }}
            />
            {/* <span className="checkboxIcon"></span> */}
            <label
              // htmlFor="flexCheckIndeterminate"
              className="check-input-label Draft-style ms-2"
            >
              Draft COA
            </label>
          </div>

          <button
            type={"submit"}
            className="add-button"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </div>
      </Col>
    </Row>
  );
}

const mapStateToProps = ({ authReducer: { getProductList } }) => ({
  getProductList,
});
const mapDispatchToProps = {
  getListOfProduct: (payloadData) => getListOfProduct(payloadData),
};
export default connect(mapStateToProps, mapDispatchToProps)(AddListItem);
