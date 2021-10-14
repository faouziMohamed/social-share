# Social Share
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started - Run project localy 
📸 First [_Fork,_ ] clone the repo and cd to the directory `social-share`  
  ```bash
  # Using https 
  git clone https://github.com/faouziMohamed/social-share.git
  ```
  ```bash
  # or using shh 
  git clone git@github.com:faouziMohamed/social-share.git
  ```
  ```bash
  cd social-share
  ```
## Running directly in your machine
- Install node version 14
- Install mondodb (server)
- Install project dependencies 
```bash
yarn install
```
```bash
# or 
npm install
```
Then run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using Docker [recommended ☑️]
1. You'll need to have [Docker](https://docs.docker.com/engine/install/) installed in your machine
1. Build a docker image using the command bellow 
   ```yaml
   # This assume you are in the root of the directory project
    docker build --pull --rm -f "Dockerfile" -t socialshare:latest .
   ``` 
    While docker is building the image pass to the next step (_**Running the mongoDb server**_)
1. Pull the latest image of MongoDB server, run it in a docker container and expose it to the default port  using the commande bellow 
   Open a new terminal and run:
   ```yaml
   docker run --rm --name mongodb -d -p27017:27017 mongo
   ```
 1. If the command from the step 2 and 3 finished to run, run the Web server and expose the port 3000 to your host. ( ❗ make sure that the port 3000 is not used by another app)
     ```yaml
     docker run -it --rm --name social-share -p3000:3000 socialshare
     ```
### Stoping the docker containers
After these steps, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- To stop the web server [the docker container] run
```bash
docker stop social-share
```
- To stop the Mongo server container, run
```bash
docker stop mongodb
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
