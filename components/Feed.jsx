"use client";

import { useEffect, useState } from "react";
import PromptCart from "./PromptCart";
import { trailingSlash } from "@next.config";

const PromptCartList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => (
				<PromptCart key={post._6id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};
const Feed = () => {
	const [searchText, setSearchText] = useState();
	const [posts, setPosts] = useState([]);

	const handleSearchChange = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/prompt");

			const data = await response.json();
			console.log("DÂTA", data);
			setPosts(data);
		};

		fetchPosts();
	}, []);
	return (
		<section className="feed">
			<form action="" className="relative w-full flex-center">
				<input
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					placeholder="Search for ...."
					required
					className="search_input peer"
				></input>
			</form>

			<PromptCartList data={posts} handleTagClick={() => {}} />
		</section>
	);
};

export default Feed;
