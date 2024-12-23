import React from "react";
import { Link } from "react-router-dom";
export default function PostList() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:8000/posts', {
      method: 'GET',
      credentials: 'include', 
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  const mappedData = data && data.length > 0 ? data.map((item) => (
    <div key={item.id} className="list">
      <Link to={`/post/${item.id}`} className="list1">
        <h1 className="list-header">{item.title}</h1>
      </Link>
      <p className="list-desc">{item.short_description}</p>
      <p className="list-date">{item.formatted_date}</p>
    </div>
  )) : null;
  
  return (
    <div>
      
      <div className="outlist">{mappedData}</div>

    </div>
    
    

  );
}
