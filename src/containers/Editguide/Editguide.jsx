import React, { useEffect, useState } from "react";
import { getGuideByID } from "../../api";
import { useParams } from "react-router";

const Editguide = () => {
    let {id} = useParams();
  const [guide, setGuide] = useState([]);

  async function fetchGuide() {
    const foundGuide = await getGuideByID(id);
    setGuide(foundGuide);
  }

  useEffect(() => {
    fetchGuide();
  }, []);

  return <div>Editguide</div>;
};

export default Editguide;
