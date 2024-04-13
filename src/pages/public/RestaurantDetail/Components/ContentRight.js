import { DatePicker, TimePicker } from 'antd';
import React from 'react';
import ErrorMessage from '../../../../shared/ErrorMessages/Index';
import { useForm, Controller } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

// const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    const today = new Date();
    return current && current.date() < today.getDate() && current.month() <= today.getMonth() && current.year() <= today.getFullYear();
};

const validationSchema = yup.object().shape({
    fullname: yup.string().required('Họ và tên là bắt buộc'),
    phone: yup.string().required('Số điện thoại là bắt buộc').matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa các số'),
    time: yup.date().required('Thời gian là bắt buộc'),
    date: yup.date().required('Ngày là bắt buộc'),
    people: yup.number().typeError('Giá trị là một số').required('Số người là bắt buộc').positive().integer()
});

const ContentRight = () => {
    const { restaurantId } = useParams();
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const booking = useAuth()

    const onSubmit = async (data) => {
        // const formattedTime = data.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        // const formattedDate = data.date.toISOString().split('T')[0];

        try {
            const requestData = {
                name: data.fullname,
                phone: data.phone,
                // time: data.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                // reservationDate: data.date.toISOString().split('T')[0],
                reservationDate: `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()} ${data.time.getHours()}:${data.time.getMinutes()}:00`,
                quantity: data.people,
                restaurantId: restaurantId

            };
            await booking(requestData)
            console.log(data);
            console.log(requestData);
            Swal.fire({
                icon: "success",
                title: "Đặt bàn thành công !",
            });
            reset();

        } catch (errors) {
            //   toast.error(extractMessageFromErr(err));
            console.log(errors);
        }
    };
    return (
        <div id='booking' className='booking'>
            <h1>Đặt bàn</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="fullname">Họ và tên:</label>
                        <Controller
                            control={control}
                            name="fullname"
                            render={({ field }) => <input {...field} type="text" id="fullname" />}
                        />
                        {errors.fullname && <ErrorMessage message={errors.fullname} />}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Số điện thoại:</label>
                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => <input {...field} type="text" id="phone" />}
                            type="number"
                        />
                        {errors.phone && <ErrorMessage message={errors.phone} />}
                    </div>
                </div>
                <div className="form-row">
                    <div style={{ display: "flex", gap: "5px" }} className="form-group">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <label htmlFor="time">Thời gian:</label>
                            <Controller
                                control={control}
                                name="time"
                                render={({ field }) => <TimePicker {...field} format="HH:mm" style={{ height: "45.6px", width: "180px" }} />}
                            />
                            {errors.time && <ErrorMessage message={errors.time} />}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }} >
                            <label htmlFor="date">Ngày:</label>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        disabledDate={disabledDate}
                                        style={{ height: "45.6px", width: "180px" }}
                                    />
                                )}
                            />
                            {errors.date && <ErrorMessage message={errors.date} />}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="people">Số người:</label>
                        <Controller
                            control={control}
                            name="people"
                            render={({ field }) => <input {...field} type="text" id="people" />}
                        />
                        {errors.people && <ErrorMessage message={errors.people} />}
                    </div>
                </div>
                <button type="submit">Đặt bàn</button>
            </form>
        </div>
    );
};

export default ContentRight;
