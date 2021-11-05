import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {

    const [show, handleShow] = useState([]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.screenY > 100) {
                handleShow(true);
            } else handleShow(false);
            // console.log(show);
            // console.log(window.screenY);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className="nav">
            <img
                className="nav_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix Logo"
            />

            <img
                className="nav_avtar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="Netflix Avtar"
            />
        </div>
    )
};

export default Nav
