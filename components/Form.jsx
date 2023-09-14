import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type}</span>
			</h1>

			<p className="desc text-left max-w-md">
				{type} and Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum labore cumque,
				laudantium reiciendis debitis sed incidunt quos expedita, ab sapiente voluptatibus maxime
				vel error minima doloribus aliquam. Cupiditate, voluptas iste?
			</p>

			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label htmlFor="">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>

					<textarea
						name=""
						id=""
						cols="30"
						rows="10"
						value={post.prompt}
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						required
						className="form_textarea"
					></textarea>
				</label>

				{/*  */}

				<label htmlFor="">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag
						<span className="font-normal">(#product , #webdev)</span>
					</span>

					<textarea
						value={post.tag}
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						placeholder="#tag"
						required
						className="form_input"
					></textarea>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href={"/"} className="text-gray-500 text-sm">
						Cancle
					</Link>

					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting ? `{type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
