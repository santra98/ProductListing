# Product Listing App

This is a small React + Vite app that pulls product data from a public API and shows it in a clean, responsive grid.

The goal here is pretty simple: open the app, fetch a fresh batch of products, and present them clearly.

## What the app does

- Fetches product data from `https://api.freeapi.app/api/v1/public/randomproducts`
- Shows loading skeletons while the request is in progress
- Displays a friendly error state if the request fails
- Lets you refresh the list from the header
- Renders product cards with price, discount, stock status, rating, and image fallback support

## Built with

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint
