import express from "express";
import axios from "axios";
import "dotenv/config";
import moment from "moment-timezone";
import path from "path";
import replaceSpecialCharacters from "replace-special-characters";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), "./index.html"));
});

app.post("/api", async (req, res) => {
    const msg = replaceSpecialCharacters(
        ((req.body.msg as string) || "").slice(0, 16)
    );

    let err = null;
    console.log({
        time: moment().tz("Europe/Rome").format("DD/MM/YYYY HH:mm"),
        msg
    });
    try {
        await axios.post("http://192.168.1.142/pronto", null, {
            params: {
                time: moment().tz("Europe/Rome").format("DD/MM/YYYY HH:mm"),
                msg
            }
        });
    } catch (reqErr) {
        err = axios.isAxiosError(reqErr)
            ? reqErr.response?.data
            : "Unknown error";
        console.log(err || reqErr);
    }
    res.json({ err });
});

const PORT = Number(process.env.PORT) || 3000;
const IP = process.env.IP || "127.0.0.1";
app.listen(PORT, IP, () => {
    console.log(`Server started on ${IP}:${PORT}`);
});
