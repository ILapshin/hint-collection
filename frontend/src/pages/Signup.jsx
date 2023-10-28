import React from "react";
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

const Signup = () => {
  const history = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        re_password: e.target.re_password.value,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      history("/login/");
    } else {
      alert(data.password);
    }
  };

  return (
    <div className="">
      <div className=" h-36 w-fullinline-block text-lg"></div>
      <section className="container max-w-lg">
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
                  Рeгистрация
                </h1>
              </div>
              <form className="" onSubmit={createUser}>
                <div>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white my-1  focus:outline-none focus:bg-blue-50 text-gray-500"
                    placeholder="Имя пользователя"
                    required=""
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white my-1  focus:outline-none focus:bg-blue-50 text-gray-500"
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
                <div>
                  <input
                    type="password"
                    name="re_password"
                    id="re_password"
                    placeholder="Повторите пароль"
                    className="border-2 border-cyan-500 rounded-xl p-2 pr-4 w-full inline-block border-l-4 bg-white my-1  focus:outline-none focus:bg-blue-50 text-gray-500"
                    required=""
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    type="submit"
                    className=" bg-cyan-500 text-white rounded-xl w-32 h-10 text-center hover:bg-cyan-600  "
                  >
                    Подтвердить
                  </button>
                </div>

                <p className="text-center my-4 text-gray-400 text-md ">
                  Есть аккаунт?{"  "}
                  <Link
                    to={"/login/"}
                    className="text-center my-4 text-gray-500 text-md underline"
                  >
                    Войти
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

export default Signup;
