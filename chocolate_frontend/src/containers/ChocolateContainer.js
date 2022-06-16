import NewChocolateForm from "../components/NewChocolateForm";
import ChocolateList from "../components/ChocolateList";
import { useEffect, useState } from "react";

// Container hold state
const ChocolateContainer = () => {
  const [chocolates, setChocolates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/chocolates")
      .then((response) => response.json())
      .then((data) => setChocolates(data));
  }, []);

  const [estates, setEstates] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/estates")
      .then((response) => response.json())
      .then((data) => setEstates(data));
  }, []);

  const postChocolate = (newChocolate) => {
      // add the new chocolate
    fetch("http://localhost:8080/chocolates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newChocolate),
    })
    //update locally now
    .then(response => response.json())
    .then(savedChocolate => setChocolates([...chocolates, savedChocolate]))
  };

  const deleteChocolate = (chocolateId) => {
      //deal with db
      fetch("http://localhost:8080/chocolates/" + chocolateId, {
      method: "DELETE",
      headers: {'Content-type': 'application/json'}
  })
  // delete locally
  setChocolates(chocolates.filter(chocolate => chocolate.id != chocolateId))

  }

  return (
    <>
      <h1>Single Origin Chocolate</h1>
      <p>A resource for chocoholics</p>
      <NewChocolateForm estates={estates} postChocolate={postChocolate} />
      <ChocolateList chocolates={chocolates} deleteChocolate={deleteChocolate}/>
    </>
  );
};

export default ChocolateContainer;
