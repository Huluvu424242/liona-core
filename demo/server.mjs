import express from 'express';
import path from 'path'
import  {getFeed} from '../dist/esm/index'

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')))
    .get('/feed', (req, res) => res.send(getNewsFeed()))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.listen(5000);

const getNewsFeed = () => {
    return getFeed("https://www.zdf.de/rss/zdf/nachrichten").toPromise();
};

