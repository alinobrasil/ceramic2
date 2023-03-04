
## how to use this
This contains the ceramic node and graphiql server required to use composedb.

1. Run ceramic node on its own:

```npm run ceramic```

This can take several minutes. 
If you need to deploy new composites (new schemas), there's some other stuff you need to do. Will get to that.


2. Get graphiql server up, using ceramic privatekey


```export DPK=39692c9a7e6a8a24061d3ebf4f1905e0eb05cb879908b2e896cce3f2fb396723```

```npx composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=$DPK --port=5005```



This project contains stuff from ceramic's eth denver workshop:
https://github.com/ceramicstudio/ethdenver-workshop

If you run "npm run dev", it's going to load up an unnecessary nextJS app. 

## How to add new models

1. Create composite from your model. 
```npx composedb composite:create composites/<modelname>.graphql --output=output/composite.json --ceramic-url=http://localhost:7007 --did-private-key=$DPK```

You can find your model ID by running 

2. deploy composite
```npx composedb composite:deploy output/composite.json --ceramic-url=http://localhost:7007 --did-private-key=$DPK```

3. create run-time composite files
```npx composedb composite:compile output/composite.json runtime-composite.json```
```npx composedb composite:compile output/composite.json runtime-composite.js```

4. The JS one is needed by the IRL-trust project's front end app. 
Copy and paste it into IRL-Trust/src/composedb/


