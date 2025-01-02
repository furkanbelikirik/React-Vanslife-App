import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	};

	return (
		<section className="host-container">
			<div className="container">
				<nav className="host-nav">
					<NavLink
						to="."
						end
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Anasayfa
					</NavLink>

					<NavLink
						to="income"
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Gelir
					</NavLink>

					<NavLink
						to="vans"
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Karavanlar
					</NavLink>

					<NavLink
						to="reviews"
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Değerlendirmeler
					</NavLink>
				</nav>
				<Outlet />
			</div>
		</section>
	);
}
