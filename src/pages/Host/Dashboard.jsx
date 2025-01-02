import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import { getHostVans } from "../../server/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
	const [vans, setVans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		setLoading(true);
		getHostVans()
			.then((data) => setVans(data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, []);

	function renderVanElements(vans) {
		const hostVansEls = vans.map((van) => (
			<div className="host-van-single" key={van.id}>
				<img src={van.imageUrl} alt={`Photo of ${van.name}`} />
				<div className="host-van-info">
					<h3>{van.name}</h3>
					<p>₺{van.price}/günde</p>
				</div>
				<Link to={`vans/${van.id}`}>Görüntüle</Link>
			</div>
		));

		return (
			<div className="host-vans-list" style={{ height: "100vh" }}>
				<section>{hostVansEls}</section>
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
		<div className="host-dashboard-container">
			<section className="host-dashboard-earnings">
				<div className="info">
					<h1>Hoşgeldin!</h1>
					<p>
						Son <span>30 gündeki</span> gelir
					</p>
					<h2>₺60000</h2>
				</div>
				<Link to="income">Detaylar</Link>
			</section>
			<section className="host-dashboard-reviews">
				<h2>Değerlendirme puanı</h2>

				<BsStarFill className="star" />

				<p>
					<span>5.0</span>/5
				</p>
				<Link to="reviews">Detaylar</Link>
			</section>
			<section className="host-dashboard-vans">
				<div className="top">
					<h2>Karavanlarınız</h2>
					<Link to="vans">Hepsini gör</Link>
				</div>
				{loading && !vans ? (
					<h1>Yükleniyor...</h1>
				) : (
					<>{renderVanElements(vans)}</>
				)}
			</section>
		</div>
	);
}
