import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import CustomeTable from "./components/CustomeTable/CustomeTable";
// import Data from "./data.json";
import { Collapse } from "antd";
const { Panel } = Collapse;
function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [cartData, setCartData] = useState([]);
  const [sidebar, setSidebar] = useState({});
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const funCall = () => {
    setItems((prevItems) => {
      return prevItems.map((category) => {
        const updatedChildren = cartData
          .filter((item) => item.Categorie === category.label && item.checked)
          .map((item) => ({
            id: item.id,
            name: item.name,
            rate: item.rate,
          }));

        return {
          ...category,
          children: updatedChildren,
        };
      });
    });
  };

  const onSubmitChnage = (name) => {
    axios
      .get(`http://YOUR_IP_ADDRESS:3000/api/food/search?name=${name}`)
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
        setData(res.data.returnData);
      })
      .catch((error) => {
        console.log(error, "Error From Frontend side");
      });
  };
  const onvalueChnage = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    funCall();
  }, [sidebar]);
  const xyz = () => {
    let i = {};

    items.forEach((item) => {
      i[item.label] = item;
    });

    setSidebar(i);
  };
  useEffect(() => {
    xyz();
  }, [cartData]);

  useEffect(() => {
    if (cartData.length === 0) {
      setTotal(0);
    } else {
      cartData.map((item, index) => {
        if (index === cartData.length - 1) {
          // debugger;

          setTotal(item.total);
        }
        return null;
      });
    }
  }, [cartData, total]);
  useEffect(() => {
    axios
      .get(`http://YOUR_IP_ADDRESS:3000/api/food/search?name=${""}`)
      .then((res) => {
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
        setData(res.data.returnData);
        let items = [];
        res.data.returnData.map((datas, index) => {
          if (!items.some((e) => e.label === datas.Categorie)) {
            items.push({
              key: datas.food_id,
              label: datas.Categorie,
              children: [],
            });
          }
          return null;
        });

        setItems(items);
      })
      .catch((error) => {
        console.log(error, "Error From Frontend side");
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="left">
          <Collapse>
            {items.map((item, index) => (
              <Panel header={item.label} key={index}>
                {item.children.map((child, childIndex) => (
                  <div key={childIndex}>
                    <p className="itemName">{child.name}</p>
                    <p className="itemItem">{child.rate}</p>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>

          <h1>Total</h1>
          <div>{total}</div>
        </div>
        <div className="right">
          <input
            className="search"
            type="text"
            value={name}
            placeholder="Enter name to serach for food"
            onChange={(e) => onvalueChnage(e)}
          />
          <button className="button" onClick={() => onSubmitChnage(name)}>
            Submit
          </button>
          <div className="message">{message}</div>

          {
            <CustomeTable
              data={data}
              setCartData={setCartData}
              cartData={cartData}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
