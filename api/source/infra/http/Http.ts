export default interface Http {
    route(url: string, method: string, authentication: boolean, callback: Function): void;
    listen(port: number): void;
}