import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../server/api";
import { useState } from "react";
import { useAuth } from "../server/authContext";

export default function Login() {
	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);

	const { login } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const from = location.state?.from || "/host";

	function handleSubmit(e) {
		e.preventDefault();
		setStatus("submitting");
		loginUser(loginFormData)
			.then((data) => {
				setError(null);
				login();
				navigate(from, { replace: true });
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setStatus("idle");
			});
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className="login-container">
			<div className="container">
				{location.state?.message && (
					<h3 className="login-error">{location.state.message}</h3>
				)}
				<h1>Hesabınıza giriş yapın</h1>
				{error?.message && (
					<h3 className="login-error">{error.message}</h3>
				)}

				<form onSubmit={handleSubmit} className="login-form">
					<input
						name="email"
						onChange={handleChange}
						type="email"
						placeholder="E-mail adresi"
						value={loginFormData.email}
					/>
					<input
						name="password"
						onChange={handleChange}
						type="password"
						autoComplete="current-password"
						placeholder="Şifre"
						value={loginFormData.password}
					/>
					<button disabled={status === "submitting"}>
						{status === "submitting"
							? "Giriş yapılıyor..."
							: "Giriş yap"}
					</button>
				</form>

				<p>E-Mail: b@b.com / Şifre: p123</p>
			</div>
		</div>
	);
}
