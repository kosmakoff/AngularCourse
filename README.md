# Angular.JS Course - Team Management Solution

This project represents a basic team-management software.

## Making it work

Node.JS 4.x is required to run this app.

Once the repository has been cloned just run:

```
npm install
```

The project is preconfigured with a web server and `grunt` tasks.

To run grunt tasks you need the Grunt command line interface.

Install this globally and you'll have access to the grunt command anywhere on your system.
```
npm install -g grunt-cli
```

When NPM finishes fetching its modules, execute:

```
grunt up
```

That will compile all files and run the server at port 8080. You will be able to [access the application](http://localhost:8080/).

## Source code structure

```
src/
├─app/
│ ├─about/                              --> Simple About page
│ ├─employees/                          --> The core functionality - Teams/Employees page
│ │ ├─employees{.tpl.html, Ctrl.js}     --> The page layout + controller
│ │ └─employeesTeam{.tpl.html, Ctrl.js} --> Left pane of page + controller
│ ├─home/                               --> Simple home page
│ └─app.js                              --> Main application module
├─assets/                               --> Static resources
├─common/
│ ├─components/
│ │ ├─footer/                           --> Footer Control
│ │ ├─header/                           --> Header control
│ │ ├─teams/                            --> Teams Accordion-like control
│ │ ├─teamTabs/                         --> Collection of controls for use in left pane
│ │ └─version/                          --> Version user control
│ ├─features/                           --> Business objects
│ ├─filters/                            --> Filters
│ └─services/
│   ├─employees/                        --> Service for accessing the Employees list
│   └─teams/                            --> Service for accessing the Teams list
└─index.html                            --> Root
```

## Components

### Teams

Teams control renders an accordion, where headers are Teams and contents of each div is a list
of team members. Upon clicking on team header, the signal is sent to open that team on left pane.

Also, control allows to add new teams, delete existing teams, delete members from teams.

### Team Tabs

#### Tab One

It uses 3rd party ng-tags-input control which combines functionality of typeahead and tags input controls.

Button below updates currently selected team.

#### Tab Two

The control allows to filter the list of employees by text input. Search results are rendered to table.
Pagination is used to make things look compact.

## Filters

### NBSP

Used to replace spaces with non-breaking spaces (`&nbsp;`) in any given string.

## Services

### Employees

Implements `query` operation on top of Employees Web API. Allows querying by substring and pagination.

### Teams

Implements `add`, `remove`, `update` operations on teams list.
The list is stored in memory, therefore no changes will be stored if the app is reloaded.
