import { Link } from "react-router-dom";
import { getHostVans } from "../../server/api";
import { useEffect, useState } from "react";

export default function HostVans() {
	const [vans, setVans] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function loadVans() {
			setLoading(true);
			try {
				const data = await getHostVans();
				setVans(data);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		}
		loadVans();
	}, []);

	const hostVansEls = vans.map((van) => (
		<div className="host-van-single" key={van.id}>
			<Link to={van.id} key={van.id} className="host-van-link-wrapper">
				<img src={van.imageUrl} alt={`Photo of ${van.name}`} />
			</Link>
			<div className="host-van-info">
				<Link
					to={van.id}
					key={van.id}
					className="host-van-link-wrapper"
				>
					<h3>{van.name}</h3>
				</Link>
				<p>₺{van.price}/günde</p>
			</div>
		</div>
	));

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
		<section className="host-vans-container">
			<h1 className="host-vans-title">Karavanlarınız</h1>
			<div className="host-vans-page-list">
				{vans.length > 0 ? <>{hostVansEls}</> : <h2>Yükleniyor...</h2>}
			</div>
		</section>
	);
}
