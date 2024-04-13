import React from 'react'
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3>About Us</h3>
                    <p>Chúng tôi là DINING CITY, một đội ngũ tận tâm với sứ mệnh mang lại trải nghiệm nhà hàng tốt nhất cho khách hàng của mình. Chúng tôi tin rằng việc dùng ứng dụng của chúng tôi sẽ giúp bạn dễ dàng đặt bàn và tận hưởng bữa ăn tuyệt vời mà bạn mong muốn.</p>
                </div>
                <div className="footer-column">
                    <h3>Contact Us</h3>
                    <ul>
                        <li>Email: info@example.com</li>
                        <li>Phone: +123456789</li>
                        <li>Address: 123 Cầu Giấy, Hà Nội, Việt Nam</li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer