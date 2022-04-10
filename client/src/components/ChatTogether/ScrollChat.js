import React from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';

const ScrollChat = ({ messages }) => {
	const { user } = useSelector((state) => state.auth);

	return (
		<>
			<div className="flex flex-col h-full overflow-x-auto mb-4 border-t">
				<div className="flex flex-col h-full">
					<ScrollableFeed className="grid grid-cols-12 gap-y-2">
						{messages &&
							messages.map((m) => (
								<>
									{m.sender._id === user._id ? (
										<div
											className="col-start-6 col-end-13 p-3 rounded-lg"
											key={m._id}
										>
											<div className="flex items-center justify-start flex-row-reverse">
												<div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
													<div>{m.content}</div>
												</div>
											</div>
										</div>
									) : (
										<div
											className="col-start-1 col-end-8 p-3 rounded-lg"
											key={m._id}
										>
											{m.chat.isGroupChat === true ? (
												<p className="mb-2 text-sm">{m.sender.name}</p>
											) : null}
											<div className="flex flex-row items-center">
												<img
													className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
													src={m.sender.avatar.url}
													alt=""
												/>
												<div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
													<div>{m.content}</div>
												</div>
											</div>
										</div>
									)}
								</>
							))}
					</ScrollableFeed>
				</div>
			</div>
		</>
	);
};

export default ScrollChat;
