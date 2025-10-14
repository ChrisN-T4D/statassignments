# Levels of Measurement SPFx Assignment Web Part

This SharePoint Framework (SPFx) solution delivers the first activity in the statistics assignment series: an interactive practice experience for identifying nominal, ordinal, interval, and ratio data.

## Getting started

1. Ensure the SPFx prerequisites (Node.js 16.x with npm 8.x, Yeoman, Gulp) are installed. See the [official setup guide](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment).
2. From this folder, install dependencies:
   ```bash
   npm install
   ```
3. Start the local workbench:
   ```bash
   gulp serve
   ```
4. When prompted, load the `Levels of Measurement Practice` web part and interact with the scenarios.

## Packaging and deployment

To create a deployable package for your SharePoint App Catalog:

```bash
gulp bundle --ship
gulp package-solution --ship
```

The generated `.sppkg` file will be located under `sharepoint/solution`. Upload it to your tenant’s App Catalog and add the web part to the desired site collection.

## Customising the assignment

- Update the scenarios in `src/webparts/levelsOfMeasurement/components/data.ts`.
- Adjust UI copy or helper text in `LevelsOfMeasurement.tsx` and the property pane strings in `loc/en-us.js`.
- Extend the styling in `components/LevelsOfMeasurement.module.scss` to match your site design.

## Next steps

Use this project as the foundation for additional assignment web parts. Create new folders under `src/webparts/` for each activity and register them in `config/config.json`.
