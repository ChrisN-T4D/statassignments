import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import LevelsOfMeasurement from './components/LevelsOfMeasurement';
import { ILevelsOfMeasurementProps } from './components/ILevelsOfMeasurementProps';
import * as strings from 'LevelsOfMeasurementWebPartStrings';

export interface ILevelsOfMeasurementWebPartProps {
  description: string;
}

export default class LevelsOfMeasurementWebPart extends BaseClientSideWebPart<ILevelsOfMeasurementWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected async onInit(): Promise<void> {
    this._environmentMessage = await this._getEnvironmentMessage();
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<ILevelsOfMeasurementProps> = React.createElement(
      LevelsOfMeasurement,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks?.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
  }

  private async _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks?.microsoftTeams) {
      return strings.TeamsEnvironmentLabel;
    }

    return strings.SharePointEnvironmentLabel;
  }
}
