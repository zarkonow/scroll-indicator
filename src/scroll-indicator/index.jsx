import { useState, useEffect } from "react";
import "./scroll.css"

export default function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);
  const [errorMessage, setErrormessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

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
      setErrormessage(e.message);
    }
  }

  useEffect(() => {
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );

    const scrolled =
      document.body.scrollTop || document.documentElement.scrollTop;
    const heigth =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((scrolled / heigth) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  console.log(data, scrollPercentage);

  if (errorMessage) {
    return <div>Error ! {errorMessage}</div>
  }

  if (loading) {
    return<div>Loading data ! Please wait</div>
  }


  return (
    <div>
      <div className="top-container">
        <h1> Custom Scroll Indicator</h1>
        <div className="scroll-progress-container">
          <div
            className="current-progress-bar"
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="data-container">
        {data && data.length > 0
          ? data.map((dataItem) => <p>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
}
