


export class Logger{

    protected isLogActive = true;

    public logError(error: Error) {
        if (console) {
            console.error(error);
        }
    }

    public logDebug(message: string) {
        if (this.isLogActive && console) console.debug(message);
    }

    public logInfo(message: string) {
        if (this.isLogActive && console) console.info(message);
    }
}
