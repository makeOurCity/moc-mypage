# MoC Mypage

[![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml) [![Build Test](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml/badge.svg)](https://github.com/makeOurCity/moc-mypage/actions/workflows/build.yml)

Make our City mypage.
# Get Started

Create and edit `.env.local` file.

```console
$ cp .env.example .env.local
$ vi .env.local
```

- `COGNITO_XXXX` values must to get from system administorator.
- `SECRET` generate using command like below.

```console
$ openssl rand -base64 32
```

Install dependencies and launch dev server.

```console
$ npm install
$ npm run dev
```

# Development

[Next.js](https://nextjs.org/) with [chakra-ui](https://chakra-ui.com/) and we are refferring to [chakra-templates](https://chakra-templates.dev/).

# Testing

```console
$ npm run test
```
