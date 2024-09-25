import React from "react";
import { Link ,useParams} from "react-router-dom";

export default function PostList() {
  const { userid } = useParams();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://web-production-63555.up.railway.app/posts?userid=${userid}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [userid]);

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
