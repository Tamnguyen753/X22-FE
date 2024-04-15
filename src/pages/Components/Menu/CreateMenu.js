import React, { useContext } from 'react';
import * as yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { extractMessageFormErr } from '../../../utils/error';
import ErrorMessages from '../../../utils/ErrorMessages';
import useMenu from '../../../hooks/useMenu';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    name: yup.string().required("Bắt buộc phải điền tên!"),
    type: yup.string().required("Bắt buộc phải chọn loại!"),
    price: yup.number().required("Bắt buộc phải điền giá!"),
    unit: yup.string().required("Bắt buộc phải điền đơn vị!"),
    describe: yup.string().required("Bắt buộc phải điền mô tả!"),
    discount: yup.number(),
    image: yup.string().url("Vui lòng nhập URL hợp lệ!").required("Bắt buộc phải điền đường dẫn ảnh!"),
});

const CreateMenu = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit, formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { createMenu } = useMenu();

    const onSubmit = async (data) => {
        try {
            await createMenu(data);
            toast.success("Thêm món ăn thành công!");
            navigate("/managerhome")
        } catch (err) {
            toast.error(extractMessageFormErr(err));
        }
    };

    return (
        <div style={{ backgroundColor:"wheat"}}>
            <div className='menu-form' style={{width:"70%",height:"100%",justifyContent:"center" ,marginLeft:"10%",marginTop:"100px "}}>
            <p className='td-form'><b>THÊM MÓN ĂN</b></p>
            <Form className='rg' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Control {...register('name')} type='text' placeholder='Tên món ăn' required />
                    {errors.name && <ErrorMessages message={errors.name} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Select {...register('type')} placeholder='Loại món ăn' required>
                        <option value='food'>Food</option>
                        <option value='drink'>Drink</option>
                        <option value='combo'>Combo</option>
                    </Form.Select>
                    {errors.type && <ErrorMessages message={errors.type} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control {...register('price')} type='number' placeholder='Giá món ăn' required />
                    {errors.price && <ErrorMessages message={errors.price} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control {...register('unit')} type='text' placeholder='Đơn vị' required />
                    {errors.unit && <ErrorMessages message={errors.unit} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control {...register('describe')} as='textarea' rows={3} placeholder='Mô tả món ăn' required />
                    {errors.describe && <ErrorMessages message={errors.describe} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control {...register('discount')} type='number' placeholder='Giảm giá (%)' />
                    {errors.discount && <ErrorMessages message={errors.discount} />}
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Control {...register('image')} type='url' placeholder='URL ảnh món ăn' required />
                    {errors.image && <ErrorMessages message={errors.image} />}
                </Form.Group>
                <br />
                <Button variant='success' type='submit'>Thêm món ăn</Button>
            </Form>
        </div>
        </div>
    );
};

export default CreateMenu;
