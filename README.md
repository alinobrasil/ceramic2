
## how to use this
This contains the ceramic node and graphiql server required to use composedb.

install dependencies.

```npm install```

1. Run ceramic node on its own:

```npm run ceramic```

This can take several minutes. 
If you need to deploy new composites (new schemas), there's some other stuff you need to do. Will get to that.


### install composedb
@composed/cli has some issues on npm. uninstall it then use pnpm to install globally

```npm uninstall @composed/cli```

Install PNPM: https://pnpm.io/installation


```pnpm add -g @composedb/cli```



2. Deploy composite
``export DPK=39692c9a7e6a8a24061d3ebf4f1905e0eb05cb879908b2e896cce3f2fb396723``


```composedb composite:deploy output/composite.json --ceramic-url=http://localhost:7007 --did-private-key=$DPK```


3. Get graphiql server up, using ceramic privatekey
4. 
```composedb graphql:server --ceramic-url=http://localhost:7007 --graphiql runtime-composite.json --did-private-key=$DPK --port=5005```



This project contains stuff from ceramic's eth denver workshop:
https://github.com/ceramicstudio/ethdenver-workshop

If you run "npm run dev", it's going to load up a webapp, which the rest of this repo no longer supports. 

## How to add new models

1. Create composite from your model. 


```export DPK=39692c9a7e6a8a24061d3ebf4f1905e0eb05cb879908b2e896cce3f2fb396723```

```composedb composite:create composites/<modelname>.graphql --output=output/composite.json --ceramic-url=http://localhost:7007 --did-private-key=$DPK```

THe output file contains modelID. 

2. deploy composite

```composedb composite:deploy output/composite.json --ceramic-url=http://localhost:7007 --did-private-key=$DPK```

3. create run-time composite files


```composedb composite:compile output/composite.json runtime-composite.json```


```composedb composite:compile output/composite.json runtime-composite.js```

4. The JS one is needed by the IRL-trust project's front end app. 
Copy and paste it into IRL-Trust/src/composedb/
replace the existing one.



