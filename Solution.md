To start with the solution to this problem was deployed on Vercel.
https://neo4j-take-home-assignent-genai.vercel.app/

The code can be found on GitHub at the following repository:
https://github.com/joshuaalonge/neo4j-take-home-assignent-genai  (private - added the reviewer)

Stackblitz: https://stackblitz.com/~/github.com/gold-sentry/neo4j-take-home

## During the development process, I added the following libraries to the project:
- TailwindCSS
- Testing Library
- React Testing Library

## Key Observations

### Client-Side Filtering
Due to the absence of backend filtering parameters, the application loads the complete dataset into memory. This architectural decision has several implications:
- **State Stability**: By handling filtering on the client, we avoid potential race conditions that can occur with asynchronous backend requests (e.g., rapid filter toggling leading to out-of-order responses).
- **Responsiveness**: Users experience near-instantaneous feedback when interacting with filters, as no network round-trips are required for each change.
- **Scalability**: The approach here cannot handle a large dataset as it loads the complete dataset into memory. The assumption made here is that the dataset would be small enough to fit into memory, In cases where the dataset is too large, the application would need to be to a pagination system or vitualization which can be archived using libraries such as react-virtualized or react-window.

### Responsive Design
During the development process, I used TailwindCSS to ensure that the application is responsive and mobile-friendly. However the filter was an interesting challenge as it required a dropdown that would be hidden on mobile and a button that would open the dropdown on mobile. 

I also added a sticky header for the search and filter section to ensure that the user can always access the search and filter section even when scrolling.

### Testing
I have not added test to every component, as I have only done this for components that have critical functionality rather than presentation components.

In the interest of time, I have only selected the components by text ideally i would using use a data-testid to identify the components.
