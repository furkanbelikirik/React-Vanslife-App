import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
	const { currentVan } = useOutletContext();
	return (
		<span className="host-van-price">
			₺{currentVan.price}
			<span>/günde</span>
		</span>
	);
}
