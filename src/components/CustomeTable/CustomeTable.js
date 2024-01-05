import React, { useState } from "react";
import "./custometable.css";
import axios from "axios";

export default function CustomeTable({ data, setCartData, cartData }) {
  const [total, setTotal] = useState(0);
  const onClickCartData = (name, id, checbox, Categorie) => {
    axios
      .get(
        `http://YOUR_IP_ADDRESS:3000/api/food/getFoodDataByid?food_id=${parseInt(
          id
        )}`
      )
      .then((res) => {
        if (total === 0) {
          setTotal(res.data.returnData[0].food_price);
        } else {
          setTotal(total + res.data.returnData[0].food_price);
        }
        if (checbox === false && cartData.some((data) => data.id === id)) {
          let newData = cartData.filter((data) => {
            return data.id !== id;
          });
          let kuxbhi = total - res.data.returnData[0].food_price;
          setTotal(kuxbhi);

          newData.map((data) => {
            Object.assign(data, { total: kuxbhi });
            return null;
          });

          setCartData(newData);
        } else {
          setCartData([
            ...cartData,
            {
              id: id,
              name: name,
              rate: res.data.returnData[0].food_price,
              checked: checbox,
              Categorie: Categorie,
              total: total + res.data.returnData[0].food_price,
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>select</th>
            <th>categorie</th>
            <th>name</th>
            <th>food id</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <>
                <td>
                  <input
                    type="checkbox"
                    id={data.food_id}
                    name={data.name}
                    value={data.name}
                    onChange={(e) => {
                      onClickCartData(
                        e.target.value,
                        e.target.id,
                        e.target.checked,
                        data.Categorie
                      );
                    }}
                  />
                </td>
                <td>{data.Categorie}</td>
                <td>{data.name}</td>
                <td>{data.food_id}</td>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
