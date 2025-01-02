import { BsStarFill } from "react-icons/bs";

export default function Reviews() {
	const reviewsData = [
		{
			rating: 5,
			name: "Furkan",
			date: "Haziran 13, 2024",
			text: "Plaj serserisi harika bir minibüs! O kadar rahat bir yolculuk ki. 2 haftadır kullanıyoruz ve tek bir sorun bile yaşanmadı. Aldığımızda süper temizdi ve ev sahibi çok rahat ve anlayışlıydı. Kesinlikle tavsiye ederim!",
			id: "1",
		},
		{
			rating: 5,
			name: "İlay",
			date: "Eylül 3, 2024",
			text: "Bu bizim seyahatlerimizde Modest Explorer'ı üçüncü kullanışımız ve buna bayıldık! Hiçbir şikayetim yok, kesinlikle mükemmel!",
			id: "2",
		},
	];

	return (
		<section className="host-reviews-container">
			<div className="top-text">
				<h1>Değerlendirmeleriniz</h1>
				<p>
					Son <span>30 günde</span>
				</p>
			</div>
			<img
				className="graph"
				src="/images/reviews-graph.png"
				alt="Değerlendirme Tablosu"
			/>
			<h3>Yorumlar ({reviewsData.length})</h3>
			{reviewsData.map((review) => (
				<article key={review.id}>
					<div className="review">
						{[...Array(review.rating)].map((_, i) => (
							<BsStarFill className="review-star" key={i} />
						))}
						<div className="info">
							<p className="name">{review.name}</p>
							<p className="date">{review.date}</p>
						</div>
						<p>{review.text}</p>
					</div>
					<hr />
				</article>
			))}
		</section>
	);
}
