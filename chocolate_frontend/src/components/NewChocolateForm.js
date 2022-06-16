import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { useState } from "react";

const NewChocolateForm = ({ estates, postChocolate }) => {
  const estateOptions = estates.map((estate) => {
    return (
      <option key={estate.id} value={estate.id}>
        {estate.name}
      </option>
    );
  });

  //Controlled component - forms have their ownstate which should be in their own component - only for forms
  const [stateChocolate, setStateChocolate] = useState({
    name: "",
    cocoaPercentage: 0,
    estate: null,
  });

  const handleChange = (event) => {
    console.log(event);
    let propertyName = event.target.name;
    let copiedChocolate = { ...stateChocolate };
    copiedChocolate[propertyName] = event.target.value;
    setStateChocolate(copiedChocolate);
  };

  const handleEstate = (event) => {
      const estateId = parseInt(event.target.value);
      const selectedEstate = estates.find(estate => estate.id === estateId)
      let copiedChocolate = {...stateChocolate}
      copiedChocolate.estate = selectedEstate
      setStateChocolate(copiedChocolate);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault(); // stops refreshing issues
    postChocolate(stateChocolate)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Add a new chocolate:</label>
      <input
        type="text"
        placeholder="chocolate name"
        name="name"
        onChange={handleChange}
        value={stateChocolate.name}
      />
      <input
        type="text"
        placeholder="cocoa percentage"
        name="cocoaPercentage"
        onChange={handleChange}
        value={stateChocolate.cocoaPercentage}
      />
      <select name="estate" onChange={handleEstate}>
        <option>Select an estate</option>
        {estateOptions}
      </select>
      <button type="submit">Add chocolate</button>
    </form>
  );
};

export default NewChocolateForm;
