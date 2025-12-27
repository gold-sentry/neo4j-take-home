# Overview

Build a responsive product search and filter interface using React in the provided code base. The goal is to create a performant, user-friendly interface that allows users to search and filter through a product catalog.

Feel free to edit any file **except** the files listed in the "Provided files" section below.

## Time Expectation

1-2 hours

## Provided Files

`src/external-api/products.json` - Product data (55 products)
`src/external-api/product-api.js` - API simulator class with artificial delay

# Core Requirements

1. Display Products

Show all products in a grid layout
Each product card should display:

Product image
Name
Price (formatted as currency)
Rating (visual representation preferred)
Stock status
Number of reviews

2. Search Functionality

Real-time search as the user types
Search should check product names
Implement debouncing (minimum 300ms)
Clear search button

3. Filter Options
   Implement the following filters that work together:

Price Range: Min and max price inputs or slider
Categories: Multi-select checkboxes
Rating: Minimum rating filter (e.g., "4 stars & up")
Availability: "In Stock Only" toggle

4. User Experience

Show loading state while fetching products
Handle errors gracefully (the API has a 5% error rate)
Display result count
Show "No results found" message when applicable
Filters should update results immediately

## Usage of AI assistance

It's ok to use AI assistance, but it's expected that you both understand the code and that you understand the design and archtecturural choices made.  
You are not allowed to use AI assistance in the follow-up interview.

## Handing in the assignment

Feel free to send a link to the source code + working example in the way you prefer (GH + hosted page, or on StackBlitz or similar).  
If you want to host it on GitHub, make it private and invite `oskarhane` to the project.  
It's also ok so hand in the assignment via a .zip file with the source code that can be run locally.
