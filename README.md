# IOTA-DID

## Prerequisite
Make sure you have NodeJS and NPM installed.

**Node Version** : ^18.16.0

## Holder
### Install packages
```sh
npm run install-holder
```
### Run whole Holder service
Command below can run whole Holder (frontend and backend) at the same time
```sh
npm run holder
```
Frontend: `http://localhost:3000/`

Backend: `http://localhost:4000/`

- Run only frontend
```sh
cd iota-holder # move into holder folder
yarn start # run frontend
```
- Run only backend
```sh
cd iota-holder # move into holder folder
yarn server # run backend
```
### Kill whole Holder service
```sh
# check if any service running on 3000 & 4000, and kill them
npm run kill-holder
```

## Issuer
### client
`cd client`  
`npm install`  
`npm start`  
### server
`cd server`  
`npm install`  
`node index.js`

## Verifier
In this part, make sure you have PNPM installed. 

If not, run
```sh
npm install -g pnpm
```
### Install packages
```sh
pnpm run install-verifier
```
### Run whole Verifier service
Command below can run whole Verifier (frontend and backend) at the same time
```sh
pnpm run verifier
```
Frontend: `http://localhost:3002/`

Backend: `http://localhost:8000/`

- Run only frontend
```sh
cd iota-verifier # move into verifier folder
pnpm run start # run frontend
```
- Run only backend
```sh
cd iota-verifier # move into verifier folder
pnpm run server # run backend
```
### Kill whole Verifier service
```sh
# check if any service running on 3002 & 8000, and kill them
pnpm run kill-verifier
```
