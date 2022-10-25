import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VueSweetalert2 from "sweetalert2";
import { useLocation } from "react-router-dom";

export default function AddItem() {
  const navigate = useNavigate();
  const [item_Name, setitemName] = useState("");
  const [price, setprice] = useState("");
  const [invoice_No, setinvoiceNo] = useState("");
  const [quantity, setquantity] = useState("");
  const [date, setdate] = useState("");

  const [idNo, setidNo] = useState("");
  const [itemValues, setItem] = useState({});
  const [editStatus, setEdit] = useState("");

  const { state } = useLocation();

  useEffect(() => {

    if (state && state.edit != null && state.edit != false) {
      console.log("check", state);

      const { edit, item } = state;
      const {
        _id,
        item_Name,
        price: priceIn,
        invoice_No,
        quantity: quantityIn,
        date: dateIn,
      } = item;
      setidNo(_id);
      setItem(item);
      setEdit(edit);
      setItemValues(item_Name, priceIn, invoice_No, quantityIn, dateIn);
    }
  }, []);

  function setItemValues(
    nameInput,
    priceInput,
    invoiceInput,
    quantityInput,
    dateInput
  ) {
    setitemName(nameInput);
    setprice(priceInput);
    setinvoiceNo(invoiceInput);
    setquantity(quantityInput);
    setdate(dateInput);
  }

  function sendData(e) {
    e.preventDefault();
    const newItem = {
      item_Name,
      price,
      invoice_No,
      quantity,
      date,
    };
    axios
      .post("http://localhost:4000/item/add", newItem)
      .then((res) => {
        if (res.status === 200) {
          setItemValues('','','','','');
          VueSweetalert2.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: `${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  }
  function updateItems(e) {
    e.preventDefault();
    const newItem = {
      item_Name,
      price,
      invoice_No,
      quantity,
      date,
    };
    axios
      .put(`http://localhost:4000/item/update/${idNo}`, newItem)
      .then((res) => {
        console.log("🚀 ~ file: AddItem.js ~ line 78 ~ .then ~ res", res);
        if (res.status === 200) {
          VueSweetalert2.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: `${res.data.message}`,
          });
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container px-5 my-10 md:px-10 md:my-10 lg:px-80 lg:my-20">
      <form onSubmit={editStatus ? updateItems : sendData}>
        <div className="mb-6">
          <label
            htmlFor="item_Name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Item Name
          </label>
          <input
            type="text"
            id="item_Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e) => setitemName(e.target.value)}
            value={item_Name}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e) => setprice(e.target.value)}
            value={price}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="invoice_No"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Invoice No
          </label>
          <input
            type="text"
            id="invoice_No"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e) => setinvoiceNo(e.target.value)}
            value={invoice_No}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e) => setquantity(e.target.value)}
            value={quantity}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Date
          </label>
          <input
            type="text"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            onChange={(e) => setdate(e.target.value)}
            value={date}
          />
        </div>

        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none 
          focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 
          py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 
          dark:border-gray-700"
        >
          {editStatus ? "UPDATE" : "SUBMIT"}
        </button>
      </form>
    </div>
  );
}
