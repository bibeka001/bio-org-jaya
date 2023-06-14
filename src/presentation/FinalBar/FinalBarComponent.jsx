import React from "react";
import { Row, Col } from "react-bootstrap";
import BioOrganicLogo from "../../infrastructure/assets/images/translogo.png";
import Location from "../../infrastructure/assets/images/location2.jpg";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import PurpleImage from "../../infrastructure/assets/images/purple_circle.png";

export const FinalBarComponent = () => {
  return (
    <Row className="footer align-items-center">
      <Col sm={12} md={4}>
        <p className="text-white">
          <img className="bio-logo me-2" src={BioOrganicLogo} />
          <span className="bio-text">BioOrganics</span>
        </p>
        <p style={{ color:"white",textAlign:"justify",paddingRight:"6rem" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis optio, perspiciatis omnis doloribus excepturi error quis minus repellat voluptatem iste et! Amet ducimus, </p>
      </Col>
      <Col sm={12} md={4}>
        <div>
          <p className="phone" style={{ color: "orange", fontWeight: "bold" }}>
            Phone
          </p>
          <p className="text-white p2-phone">+91 7259396247</p>
        </div>
        <div>
          <p className="email" style={{ color: "orange", fontWeight: "bold" }}>
            Email
          </p>
          <p className="text-white p2-email" style={{ fontSize: "13px" }}>
            Example@gmail.com
          </p>
        </div>
        <div>
          <p
            className="location"
            style={{ color: "orange", fontWeight: "bold" }}
          >
            Location
          </p>
          <p className="text-white p2-location" style={{ fontSize: "13px" }}>
            Banglore
          </p>
        </div>
      </Col>
      <Col sm={12} md={4}>
        <p className="colstyle" style={{ color: "orange", fontWeight: "bold" }}>
          Locate Us
        </p>
        {/* <iframe
            src="https://www.google.com/maps/place/BioOrganics/@13.0104422,77.492377,15z/data=!4m6!3m5!1s0x3bae3cf61aaaaaab:0x5d9b8fc84da867a4!8m2!3d13.018584!4d77.49935!16s%2Fg%2F1tt0pks9?entry=ttu"
            width={"200rem"}
            height={"150rem"}
          ></iframe> */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15549.583592490426!2d77.492377!3d13.0104422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cf61aaaaaab%3A0x5d9b8fc84da867a4!2sBioOrganics!5e0!3m2!1sen!2sin!4v1685433239032!5m2!1sen!2sin"
          width={"250rem"}
          height={"150rem"}
          style={{ borderRadius: "10px" }}
        ></iframe>
      </Col>
      <Row className="copyrights-style" sm={4}lg={4}>
      <hr style={{width:"70rem" }}/>
      <h6 style={{marginLeft:"30rem",fontSize:"12px" }}>All Copyrights <AiOutlineCopyrightCircle size={20} className="copyrights"/>Reserved</h6>
      </Row>
    </Row>
  );
};

export default FinalBarComponent;
