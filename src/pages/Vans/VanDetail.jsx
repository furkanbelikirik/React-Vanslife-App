import { Link, useParams, useLocation } from "react-router-dom";
import { getVans } from "../../server/api";
import { useEffect, useState } from "react";

export default function VanDetail() {
	const [van, setVan] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();
	const location = useLocation();

	useEffect(() => {
		async function loadVans() {
			setLoading(true);
			try {
				const data = await getVans(id);
				setVan(data);
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

	const search = location.state?.search || "";
	const type = location.state?.type || "tüm";

	return (
		<section className="van-detail-container">
			<div className="container">
				<Link
					to={`..${search}`}
					relative="path"
					className="back-button"
				>
					&larr;{" "}
					<span>
						{type === "dayanikli"
							? "Dayanıklı"
							: type === "luks"
								? "Lüks"
								: "Basit"}{" "}
						karavanlara geri dön
					</span>
				</Link>

				{van && (
					<div className="van-detail">
						<img src={van.imageUrl} />
						<i className={`van-type ${van.type} selected`}>
							{van.type === "dayanikli"
								? "Dayanıklı"
								: van.type === "luks"
									? "Lüks"
									: "Basit"}
						</i>
						<h2>{van.name}</h2>
						<p className="van-price">
							<span>₺{van.price}</span>/günde
						</p>
						<p className="van-description">{van.description}</p>
						<button className="link-button">Kirala</button>
					</div>
				)}
			</div>
		</section>
	);
}
