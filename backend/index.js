const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "https://payment-gateway-nu-nine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
  return res.json({ message: "healthy server" });
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
