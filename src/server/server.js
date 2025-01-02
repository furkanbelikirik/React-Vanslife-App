import { createServer, Model, Response } from "miragejs";

createServer({
	models: {
		vans: Model,
		users: Model,
	},

	seeds(server) {
		server.create("van", {
			id: "1",
			name: "Mütevazı Kaşif",
			price: 600,
			description:
				"Mütevazı Kaşif, sizi evden çıkarıp doğaya götürmek için tasarlanmış bir karavan. Bu güzellik, güneş panelleri, kompost tuvalet, su tankı ve mini mutfak ile donatılmıştır. Amaç, evinizi toplayıp bir hafta sonu ya da daha uzun süre kaçmanızı sağlamaktır!",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png",
			type: "basit",
			hostId: "123",
		});
		server.create("van", {
			id: "2",
			name: "Plaj Aşığı",
			price: 800,
			description:
				"Plaj Aşığı, sörfçüler ve gezginlerden ilham alınarak tasarlanmıştır. Taşınabilir bir ev olarak düşünülmüştür, ancak sıradan bir karavanda bulamayacağınız bazı harika özelliklere sahiptir.",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/beach-bum.png",
			type: "dayanikli",
			hostId: "123",
		});
		server.create("van", {
			id: "3",
			name: "Güvenilir Kırmızı",
			price: 1000,
			description:
				"Güvenilir Kırmızı, seyahat etmek için yapılmış bir karavandır. İç mekanı konforlu ve rahattır, uzanmanız için bolca alan sunar. Küçük bir mutfağı da bulunmaktadır, böylece yemek pişirmeniz gerekirse bunu yapabilirsiniz. İçeri girdiğiniz anda kendinizi evinizde gibi hissedeceksiniz.",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
			type: "luks",
			hostId: "456",
		});
		server.create("van", {
			id: "4",
			name: "Rüya Bulucu",
			price: 650,
			description:
				"Rüya Bulucu, seyahat etmek ve deneyimlemek için mükemmel bir karavandır. 2,1 m tavan yüksekliği ile bu karavanda ayakta durabilirsiniz ve oldukça geniş bir baş mesafesi sunar. Zemin, temizlemesi kolay ve çok dayanıklı bir cam elyaf takviyeli plastikten (GRP) yapılmıştır. Büyük bir arka pencere ve geniş yan pencereler içeriyi oldukça aydınlık ve iyi havalandırılmış hale getirir.",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
			type: "basit",
			hostId: "789",
		});
		server.create("van", {
			id: "5",
			name: "Gezgin",
			price: 1200,
			description:
				"Gezgin, konfor ve lüks içinde seyahat etmeyi sevenler için bir karavandır. Çok sayıda penceresi, geniş iç mekanı ve bol depolama alanı ile Gezgin, nereye giderseniz gidin güzel bir manzara sunar.",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
			type: "luks",
			hostId: "789",
		});
		server.create("van", {
			id: "6",
			name: "Yeşil Harika",
			price: 700,
			description:
				"Bu karavanla seyahat hayatınızı bir sonraki seviyeye taşıyabilirsiniz. Yeşil Harika, şık ve çevre dostu bir ulaşım aracı arayan, her yere gidebilecek bir araç isteyen insanlar için mükemmeldir.",
			imageUrl:
				"https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
			type: "dayanikli",
			hostId: "123",
		});

		server.create("user", {
			id: "123",
			email: "b@b.com",
			password: "p123",
			name: "Bob",
		});
	},

	routes() {
		this.namespace = "api";
		this.logging = false;
		// this.timing = 2000

		this.get("/vans", (schema, request) => {
			return schema.vans.all();
		});

		this.get("/vans/:id", (schema, request) => {
			const id = request.params.id;
			return schema.vans.find(id);
		});

		this.get("/host/vans", (schema, request) => {
			return schema.vans.where({ hostId: "123" });
		});

		this.get("/host/vans/:id", (schema, request) => {
			const id = request.params.id;
			return schema.vans.findBy({ id, hostId: "123" });
		});

		this.post("/login", (schema, request) => {
			const { email, password } = JSON.parse(request.requestBody);
			const foundUser = schema.users.findBy({ email, password });
			if (!foundUser) {
				return new Response(
					401,
					{},
					{ message: "No user with those credentials found!" },
				);
			}
			foundUser.password = undefined;
			return {
				user: foundUser,
				token: "Enjoy your pizza, here's your tokens.",
			};
		});
	},
});
