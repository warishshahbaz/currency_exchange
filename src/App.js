import * as React from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";

function App() {
  const [intialStste, setIntialState] = React.useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR"],
    base: "USD",
    amount: "",
    convertTo: "INR",
    result: "",
    date: "",
  });
  
  const { currencies, base, amount, convertTo, result, date } = intialStste;

  React.useEffect(()=>{
    let fetchData = async ()=>{
      let res = await fetch(`https://v6.exchangerate-api.com/v6/104cd53b6375c54c6487d811/latest/${base}`)
        res = await res.json();
        const result = (res.conversion_rates[convertTo] * amount).toFixed(3);
        const date = (res.time_last_update_utc).toString(0,15);
        setIntialState({
          ...intialStste,
          result,
          date
        })
      console.log(result);
    } 
    fetchData();
  },[amount,base,convertTo]);


  const onChangeInput = (e) =>{
    setIntialState({
      ...intialStste,
      amount:e.target.value,
      date:null,
    })
  }
  const handleSelect = (e) =>{
    setIntialState({
      ...intialStste,
      [e.target.name] : e.target.value,
      date : null,
    })
  }

  const handleSwap = () =>{
    setIntialState({
      ...intialStste,
      convertTo:base,
      base:convertTo,
      result:null,
    })
  }

  return (
    <>
      <div
        className="container w-50 text-center mt-4"
        style={{ border: "4px solid light" }}
      >
        <h1>Currency Convater</h1>
        <h4>
          
          {amount} {base}  is equivalent to {convertTo}
        </h4>
       
        <span style={{color:'red'}} >
          {amount === "" ? "0" : result === null ? "calculating..." : result}
        </span>
        <p>As of {amount === ""? "" : date ===null ? "" : date } </p>
        <form  className="form-group" style={{border:'3px solid grey',padding:'32px',borderRadius:'22px'}} >
        <div className="row">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="text" className="form-control mb-2 " placeholder="user name" />
        </div>
        <div className="row mb-2 ">
          <label  className="form-label" >Email</label>
          <input type="email" className="form-control" placeholder="abc@gmail.com" />
        </div>
        <div className="row">
          <div className="col ">
            <input type="number"
            value={amount}
            onChange={onChangeInput}
             className=" form-control" />
          </div>
          <div className="col">
            <select className="form-control"
            name="base"
             onChange={handleSelect}
              value={base}
             >
             {
              currencies.map((val,i)=>{
                return <option key={i} >
                      {val}
                    </option>
              })
             }
              
            </select>
          </div>
        </div>
        <div className="row p-2  " style={{ fontSize: "20px" }}>
          <CgArrowsExchangeAltV onClick={handleSwap} className="row text-center" />
        </div>
        <div className="row mt-4 ">
          <div className="col">
            <input type="text" 
            value={amount === '' ?"0": result === null ? "calculating...": result }
             disabled className="form-control" />
          </div>
          <div className="col">
            <select name="convertTo" value={convertTo}  onChange={handleSelect} className="form-control">
            {
              currencies.map((val,i)=>{
                return <option key={i} >
                      {val}
                    </option>
              })
             }
            </select>
          </div>
        </div>
        </form>
      
      </div>
    </>
  );
}

export default App;
