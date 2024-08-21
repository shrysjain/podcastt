# Podcastt 🎧

Podcastt is a dynamic and modern platform that enables seamless podcast creation, discovery, and listening experiences. Leveraging advanced AI technologies and a sleek, responsive design, Podcastt caters to both creators and listeners, making podcasting more accessible and engaging than ever.

## Features

- Robust Authentication: Secure and reliable user login and registration using Clerk.
- Modern Home Page: Showcases trending podcasts with a sticky podcast player for continuous listening.
- Discover Podcasts Page: Explore new and popular podcasts with ease.
- Fully Functional Search: Find podcasts using various search criteria.
- Create Podcast Page: Create podcasts with text-to-audio conversion, AI image generation, and preview functionalities.
- Multi Voice AI Functionality: Supports multiple AI-generated voices for diverse and dynamic podcast creation.
- Profile Page: View all created podcasts with options to delete them.
- Podcast Details Page: Displays detailed information about each podcast, including creator details, listener count, and transcript.
- Podcast Player: Includes backward/forward controls and mute/unmute functionality for a seamless listening experience.
- Responsive Design: Fully functional and visually appealing across all devices and screen sizes.

## Tech Stack

- Next.js
- TypeScript
- Convex
- OpenAI
- Clerk
- ShadCN
- Tailwind CSS

## Try it Out!

You can explore Podcastt live at [podcastt.vercel.app](https://podcastt.vercel.app). Enjoy your podcasting journey!

To run a development instance locally, clone this repository, install dependencies with npm, and set up a .env.local file with the following keys:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'

# OpenAI
OPENAI_API_KEY=
```

Also set up a Convex project with the following environmental variables

```env
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
OPENAI_API_KEY=
```

Finally, run the following commands in parallel terminals:

```sh
npm run dev
```

```sh
npx convex dev
```

## Contributing

We welcome contributions to enhance Podcastt. To contribute, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
