 

<p align="center">
<a href="https://github.com/allandecastro/BarCode/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/></a>
</p>


# BarCodeGenerator
BarCode is a barcode generator written in JavaScript (based on JsBarcode).
It supports multiple barcode formats and the visual aspect can be modified.

Feel free to consult the initial github of this library to understand all parameters.

This is my third Power Apps Component using PowerApps Component framework!
It can be installed on both Model Driven App and Canvas App applications.

Based on the following library : https://github.com/lindell/JsBarcode



## Screenshot

![alt text](https://github.com/allandecastro/BarCode/blob/master/screenshot.png?raw=true)




# Installation

You can find the managed solution into ./DeployBarCode/ folder.

Then you must follow these steps:

* Import the solution into your target environment.

* Open a form where you added a text field.

* Click to managed properties of the field, and add the custom Control "Barcode Generator"

* You can see that they are severals parameters (with default values), it allows you to change color and to configure the component properly. You can refer to the configuration section.

## Configuration

SOON


# How to Package a component ?

## Get required tools

To use Microsoft PowerApps CLI, do the following:

* Install Npm (comes with Node.js) or install Node.js (comes with npm). We recommend LTS (Long Term Support) version 10.15.3 LTS as it seems to be most stable.

* Install .NET Framework 4.6.2 Developer Pack.

* If you don’t already have Visual Studio 2017 or later, follow one of the options below:

  * Option 1: Install Visual Studio 2017 or later.
  * Option 2: Install .NET Core 2.2 SDK and then install Visual Studio Code.
* Install Microsoft PowerApps CLI.

Be sure to update your Microsoft PowerApps CLI to the latest version: 
```bash
pac install latest
```
## Build the control

* Clone the repo/ download the zip file.
* Navigate to ./BusinessProcessFlowViewer/ folder.
* Copy the folder path and open it in visual studio code.
* Open the terminal, and run the command the following command to install the project dependencies:
```bash
npm install
```
Then run the command:
```bash
npm run start
```
## Build the solution

* Create a new solution folder (eg. SolutionFolder) and open the Developer command prompt.
* Change the directory to the newly created folder in previous step.
* Init the future solution:
```bash
pac solution init --publisher-name someName --publisher-prefix someSolutionPrefix
``` 
* Add the control to your future solution:
```bash
pac solution add-reference --path provide path of control project folder where the pcf.proj is available
``` 
* Build 1/2:
```bash
msbuild /t:build /restore
``` 
* Build 2/2:
```bash
msbuild
``` 
* You will have the solution file in SolutionFolder/bin/debug folder!

If you want to change the solution type you have to edit the .cdsproj file:
```bash
Solution Packager overrides, un-comment to use: SolutionPackagerType (Managed, Unmanaged, Both)
  <PropertyGroup>
    <SolutionPackageType>Managed</SolutionPackageType>
  </PropertyGroup>

  ```
