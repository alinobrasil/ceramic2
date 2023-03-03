
## how to use this

THere's a lot of stuff going on here.
-ceramic node
-graphiql server
-next js frontend app

If you run npm run dev, it's gonna first create composites based on what's in your composites folder. Any new models in there should get indexed.

But if you need to restart webapp for any reason, gotta boot up ceramic node all over even when you are not gonna add new composites.

Better to do thish when developing:
Run ceramic node on its own:

```npm run ceramic```

This can take several minutes.

Then run graphiql server separately:
```npx composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=your_private_key --port=5005```

Then run next js app.
```npm run nextDev```
Takes only a few seconds to run next app.





# EthDenver 2023 Demo instructions
Due to the nature of the Ceramic Daemon certain files must be updated to work with your local machine. Please follow the following directions carefully to ensure functionality.
1. Clone the repository.
2. You must run `npm i`
3. You must start the server with `npm run dev` once. You may continue to use this command if you'd like however it will close all Ceramic connections at the first error. It is recommended that once your node is configured to index the required models that you run `npm run ceramic` & `npm run nextDev` separately to avoid this eager quitting.
4. Enjoy this demo application! 

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[Slides used for the workshop](https://docs.google.com/presentation/d/1KOc8YMVx19MN4dGs9fBcoWWFou-0OayRfzbVB3vcCbE/edit#slide=id.g21122e77069_0_128).

## Learn More

To learn more about Ceramic please visit the following links

- [Ceramic Documentation](https://developers.ceramic.network/learn/welcome/) - Learn more about the Ceramic Ecosystem.
- [ComposeDB](https://composedb.js.org/) - Details on how to use and develop with ComposeDB!

You can check out [Create Ceramic App repo](https://github.com/ceramicstudio/create-ceramic-app) and provide us with your feedback or contributions! 
