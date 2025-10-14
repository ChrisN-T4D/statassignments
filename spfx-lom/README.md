# Levels of Measurement SPFx Assignment Web Part

This SharePoint Framework (SPFx) solution delivers the first activity in the statistics assignment series: an interactive practice lab for recognising nominal, ordinal, interval, and ratio variables.

## Getting started

1. Install the SPFx prerequisites (Node.js 16.13.x with npm 8.x, Yeoman, and Gulp). See the [official setup guide](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment).
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Start the local workbench:
   ```bash
   npm run serve
   ```
4. When the workbench loads, add the **Levels of Measurement Practice** web part to try the activity.

> Note: This project targets SPFx 1.17.4. The toolchain supports Node versions between 16.13.x and 16.19.x. Using newer Node releases (for example Node 18 or Node 22) will block `gulp` builds.

## Packaging and deployment

Create a deployable package for the SharePoint App Catalog:

```bash
gulp bundle --ship
gulp package-solution --ship
```

The generated `.sppkg` file appears under `sharepoint/solution`. Upload it to your tenant's App Catalog and add the web part to your target site.

## Customising the assignment

- Adjust the practice scenarios and explanations in `src/webparts/levelsOfMeasurement/components/data.ts`.
- Update the quiz behaviour or copy in `src/webparts/levelsOfMeasurement/components/LevelsOfMeasurement.tsx`.
- Tune the styling in `src/webparts/levelsOfMeasurement/components/LevelsOfMeasurement.module.scss` to match your site.
- Edit property pane labels in `src/webparts/levelsOfMeasurement/loc/en-us.js`.

## Next steps for the assignment series

Use this project as the foundation for additional SharePoint web parts in the assignment series. Create a new folder under `src/webparts/` for each activity and add it to `config/config.json`.
