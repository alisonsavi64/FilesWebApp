import ExpressHttp from "./infra/http/ExpressHttp";

const http = new ExpressHttp();

http.listen(5000);