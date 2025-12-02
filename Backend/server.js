const express = require("express")
const cors = require("cors")
const channelRoutes = require("./src/routes/channelRoutes")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/channels", channelRoutes);


app.listen(5000, () => console.log("Server running on port 5000"));
