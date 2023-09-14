import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("Mongo DB connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "share_prompt",
			// userNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;
		console.log("Mongo Connected hello World");
	} catch (err) {
		console.log(err);
	}
};
