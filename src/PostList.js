import React from "react";
import { Link } from "react-router-dom";

export default function PostList() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('https://localhost:8000/posts?userid=1')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const mappedData = data.map((item) => (
    <div key={item.id} className="list">
      <Link to={`/post/${item.id}`} className="list1">
        <h1 className="list-header">{item.title}</h1>
      </Link>
      <p className="list-desc">{item.short_description}</p>
      <p className="list-date">{item.formatted_date}</p>
    </div>
  ));

  return (
    <div className="outlist">{mappedData}</div>
  );
}
