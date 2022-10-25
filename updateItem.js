import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router";

export default function updateItem(){

    
    const params = useParams();
    const navigate = useNavigate();

    
  
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`http://localhost:4000/Item/search/${params.id.toString()}`);

        
  
        if (!response.ok) {
          const message = `An error has occured: ${response.statusText}`;
          window.alert(message);
          return;
        }
  
        const record = await response.json();
        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }

        

        
       // setForm(record);
      }
  
      fetchData();
  
      return;
    }, [params.id, navigate]);
  
    
    const [item_Name, setitemName]=useState("");
    const [price, setprice]=useState("");
    const [invoice_No, setinvoiceNo]=useState("");
    const [quantity, setquantity]=useState("");
    const [date, setdate]=useState("");
    
        async function sendData(e){
            e.preventDefault();
            
            const updateItem = {
                item_Name,
                price,
               invoice_No,
                quantity,
               date
            }

          
            await fetch(`http://localhost:4000/Item/update/${params.id}`, {
                method: "post",
                body: JSON.stringify(updateItem),
                headers: {
                'Content-Type': 'application/json'
                },
            });
  
            navigate("/");

            
        }    

    return(

    <div className="container">
    <center><p style={{fontSize: "30px"}}>Edit Item</p></center><br/>
   <form onSubmit={sendData}>
    <fieldset style={{backgroundColor:"#D5D8DC", padding:"30px", borderRadius:"20px"}}>
   <div className="form-group">
        <label htmlFor="item_Name">New Item Name</label>
        <input type="text" className="form-control" id="item_Name" placeholder="Enter Item Name" onChange={(e) =>{
            item_Name(e.target.value);
        }} />
        
        </div>
            <div className="form-group">
                <label htmlFor="price">New Item Price</label>
                <input type="number" className="form-control" id="price" placeholder="Enter new price" onChange={(e) =>{
                    price(e.target.value);
                }} />

</div>
            <div className="form-group">
                <label htmlFor="invoice_No">New Invoice Number</label>
                <input type="text" className="form-control" id="invoice_No" placeholder="Enter new invoice number " onChange={(e) =>{
                    invoice_No(e.target.value);
                    
                }} />

</div>
            <div className="form-group">
                <label htmlFor="quantity">New quantity</label>
                <input type="number" className="form-control" id="quantity" placeholder="Enter new quantity" onChange={(e) =>{
                   quantity(e.target.value);
                }} />
                </div>

<div className="form-group">
                <label htmlFor="date">New Date</label>
                <input type="Date" className="form-control" id="date" placeholder="Enter new Date" onChange={(e) =>{
                    date(e.target.value);
                }}  />
                
            </div>

            </fieldset><br/>
            <center><button type="submit" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Submit</button>
            <button class="text-white bg-white-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#0277BD] dark:hover:bg-[#1565C0] focus:outline-none dark:focus:ring-blue-800"><a href='/payments'>Cancel</a></button></center>
            </form> 
        </div>
    )
}





   
        
    


