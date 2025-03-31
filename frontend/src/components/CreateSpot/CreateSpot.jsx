// import './CreateSpot.css';
import { getSpotsThunk } from "../../store/getSpotsThunk";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "../Spots/Spots.css";
import './CreateSpot.css'
// import { useParams } from "react-router-dom";

function CreateSpot() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    description: "",
    price: "number",
    images: [],
  });

  const inputChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  return (
    <form className="form">

      <div className="h1">
        <h1>Create A Spot</h1>
      </div>
      <p>Fill Out Form</p>

      <div className="address">

        <div className="name">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={inputChange}
              placeholder="Enter text"
            />
          </label>
        </div>

        <div className="street">
          <label>
            Street
            <input
              type="text"
              name="street"
              value={input.street}
              onChange={inputChange}
              placeholder="Enter text"
            />
          </label>
        </div>

        <div className="city">
          <label>
            City
            <input
              type="text"
              name="city"
              value={input.city}
              onChange={inputChange}
              placeholder="Enter text"
            />
          </label>
        </div>

        <div className="state">
          <label>
            State
            <input
              type="text"
              name="state"
              value={input.state}
              onChange={inputChange}
              placeholder="Enter text"
            />
          </label>
        </div>

        <div className="country">
          <label>
            Country
            <input
              type="text"
              name="country"
              value={input.country}
              onChange={inputChange}
              placeholder="Enter text"
            />
          </label>
        </div>

        <div className="description">
          <label>
            Description
            <input
              type="text"
              name="description"
              value={input.description}
              onChange={inputChange}
              placeholder="text"
            />
          </label>
        </div>

        <div className="price">
          <label>
            Price
            <input
              type="number"
              name="price"
              value={input.price}
              onChange={inputChange}
              placeholder="Enter Amount"
            />
          </label>
        </div>

        <div className="create-spot-image">
          <label>
            Images
            <input type="file" value={input.images} onChange={inputChange} />
          </label>
        </div>
        <div>
          <button type="submit">Create Spot</button>
        </div>
      </div>
    </form>
  );
}

export default CreateSpot;
