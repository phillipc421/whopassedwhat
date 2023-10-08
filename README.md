# Who Passed What

An easy to way to see each administration's accomplishments.

## Technical Details

The application flow is as follows:

- Backend runs scraper on "https://www.congress.gov/public-laws/nth-congress"
- Scraper pulls list of laws, relevant bill, and passed date. This includes urls.
- Frontend makes use of scraper results in order to display laws and make appropriate congress api calls (relevant bill).
- Frontend sorts laws based on passed date to the appropriate administration.

### Scraper

Puppeteer is used for the scraping.

#### Reasoning

The congress api does not have an endpoint for plaws (public laws). It seems that the only way to determine which legislation became law via the api is to get all bills, filter based on actions, and see if the text "Public Law" exists within one of the actions. Due to the amount of bills, and then the potential amount of actions taken on each bill, this can be incredibly resource intensive. The congress website maintains a list of all public laws however, so I feel that scraping this page routinely would be easier than the above flow on a routine basis. That being said, we could do the former flow once, and then only focus on later entries, which would be much faster. However, sometimes aditional actions can be taken after a bill becomes law, so there would be mor edge cases to check for rather than just skimming the public laws page.

## Live Link

[Who Passed What?](https://whopassedwhat.vercel.app/)
