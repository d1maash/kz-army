"use client"

import Navbar from "@/components/Navbar"
import Link from "next/link"
import { useState } from "react"
import { api } from "@/utils/api"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login/", { username, password });
      console.log("Успешный вход:", response.data);
      // Можно сохранить токен или обновить состояние пользователя
    } catch (err: any) {
      console.error("Ошибка входа:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Ошибка авторизации");
    }
  };


    return (
      <>
      <Navbar />
        <div className="flex justify-center items-center bg-[#F4F4F4] w-full h-screen">
          <div className="w-full mx-10 md:w-1/3 p-12 bg-white rounded-xl shadow-lg text-center">
              <h3 className="font-bold text-xl">Войти</h3>
              <p className="text-[#7D7D7D]">Напишите ваш логин и пароль</p>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <form onSubmit={handleLogin} className="mt-6">
                <input 
                    type="text" 
                    className="w-full rounded-xl bg-[#F7F7F7] text-[#858585] p-3 pl-10 "
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                        backgroundImage: "url('/icons/user.svg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "10px center", 
                        backgroundSize: "20px 20px", 
                    }}
                />
                <input 
                    type="password" 
                    className="w-full rounded-xl mt-3 bg-[#F7F7F7] text-[#858585] p-3 "
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="w-full rounded-xl mt-6 p-3 font-medium bg-custom-yellow text-black">
                    Войти
                </button>
                    
              </form>
              <p className="mt-3 text-sm font-normal">У вас еще нет аккаунта? <span className="text-[#0084FF]"><Link href={`/auth/register`}>Зарегистрироваться</Link></span></p>
          </div>
      </div>
      </>
    )
  }
  
  export default Login