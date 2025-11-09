'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface Account {
    id: string;
    username: string;
    password: string;
    role: "admin" | "staff";
}

const demoAdminAccount: Account = {
    id: "A001",
    username: "admin",
    password: "123",
    role: "admin",
};

const demoStaffAccount: Account = {
    id: "A001",
    username: "staff",
    password: "123",
    role: "staff",
};

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(""); // lỗi sai tên đăng nhập/mật khẩu

    const handleLogin = () => {
        const newErrors = { username: "", password: "" };
        setLoginError(""); // reset lỗi cũ

        // Kiểm tra để trống
        if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập";
        if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";
        setErrors(newErrors);

        // Nếu có lỗi trống thì dừng lại
        if (newErrors.username || newErrors.password) return;

        // nếu username & password nhập vào trùng với username & password của admin 
        // chuyển đến trang admin --- này mới là data mẫu, mốt còn duyệt xem role của Account là gì
        // tương tự cho staff 
        if (
            username === demoAdminAccount.username &&
            password === demoAdminAccount.password
        ) {
            router.push("/admin/ThongKe");
        } else if (
            username === demoStaffAccount.username &&
            password === demoStaffAccount.password
        ) {
            router.push("/staff");
        } else {
            setLoginError("Sai tên đăng nhập hoặc mật khẩu!");
            return;
        }

        // Nếu đúng → đăng nhập thành công

    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-120">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Đăng nhập
                </h2>

                {/* Thông báo lỗi chung */}
                {loginError && (
                    <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded-lg text-sm text-center">
                        {loginError}
                    </div>
                )}

                {/* Ô nhập tên đăng nhập */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Tên đăng nhập
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
                            }`}
                        placeholder="Nhập tên đăng nhập"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Ô nhập mật khẩu */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-indigo-400"
                            }`}
                        placeholder="Nhập mật khẩu"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
                >
                    Đăng nhập
                </button>
            </div>
        </div>
    );
}