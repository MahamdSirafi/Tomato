import React, { useEffect, useState } from "react";
import "./Edit.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    const [imagePath, setImagePath] = useState("")
    const [image, setImage] = useState(false);


    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad",
    });
    const notify = () => {
        toast.success('Edited Successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",


        });
        setTimeout(() => {
            navigate("/list")
        }, 4000)
    }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };


    const id = window.location.pathname.split("/").slice(-1)[0]
    console.log(id)
    const fetchproduct = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/v1.0.0/products/${id}`)
            console.log(response.data)
            setData({
                name: response.data.doc.name,
                description: response.data.doc.description,
                price: response.data.doc.price,
                category: response.data.doc.category,
            });
            setImagePath(response.data.doc.image)

        } catch {

        }
    }
    useEffect(() => {
        fetchproduct()
    }, []);
    const onSubmitHandler = async () => {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image) {
            formData.append("image", image);
            try {
                let response = await axios.patch(
                    `http://localhost:7000/api/v1.0.0/products/${id}/uplode`,
                    formData,
                    {
                        headers: {
                            Authorization: `  Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                notify();
            } catch (err) {
                console.log(err.response.data.message);
            }
        }

        else {
            try {
                let response = await axios.patch(
                    `http://localhost:7000/api/v1.0.0/products/${id}`,
                    data,
                    {
                        headers: {
                            Authorization: `  Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                notify();
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
    }
    return (
        <div className="add">
            <div className="flex-col" onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            crossOrigin="anonymous"
                            src={image ? URL.createObjectURL(image) : imagePath}
                            alt=""
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}

                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Write content here"
                        required
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="Number"
                            name="price"
                            placeholder="$20"
                        />
                    </div>
                </div>
                <button onClick={onSubmitHandler} className="add-btn">
                    ADD
                </button>
            </div>
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition:Bounce />
        </div>
    )
}

export default Edit