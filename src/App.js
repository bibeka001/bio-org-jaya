import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginComponent from "./presentation/Login/LoginComponent";
import HomeComponent from "./presentation/Home/HomeComponent";
import ServicesComponent from "./presentation/Services/ServicesComponent";
import CorporateComponent from "./presentation/Corporate/CorporateComponent";
import ContactComponent from "./presentation/Contact/ContactComponent";
import ProductsComponent from "./presentation/Products/ProductsComponent";
import EnquiryListComponent from "./presentation/EnquiryList/EnquiryListComponent";
import "react-multi-carousel/lib/styles.css";
import "../node_modules/react-multi-carousel/lib/styles.css";
import AdminDashboardComponent from "./presentation/AdminDashboard/AdminDashboardComponent";
import { Provider } from "react-redux";
import store from "../src/application/services/index";
import DetailPage from "./presentation/Products/DetailPage";
import AddNewProductComponent from "./presentation/AddNewProduct/AddNewProductComponent";
import CategoryAdminComponent from "./presentation/CategoryAdmin/CategoryAdminComponent";

const App = () => {
  return (
    <div className="App">
      {/* <AddNewProductComponent/> */}
      {/* <HomeComponent/> */}
      {/* <AdminDashboardComponent/> */}
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/services" element={<ServicesComponent />} />
          <Route path="/corporate" element={<CorporateComponent />} />
          <Route path="/contact" element={<ContactComponent />} />
          <Route path="/products" element={<ProductsComponent />} />
          <Route path="/enquirylist" element={<EnquiryListComponent />} />
          <Route path="/detailpage" element={<DetailPage />} />
          <Route path="/AdminDashboard" element={<AdminDashboardComponent />} />
          <Route path="/AddNewProduct" element={<AddNewProductComponent />} />
          <Route path="/enquirypage" element={<EnquiryListComponent />} />
          <Route path="/category" element={<CategoryAdminComponent/>} />
        </Routes>
      </Provider>
    </div>
  );
};

export default App;
