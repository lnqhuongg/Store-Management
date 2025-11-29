'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Authenticate  } from "@/app/controllers/Authentication/AuthenticationController";

export interface Account {
    id: string;
    username: string;
    password: string;
    role: "admin" | "staff";
}

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState(""); // lỗi sai tên đăng nhập/mật khẩu

    const handleLogin = async () => {
        const newErrors = { username: "", password: "" };
        setLoginError("");

        if (!username.trim()) newErrors.username = "Vui lòng nhập tên đăng nhập";
        if (!password.trim()) newErrors.password = "Vui lòng nhập mật khẩu";

        setErrors(newErrors);

        if (newErrors.username || newErrors.password) return;

        // Gọi API thật
        const res = await Authenticate({ username, password });

        

        // Nếu backend trả lỗi
        if (!res.success) {
            alert(res.message || "Đăng nhập thất bại!");
            return;
        }

        // Lấy user
        const user = res.dataDTO;

        // Nếu status = 0 → Tài khoản khóa
        if (user.status === 0) {
            setLoginError("Tài khoản đã bị khóa!");
            return;
        }

        // ==== Điều hướng theo role ====
        if (user.role === "admin") {
            router.push("/admin/ThongKe");
        } else if (user.role === "staff") {
            router.push("/staff");
        } else {
            setLoginError(`Không xác định role: ${user.role}`);
        }
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