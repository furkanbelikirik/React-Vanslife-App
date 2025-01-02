import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="container">
			<div className="not-found-container">
				<h1>Üzgünüz, aradığınız sayfa bulunamadı.</h1>
				<Link to="/" className="link-button">
					Anasayfaya dön
				</Link>
			</div>
		</div>
	);
}
