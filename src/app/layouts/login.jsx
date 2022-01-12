import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        setEmail(event.target.value);
        console.log(event.target.value);
    };

    return (
        <form action="">
            <div>
                <lable htmlFor="email">Email</lable>
                <input type="text" id="email" value={email} onChange={handleChange}/>
            </div>
            <div>
                <lable htmlFor="password">Password</lable>
                <input type="password" id="password"/>
            </div>
        </form>
    );
};

export default Login;
