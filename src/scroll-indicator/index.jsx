import { useState, useEffect } from "react";

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrormessage] = useState("");

  async function fetchData(getUrl) {
    try {
      setloading(true);
      const response = await fetch(getUrl);
      const data = await response.json();

      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      setErrormessage(e.Message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  console.log(data, loading);

  return <div></div>;
}
