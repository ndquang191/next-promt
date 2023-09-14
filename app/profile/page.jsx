"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

function MyProfile() {
	const router = useRouter();
	const { data: session } = useSession();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);

			const data = await response.json();
			console.log("PROFILE : ", data);
			setPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, []);
	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm("Delete ?");

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: "DELETE",
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);

				setPosts(filteredPosts);
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<Profile
			name="My Profile"
			desc="Welcome to your personalized profile page"
			data={posts}
			handleDelete={handleDelete}
			handleEdit={handleEdit}
		/>
	);
}

export default MyProfile;
