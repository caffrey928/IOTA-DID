# IOTA-DID

## Prerequisite
Make sure you have NodeJS and NPM installed.
**Node Version** : ^18.16.0

## Holder
1. `cd frontend yarn install`
2. `cd ../backend npm install`
3. `cd ../`
4. `yarn start`
5. Open a new terminal 
6. `yarn server`

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
In this part, make sure you have PNPM installed. If not, run
```sh
npm install -g pnpm
```
### Install packages
```sh
pnpm run install-verifier
```
### Run whole Verifier service
Command below can run whole Verifier at the same time
```sh
pnpm run verifier
```
Frontend: `http://localhost:3000/`
Backend: `http://localhost:8000/`

- Run only frontend
```sh
cd iota-verifier # move into verifier folder
pnpm run start # move into verifier folder
```
- Run only backend
```sh
cd iota-verifier # move into verifier folder
pnpm run server # move into verifier folder
```
### Kill whole Verifier service
```sh
# check if any service running on 3000 & 8000, and kill them
pnpm run kill-verifier
```
