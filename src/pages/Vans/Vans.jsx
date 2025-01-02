import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../server/api.js";
import { useState, useEffect } from "react";

export default function Vans() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [vans, setVans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const typeFilter = searchParams.get("type");

	useEffect(() => {
		async function loadVans() {
			setLoading(true);
			try {
				const data = await getVans();
				setVans(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}

		loadVans();
	}, []);

	const displayedVans = typeFilter
		? vans.filter((van) => van.type === typeFilter)
		: vans;

	const vanElements = displayedVans.map((van) => (
		<div key={van.id} className="van-tile">
			<Link
				to={van.id}
				state={{
					search: `?${searchParams.toString()}`,
					type: typeFilter,
				}}
			>
				<img src={van.imageUrl} />
				<div className="van-info">
					<h3>{van.name}</h3>
					<p>
						₺{van.price}
						<span>/günde</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>
					{van.type === "dayanikli"
						? "Dayanıklı"
						: van.type === "luks"
							? "Lüks"
							: "Basit"}
				</i>
			</Link>
		</div>
	));

	function handleFilterChange(key, value) {
		setSearchParams((prevParams) => {
			if (value === null) {
				prevParams.delete(key);
			} else {
				prevParams.set(key, value);
			}
			return prevParams;
		});
	}

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

	return (
		<section className="van-list-container">
			<div className="container">
				<h1>Karavan seçeneklerimizi keşfet...</h1>
				<div className="van-list-filter-buttons">
					<button
						onClick={() => handleFilterChange("type", null)}
						className={`van-type all
                        ${typeFilter === null ? "selected" : ""}`}
					>
						Hepsi
					</button>
					<button
						onClick={() => handleFilterChange("type", "basit")}
						className={`van-type basit 
                        ${typeFilter === "basit" ? "selected" : ""}`}
					>
						Basit
					</button>
					<button
						onClick={() => handleFilterChange("type", "luks")}
						className={`van-type luks 
                        ${typeFilter === "luks" ? "selected" : ""}`}
					>
						Lüks
					</button>
					<button
						onClick={() => handleFilterChange("type", "dayanikli")}
						className={`van-type dayanikli 
                        ${typeFilter === "dayanikli" ? "selected" : ""}`}
					>
						Dayanıklı
					</button>
				</div>
				<div className="van-list">{vanElements}</div>
			</div>
		</section>
	);
}
