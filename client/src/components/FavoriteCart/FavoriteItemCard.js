import React from 'react';

export const FavoriteItemCard = ({ item, removeCarsCart }) => {
	return (
		// <div>
		// 	<div className="CartItemCard">
		// 		<h4>Product: {item.name}</h4>
		// 		<h4>Image: {item.image}</h4>
		// 		<h4>Available: {item.available}</h4>
		// 		<h4>{`Price: ₹${item.rentPerDay}`}</h4>
		// 		<button onClick={() => removeCarsCart(item.car)}>Remove</button>
		// 	</div>
		// </div>
		<tbody>
			<tr>
				<td class="hidden pb-4 md:table-cell">
					<a href="#">
						<img
							src="https://limg.app/i/Cute-Constrictor-Super-Sexy-Military-Enforcer-W7mvBp.png"
							class="w-20 rounded"
							alt="Thumbnail"
						/>
					</a>
				</td>

				<td>
					<p class="mb-2 md:ml-0"> {item.name}</p>
					<form action="" method="POST">
						<button type="submit" class="text-gray-700 md:ml-0">
							<small>(Remove item)</small>
						</button>
					</form>
				</td>

				<td class="justify-center md:justify-end md:flex md:mt-4">
					<div class="w-20 h-10">
						<div class="relative flex flex-row w-full h-8">
							<input
								type="number"
								value="3"
								class="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
							/>
						</div>
					</div>
				</td>
				<td class="hidden text-right md:table-cell">
					<span class="text-sm lg:text-base font-medium">49,600.01€</span>
				</td>
				<td class="text-right">
					<span class="text-sm lg:text-base font-medium">148,800.03€</span>
				</td>
			</tr>
		</tbody>
	);
};
