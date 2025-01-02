import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
	const { currentVan } = useOutletContext();

	return (
		<section className="host-van-detail-info">
			<div className="host-van-detail-info-row">
				İsim: <span>{currentVan.name}</span>
			</div>
			<div className="host-van-detail-info-row">
				Kategori:{" "}
				<span>
					{" "}
					{currentVan.type === "dayanikli"
						? "Dayanıklı"
						: currentVan.type === "luks"
							? "Lüks"
							: "Basit"}
				</span>
			</div>
			<div className="host-van-detail-info-row">
				Açıklama: <span>{currentVan.description}</span>
			</div>
			<div className="host-van-detail-info-row">
				Görünürlük: <span>Herkes</span>
			</div>
		</section>
	);
}
