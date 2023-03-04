
## how to use this
This project contains:
-ceramic node
-graphiql server
-next js frontend app

If you run npm run dev, it's gonna first create composites based on what's in your composites folder. Any new models in there should get indexed. Then it'll boot up cermaic node, then graphiql server, then a webapp.

But if you need to restart webapp for any reason, gotta boot up ceramic node all over even when you are not gonna add new composites.


Run ceramic node on its own:

```npm run ceramic```

This can take several minutes. If you need to deploy new composites (new schemas), there's some other stuff you need to do:


Then run graphiql server separately:
```npx composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=your_private_key --port=5005```

Then run next js app.
```npm run nextDev```
Takes only a few seconds to run next app.

This project contains stuff from ceramic's eth denver workshop:
https://github.com/ceramicstudio/ethdenver-workshop