import { useState, useEffect } from "react";
import axios from "axios";

const importItems = async () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // lanzar accion cuando isLoaded sea true
  useEffect(() => {
    console.log(isLoaded);
  }, [isLoaded]);

  try {
    await axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setIsLoaded(true);
    });
  } catch (err) {
    console.error(err);
  }
};

export default importItems;
