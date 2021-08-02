# Script migration from PrimeFlex 2 to PrimeFlex 3

## Requirements

Install nodejs : https://nodejs.org/en/

Install replace-in-file :

```npm i -g replace-in-file```

## Configuration

Configurer files to scan in files variable :

```const files = ['./projects/**/*.html', './projects/**/*.ts', './projects/**/*.scss'];```

## Run

Add npm script in your project package.json

```"migrate:primeflex3": "node scripts/primeflex3-migrate.js"```

and start the script :-)
