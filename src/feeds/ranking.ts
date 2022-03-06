export interface Score {
    score: number;
}

export class Ranking {

    static sortBestScore(a: Score, b: Score) {
        if (a.score > b.score)
            return -1;
        if (a.score < b.score)
            return 1;
        return 0;

    }

}
