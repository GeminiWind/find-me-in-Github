# Find Me in Github

Find Me in Github is small React application. It let you search the user on Github by name along with their repositories and followers

## Getting started

### Prerequisites

- Node: v10.21.0 above

### Install dependencies

- With `yarn` (more prefer)
```bash
yarn
```
- With `npm`
```bash
npm install
```

### Develop mode

- With `yarn`
```bash
yarn dev
```
- With `npm`
```bash
npm run dev
```

### Build

- To build application, run the following command
```bash
yarn build
```
- With `npm`
```bash
npm run build
```

The build output will be `build`

## Deploy

The application use Github action as CI/CD provider.

In the deploy, AWS S3 will be used to host the application. You need to create your S3 bucket firstly and configure host static website for the bucket. Then, fill the following secrete key in your repository

- AWS_S3_BUCKET: name of the bucket
- AWS_ACCESS_KEY_ID:
- AWS_SECRET_ACCESS_KEY

In case you want edit more thing, please do it in the `.github/workflows/main.yml`
