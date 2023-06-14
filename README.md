# IOTA-DID

## **Introduction**
This repo is the implementation of Decentralized Identity(DID) process. We build three different websites, which represent Holder, Issuer and Verifier respectively. 

Below is the things you can do in each website:
- Holder: 
  - Create a DID
  - Add Verification Method
  - Create Verifiable Method
- Issuer (when you run server, automatically create a did to simulate an already-existing issuer)
  - Create Verifiable Credential
  - Create Revocation list
  - Revocation
- Verifier
  - Verification

For more details about the process of DID, please visit [this website](https://wiki.iota.org/identity.rs/introduction/). 

## **Outline**

[Prerequisite](#prerequisite)

[Holder](#holder)

[Issuer](#issuer)

[Verifier](#verifier)

## **Prerequisite**
Make sure you have NodeJS and NPM installed.

**Node Version** : ^18.16.0

## **Holder**
### **Install packages**
```sh
npm run install-holder
```
### **Run whole Holder service**
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
### **Kill whole Holder service**
```sh
# check if any service running on 3000 & 4000, and kill them
npm run kill-holder
```

## **Issuer**
### **Install packages**
```sh
npm run install-issuer
```
### **Run whole Issuer service**
Command below can run whole Issuer (frontend and backend) at the same time
```sh
npm run issuer
```
Frontend: `http://localhost:3001/`

Backend: `http://localhost:5000/`

- Run only frontend
```sh
cd iota-issuer # move into issuer folder
npm run start # run frontend
```
- Run only backend
```sh
cd iota-issuer # move into issuer folder
npm run server # run backend
```
### **Kill whole Issuer service**
```sh
# check if any service running on 3001 & 5000, and kill them
npm run kill-issuer
```

## **Verifier**
In this part, make sure you have PNPM installed. 

If not, run
```sh
npm install -g pnpm
```
### **Install packages**
```sh
pnpm run install-verifier
```
### **Run whole Verifier service**
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
### **Kill whole Verifier service**
```sh
# check if any service running on 3002 & 8000, and kill them
pnpm run kill-verifier
```
