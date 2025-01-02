import { Link } from "react-router-dom";

export default function Home() {
	return (
		<section className="home-container">
			<div className="container">
				<h1>
					Senin seyahat planların var, bizim de seyahat
					karavanlarımız.
				</h1>
				<p>
					#vanlife hareketine katılarak hayatınıza macera katın.
					Mükemmel yolculuğunuzu gerçekleştirmek için mükemmel
					karavanı kiralayın.
				</p>
				<Link to="vans">Karavanını bul</Link>
			</div>
		</section>
	);
}
