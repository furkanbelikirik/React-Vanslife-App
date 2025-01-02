import bgImg from "/images/about-hero.png";
import { Link } from "react-router-dom";

export default function About() {
	return (
		<section className="about-page-container">
			<img src={bgImg} className="about-hero-image" />
			<section className="container">
				<div className="about-page-content">
					<h1>
						Karavanda rahatlayabilecekken sedan arabaya sıkışmayın.
					</h1>
					<p>
						Misyonumuz, mükemmel seyahat karavanı kiralama ile
						yolculuğunuzu canlandırmaktır. Seyahat planlarınızın
						aksamadan devam edebilmesini sağlamak için
						karavanlarımız her yolculuktan önce yeniden
						sertifikalandırılır. (Aksaklık ekstra ücrete tabidir 😉)
					</p>
					<p>
						Ekibimiz, dünyayı 4 tekerlek üzerinde turlamanın
						büyüsünü ilk elden bilen vanlife tutkunlarıyla doludur.
					</p>
				</div>
				<div className="about-page-cta">
					<h2>
						Hedefiniz bekliyor.
						<br />
						Karavanınız hazır.
					</h2>
					<Link className="link-button" to="/vans">
						Karavanlarımızı keşfet
					</Link>
				</div>
			</section>
		</section>
	);
}
