import * as React from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { useFormik } from "formik";
import * as Yup from "yup";

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

  React.useEffect(() => {
    let fetchData = async () => {
      let res = await fetch(
        `https://v6.exchangerate-api.com/v6/104cd53b6375c54c6487d811/latest/${base}`
      );
      res = await res.json();
      const result = (res.conversion_rates[convertTo] * amount).toFixed(3);
      const date = res.time_last_update_utc.toString(0, 15);
      setIntialState({
        ...intialStste,
        result,
        date,
      });
      console.log(result);
    };
    fetchData();
  }, [amount, base, convertTo]);

  const onChangeInput = (e) => {
    setIntialState({
      ...intialStste,
      amount: e.target.value,
      date: null,
    });
  };
  const handleSelect = (e) => {
    setIntialState({
      ...intialStste,
      [e.target.name]: e.target.value,
      date: null,
    });
  };

  const handleSwap = () => {
    setIntialState({
      ...intialStste,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("*required")
        .min(3, " char length shoude be less then 15"),

      email: Yup.string().email("invalid Email").required("*required"),
    }),
    onSubmit: (values) => {
      console.log("form submit", values);
      formik = "";
    },
  });

  return (
    <>
      <div
        className="container w-50 text-center mt-4"
        style={{ border: "4px solid light" }}
      >
        <h1>Currency Convater</h1>
        <h4>
          {amount} {base} is equivalent to {convertTo}
        </h4>

        <span style={{ color: "red" }}>
          {amount === "" ? "0" : result === null ? "calculating..." : result}
        </span>
        <p>As of {amount === "" ? "" : date === null ? "" : date} </p>
        <form
          onSubmit={formik.handleSubmit}
          className="form-group"
          style={{
            border: "3px solid grey",
            padding: "32px",
            borderRadius: "22px",
          }}
        >
          <div className="row">
            <label for="exampleFormControlInput1" class="form-label">
             User Name
            </label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="form-control mb-2 "
              placeholder="user name"
            />
            {formik.touched.username && formik.errors.username && (
              <p style={{ color: "red" }}>{formik.errors.username}</p>
            )}
          </div>
          <div className="row mb-2 ">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="form-control"
              placeholder="abc@gmail.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: "red" }}>{formik.errors.email}</p>
            )}
          </div>
          <div className="row">
            <div className="col ">
              <input
                type="number"
                value={amount}
                onChange={onChangeInput}
                className=" form-control"
              />
            </div>
            <div className="col">
              <select
                className="form-control"
                name="base"
                onChange={handleSelect}
                value={base}
              >
                {currencies.map((val, i) => {
                  return <option key={i}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row p-2  " style={{ fontSize: "20px" }}>
            <CgArrowsExchangeAltV
              onClick={handleSwap}
              className="row text-center"
            />
          </div>
          <div className="row mt-4 ">
            <div className="col">
              <input
                type="text"
                value={
                  amount === ""
                    ? "0"
                    : result === null
                    ? "calculating..."
                    : result
                }
                disabled
                className="form-control"
              />
            </div>
            <div className="col">
              <select
                name="convertTo"
                value={convertTo}
                onChange={handleSelect}
                className="form-control"
              >
                {currencies.map((val, i) => {
                  return <option key={i}>{val}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row mt-2">
            <button type="submit" className="form-control bg-light text-bg-info " >Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
