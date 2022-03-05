# Praxis Email Service

> Praxis builds emails with dynamic content to send to users for things like weekly updates and
> new event notifications. This is an exobase api that wraps a react app to provide dynamic
> SSR email html pages.

## Setup
`yarn`

## Start
`yarn dev`

## How It Works
Create a react email component, create an api endpoint/function, render the component in the endpoint/function, and return the html source.

## 1. Create a React email component
Create an email component in `src/emails`. Components use [tailwind](https://tailwindcss.com) and do some post processing with postcss to make the tailwind styles email friendly.
<img width="1168" alt="Screen Shot 2022-03-04 at 10 17 24 PM" src="https://user-images.githubusercontent.com/15269623/156869667-4c066586-3a26-4794-8057-a450c64791b1.png">

## 2. Create an API endpoint/function
Simple function, just call the render and return the html. Can do any other needed things as needed to prepare props for the email component.
<img width="1165" alt="Screen Shot 2022-03-04 at 10 17 52 PM" src="https://user-images.githubusercontent.com/15269623/156869248-19cd8322-61fe-491b-aa52-14bf0bbdb318.png">

## 3. Return HTML source
Email content comes back as string in `.email` field.
<img width="765" alt="Screen Shot 2022-03-04 at 10 17 07 PM" src="https://user-images.githubusercontent.com/15269623/156869665-65968f79-ac41-4490-94d6-b53aa375220b.png">


## Deploy
Deployed with Exobase.