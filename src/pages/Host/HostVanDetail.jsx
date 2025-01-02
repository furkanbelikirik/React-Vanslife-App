import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { getHostVans } from "../../server/api";
import { useEffect, useState } from "react";

export default function HostVanDetail() {
	const [currentVan, setCurrentVan] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		async function loadVans() {
			setLoading(true);
			try {
				const data = await getHostVans(id);
				setCurrentVan(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		loadVans();
	}, [id]);

	if (loading) {
		return (
			<div className="container" style={{ height: "100vh" }}>
				<h1>Yükleniyor...</h1>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container" style={{ height: "100vh" }}>
				<h1>Hata: {error.message}</h1>
			</div>
		);
	}

	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	};

	return (
		<section className="host-van-detail-container">
			<Link to=".." relative="path" className="back-button">
				&larr; <span>Tüm karavanlara geri dön</span>
			</Link>
			{currentVan && (
				<div className="host-van-detail-layout-container">
					<div className="host-van-detail">
						<img src={currentVan.imageUrl} />
						<div className="host-van-detail-info-text">
							<i
								className={`van-type van-type-${currentVan.type}`}
							>
								{currentVan.type === "dayanikli"
									? "Dayanıklı"
									: currentVan.type === "luks"
										? "Lüks"
										: "Basit"}
							</i>
							<h3>{currentVan.name}</h3>
							<h4>₺{currentVan.price}/günde</h4>
						</div>
					</div>

					<nav className="host-van-detail-nav">
						<NavLink
							to="."
							end
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Detaylar
						</NavLink>
						<NavLink
							to="pricing"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Fiyatlandırma
						</NavLink>
						<NavLink
							to="photos"
							style={({ isActive }) =>
								isActive ? activeStyles : null
							}
						>
							Fotoğraflar
						</NavLink>
					</nav>
					<Outlet context={{ currentVan }} />
				</div>
			)}
		</section>
	);
}
