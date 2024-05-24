const express = require("express");

const { serverConfig, Logger } = require("./config");
const { schedulePosts } = require("./services/scheduler");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(serverConfig.PORT, () => {
	console.log(`Succesfully listening on PORT: ${serverConfig.PORT}`);
	schedulePosts();
});
