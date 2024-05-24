const cron = require("node-cron");
const  PostService  = require("./post-service");

const schedulePosts = () => {
	cron.schedule("* * * * *", async () => {
		try {
			await PostService.publishScheduledPosts();
		} catch (error) {
			console.error("Error running scheduler:", error);
		}
	});
};

module.exports = {
	schedulePosts,
};
