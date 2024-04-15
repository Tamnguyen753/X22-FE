import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { requestWithToken } from "../../../utils/axios-http";
import Swal from 'sweetalert2';

const ListMenu = () => {
  const { user } = useContext(AppContext);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: ""
  });
  const [showForm, setShowForm] = useState(false); // Biến trạng thái để điều khiển việc hiển thị form

  useEffect(() => {
    const fetchMenu = async () => {
      if (!user || !user.restaurantId) {
        setLoading(false);
        return;
      }

      try {
        const response = await requestWithToken({
          method: "get",
          url: `/menu?restaurantId=${user.restaurantId}`
        });
        setMenu(response.data.data);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestWithToken({
        method: "post",
        url: "/menu",
        data: {
          ...formData,
          restaurantId: user.restaurantId
        }
      });
      // Add newly created menu item to the menu list
      setMenu(prevMenu => [...prevMenu, response.data.data]);
      // Reset form data
      setFormData({
        name: "",
        price: "",
        type: ""
      });
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Menu item created successfully!",
      });
      // Ẩn form sau khi tạo menu thành công
      setShowForm(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div>
      <h2>Menu</h2>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add Menu</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
          </div>
          <button type="submit">Create Menu</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
      <div className="menu-grid">
        {menu.map(item => (
          <div key={item.id} className="menu-item">
            <h3>{item.name}</h3>
            <p><strong>Price:</strong> {item.price}</p>
            <p><strong>Unit:</strong> {item.unit}</p>
            <p><strong>Type:</strong> {item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMenu;
