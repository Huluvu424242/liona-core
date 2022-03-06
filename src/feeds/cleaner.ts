// import {FeedMetadata} from "./feedmetadata";
import {Feed} from "feedme";
import {from, Subscription, timer} from "rxjs";
import {filter, switchMap} from "rxjs/operators";
import {Logger} from "../shared/logger";


export interface FeedMetadata {
    lastRequested: Date; // contains time in typescript
    url: string;
    period: number;
    withStatistic: boolean;
    data: Feed;
    subscription: Subscription;
}

const JOB_PERIOD: number = 60000 * 30; // alle 30 Minuten
const TIMEOUT_DELTA: number = 60000 * 60; // alle 60 Minuten

export class Cleaner {

    protected LOG: Logger = new Logger();

    protected feedMap: Map<string, FeedMetadata>;
    protected subscription: Subscription;

    public constructor(feedMap: Map<string, FeedMetadata>) {
        this.feedMap = feedMap;
        this.subscription = this.startCleanup();
    }

    protected startCleanup(): Subscription {
        const cleanUpJob$ = timer(0, JOB_PERIOD).pipe(
            switchMap(
                () => from(this.feedMap.keys())
            ),

            filter((key: string) => {
                const feedMetadata: FeedMetadata = this.feedMap.get(key) as FeedMetadata
                if (!feedMetadata) return true; // -> entfernen
                const current: number = Date.now();
                if ((current - feedMetadata.lastRequested.getTime()) > TIMEOUT_DELTA) {
                    feedMetadata.subscription.unsubscribe();
                    return true;
                } else {
                    return false;
                }
            }),
        );
        return cleanUpJob$.subscribe(
            (key: string) => {
                this.feedMap.delete(key);
                this.LOG.logDebug("Subscription für Key " + key + " beendet.");
            }
        );
    }

}
