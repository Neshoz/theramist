import app from "./app";

(async () => {
  const port: number = Number.parseInt(process.env.PORT as string) || 8002;

  app().listen(port, () => {
    console.log(`Account service is running on port: ${port}`);
  });
})();
