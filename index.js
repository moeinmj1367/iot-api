const express = require("express");
const app = express();
app.use(express.json());

let deviceState = {
  relay1: 0,
  relay2: 0,
  d6button: 0,
  temperature: 0
};

app.post("/update", (req, res) => {
  const { temperature } = req.body;
  if (temperature !== undefined) {
    deviceState.temperature = temperature;
    console.log("Temperature updated:", temperature);
  }
  res.json({ status: "ok" });
});

app.get("/state", (req, res) => {
  res.json(deviceState);
});

app.post("/relay", (req, res) => {
  const { relay, value } = req.body;

  if (relay === "relay1") deviceState.relay1 = value;
  if (relay === "relay2") deviceState.relay2 = value;

  console.log("Relay changed:", relay, value);
  res.json({ status: "ok", newState: deviceState });
});

app.post("/d6", (req, res) => {
  const { value } = req.body;
  deviceState.d6button = value;
  console.log("D6 button:", value);
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on port", PORT));

