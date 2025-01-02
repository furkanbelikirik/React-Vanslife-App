import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../server/authContext";

export default function Header() {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const { isLoggedIn, logout } = useAuth();

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (!event.target.closest(".menu-container-mobile")) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);
	const toggleMenu = () => {
		setMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
	};

	function logOut() {
		localStorage.removeItem("loggedin");
		logout();
	}

	return (
		<header>
			<div className="container">
				<Link className="site-logo" to="/">
					#VanLife
				</Link>
				{window.matchMedia("(min-width: 800px)").matches ? (
					<nav className="menu-container">
						{isLoggedIn ? (
							<NavLink
								to="/host"
								style={({ isActive }) =>
									isActive ? activeStyles : null
								}
								onClick={closeMenu}
							>
								Yönetim Paneli
							</NavLink>
						) : (
							""
						)}
						<NavLink
							to="/about"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Hakkımızda
						</NavLink>
						<NavLink
							to="/vans"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Karavanlar
						</NavLink>
						{isLoggedIn ? (
							<Link to={"/"} onClick={logOut}>
								Çıkış Yap
							</Link>
						) : (
							<Link to="login">Giriş Yap</Link>
						)}
					</nav>
				) : (
					<nav className="menu-container-mobile">
						<input
							type="checkbox"
							id="mobile-menu-toggle"
							className="mobile-menu-toggle"
							checked={isMenuOpen}
							onChange={toggleMenu}
						/>
						<label
							htmlFor="mobile-menu-toggle"
							className="mobile-menu-icon"
						>
							<span></span>
							<span></span>
							<span></span>
						</label>
						<nav
							className={`mobile-menu ${
								isMenuOpen ? "open" : ""
							}`}
						>
							{isLoggedIn ? (
								<NavLink
									to="/host"
									style={({ isActive }) =>
										isActive ? activeStyles : null
									}
									onClick={closeMenu}
								>
									Yönetim Paneli
								</NavLink>
							) : (
								""
							)}
							<NavLink
								to="/about"
								style={({ isActive }) =>
									isActive ? activeStyles : null
								}
								onClick={closeMenu}
							>
								Hakkımızda
							</NavLink>
							<NavLink
								to="/vans"
								style={({ isActive }) =>
									isActive ? activeStyles : null
								}
								onClick={closeMenu}
							>
								Karavanlar
							</NavLink>
							{isLoggedIn ? (
								<Link
									to={"/"}
									onClick={() => {
										logOut();
										closeMenu();
									}}
								>
									Çıkış Yap
								</Link>
							) : (
								<Link to="login" onClick={closeMenu}>
									Giriş Yap
								</Link>
							)}
						</nav>
					</nav>
				)}
			</div>
		</header>
	);
}
