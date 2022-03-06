import {FeedMetadata} from "./cleaner";
import {from, Observable} from "rxjs";
import {map, tap, toArray} from "rxjs/operators";
import {Ranking, Score} from "./ranking";
import {Logger} from "../shared/logger";

export interface StatisticData extends Score {
    url: string;
    countRequested: number;
    countContacted: number;
    countResponseOK: number;
}

export class Statistic {

    protected LOG: Logger = new Logger();

    protected feedMap: Map<string, FeedMetadata>;
    protected statisticMap: Map<string, StatisticData>;

    public constructor(feedMap: Map<string, FeedMetadata>) {
        this.feedMap = feedMap;
        this.statisticMap = new Map();
    }

    public getStatistics(): Observable<StatisticData[]> {
        return from(this.statisticMap.values()).pipe(toArray());
    }

    public getRankedStatistics(): Observable<StatisticData[]> {
        return this.getStatistics()
            .pipe(
                tap(
                    (items: StatisticData[]) => {
                        items.forEach((item: StatisticData) => {
                            this.LOG.logDebug("Compute Statistic for " + JSON.stringify(item));
                            item.score = item.countRequested * (item.countResponseOK / item.countContacted) || 0;
                            this.LOG.logDebug("Computed Item " + JSON.stringify(item));
                        });
                    }
                ),
                map((items: StatisticData[]) => items.sort(Ranking.sortBestScore))
            );
    }

    public feedWasRequested(key: string) {
        const statisticData: StatisticData | null = this.getStatisticData(key);
        if (statisticData) {
            statisticData.countRequested++;
        }
    }

    public feedWasContacted(key: string) {
        const statisticData: StatisticData | null = this.getStatisticData(key);
        if (statisticData) {
            statisticData.countContacted++;
        }
    }

    public feedResponseWasOK(key: string) {
        const statisticData: StatisticData | null = this.getStatisticData(key);
        if (statisticData) {
            statisticData.countResponseOK++;
        }
    }

    protected getStatisticData(key: string): StatisticData | null {
        this.LOG.logDebug("Ermittle Statistic für " + key);
        const feedMetadata: FeedMetadata = this.feedMap.get(key) as FeedMetadata;
        this.LOG.logDebug("Feed gefunden für " + key);
        if (!feedMetadata.withStatistic) {
            this.LOG.logDebug("Keine Statistic erlaubt für " + key);
            return null; // keine Statistic anlegen
        }
        if (!this.statisticMap.has(key)) {
            this.LOG.logDebug("Neue Statistik angelegt für " + key);
            this.statisticMap.set(key, {
                url: feedMetadata.url,
                countRequested: 0,
                countContacted: 0,
                countResponseOK: 0,
                score: 0
            });
        }
        return this.statisticMap.get(key) as StatisticData;
    }

}
