import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/hidden.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/hidden.png";
      passwordRef.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = (id) => {
    console.log(`deleting password with id ${id}`);
    let confirmToDelete = confirm(
      "Do you really want to delete this password ?"
    );
    if (confirmToDelete) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log(`editing password with id ${id}`);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Text Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="mx-auto max-w-4xl px-5 mt-10">
        <h1 className="text-gray-700 text-center text-2xl flex justify-center items-center gap-2">
          <img src="icons/favicon.png" className="w-12" />  
          Your own Password Manager
          <img src="icons/favicon.png" className="w-12" />  
        </h1>
        <div className="text-white flex flex-col p-5 gap-8">
          <input
            className="rounded-full border border-green-400 text-black w-full p-4 py-1"
            placeholder="Enter website URL"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-400 text-black w-full p-4 py-1"
              placeholder="Enter your username"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-400 text-black p-4 py-1"
                placeholder="Enter your password"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                ref={passwordRef}
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer hover:scale-110"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={30}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-2 py-1 gap-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div>
          <h2 className="font-bold font-mono text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-cyan-700 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-cyan-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="flex justify-center items-center gap-2 p-2 border border-white text-center min-w-32">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        <img
                          className="w-[20px] cursor-pointer hover:scale-125"
                          src="icons/copy.png"
                          onClick={() => copyText(item.site)}
                        />
                      </td>
                      <td className="p-2 border border-white text-center min-w-32">
                        <div className="flex justify-center items-end gap-2">
                          {item.username}
                          <img
                            className="w-[20px] cursor-pointer hover:scale-125"
                            src="icons/copy.png"
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </td>
                      <td className=" p-2 border border-white text-center min-w-32">
                        <div className="flex justify-center items-end gap-2">
                          {item.password}
                          <img
                            className="w-[20px] cursor-pointer hover:scale-125"
                            src="icons/copy.png"
                            onClick={() => copyText(item.password)}
                          />
                        </div>
                      </td>
                      <td className="p-2 border border-white text-center min-w-32">
                        <div className="flex justify-center items-center gap-10">
                          <span>
                            <img
                              className="w-[20px] cursor-pointer hover:scale-125"
                              src="icons/edit.png"
                              onClick={() => editPassword(item.id)}
                            />
                          </span>
                          <span>
                            <img
                              className="w-[20px] cursor-pointer hover:scale-125"
                              src="icons/delete.png"
                              onClick={() => deletePassword(item.id)}
                            />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
