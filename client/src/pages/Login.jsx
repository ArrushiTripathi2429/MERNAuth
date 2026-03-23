import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [Username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <body className="bg-black"></body>
      <div className="flex flex-col justify-start items-centre">
        <h1 className="mt-40 text-5xl text-center text-white text-pretty">
          {" "}
          Create your Account
        </h1>
        <form>
          <div className="items-center gap-3 px-5 py-3 rounded-full ">
            <input
              className="flex items-center px-4 py-2 text-black"
              type="text"
              placeholder="Full Name"
              value={Username}
              onChange={(e)  => setUsername(e.target.value)} 
              name="Username"
              required
            /> 
            <div>
              <input
                className="px-4 py-2 mt-8 text-black"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                name="email"
                required
              />
            </div>
            <div>
              <input
                className="px-4 py-2 mt-8 text-black"
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e)  => setPassword(e.target.value)}
                name="password"
                required
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
