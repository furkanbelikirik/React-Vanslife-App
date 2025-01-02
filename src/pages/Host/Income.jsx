export default function Income() {
	const transactionsData = [
		{ amount: 7200, date: "Ocak 3, '24", id: "1" },
		{ amount: 5600, date: "Haziran 12, '24", id: "2" },
		{ amount: 9800, date: "Eylül 3, '24", id: "3" },
	];
	return (
		<section className="host-income-container">
			<h1>Gelir</h1>
			<p>
				Son <span>30</span> günde
			</p>
			<h2>₺60000</h2>
			<img
				className="graph"
				src="/images/income-graph.png"
				alt="Gelir Tablosu"
			/>
			<div className="info-header">
				<h3>Harcamalarınız ({transactionsData.length})</h3>
				<p>
					Son <span>30 günde</span>
				</p>
			</div>
			<div className="transactions">
				{transactionsData.map((item) => (
					<div key={item.id} className="transaction">
						<h3>₺{item.amount}</h3>
						<p>{item.date}</p>
					</div>
				))}
			</div>
		</section>
	);
}
