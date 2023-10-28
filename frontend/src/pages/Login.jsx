import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import {
  GoCheck,
  GoCheckCircle,
  GoChevronLeft,
  GoPencil,
  GoPlusCircle,
  GoTriangleDown,
  GoTriangleRight,
  GoX,
} from "react-icons/go";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const history = useNavigate();

  return (
    <div className=" ">
      <div className=" h-36 w-fullinline-block text-lg"></div>
      <section className="container max-w-lg ">
        <div className="">
          <div className="">
            <div className="">
              <div className=" relative">
                <button
                  className="float-left text-gray-300 hover:text-gray-500 cursor-pointer absolute left-0"
                  onClick={(e) => {
                    e.preventDefault();
                    history("/");
                  }}
                >
                  <GoChevronLeft size="2em" />
                </button>
                <h1 className=" text-center my-4 text-gray-500 text-xl font-bold">
                  Вход в аккаунт
                </h1>
              </div>

              <form className="" onSubmit={loginUser}>
                <div>
                  <input
                    type="email"
                    name="username"
                    id="username"
                    className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white my-1 focus:outline-none focus:bg-blue-50 text-gray-500"
                    placeholder="Email"
                    required=""
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white my-1  focus:outline-none focus:bg-blue-50 text-gray-500"
                    required=""
                  />
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className=" bg-cyan-500 text-white rounded-xl w-32 h-10 text-center hover:bg-cyan-600  "
                  >
                    Войти
                  </button>
                </div>

                <p className="text-center my-4 text-gray-400 text-md ">
                  Нет аккаунта?{"  "}
                  <Link
                    to={"/signup/"}
                    className="text-center my-4 text-gray-500 text-md underline"
                  >
                    Создать
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
