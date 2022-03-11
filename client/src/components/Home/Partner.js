const Partner = () => {
	return (
		<div className="2xl:px-20 md:px-10 2xl:mx-auto 2xl:container">
			<div className="md:py-12 py-8 px-4">
				<div className="flex flex-col items-center justify-center">
					<h1 className="lg:text-5xl md:text-4xl text-2xl font-bold leading-10 text-gray-800">
						Our Trusted Partners
					</h1>
					<p className="text-base leading-normal text-center text-gray-600 mt-4 xl:w-1/2 w-10/12">
						We just got featured in the following magazines and it has been the
						most incredible journey. We work with the car tourist magazines
						across the world
					</p>
				</div>
				<div className="flex items-center justify-center mt-10">
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/kia.jpg"
								alt=""
							/>
						</div>
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/hyundai.jpg"
								alt=""
							/>
						</div>
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/mg.jpg"
								alt=""
							/>
						</div>
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/mercedes-benz.jpg"
								alt=""
							/>
						</div>
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/toyota.jpg"
								alt=""
							/>
						</div>
						<div className="md:w-48 w-full h-32 flex items-center justify-center">
							<img
								width={100}
								height={24}
								src="https://stimg.cardekho.com/pwa/img/brandLogo_168x84/honda.jpg"
								alt=""
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Partner;
